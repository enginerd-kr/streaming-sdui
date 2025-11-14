# Skeleton → Component 모핑 애니메이션 분석

## 🎯 목표
Skeleton이 실제 컴포넌트의 정확한 크기로 부드럽게 변환되는 애니메이션 구현

## 📊 세 가지 접근법 비교

### 1. MorphingRenderer (Framer Motion layoutId) ⭐ 추천

**원리:**
```typescript
// Skeleton 단계
<motion.div layoutId="card-1">
  <Skeleton />
</motion.div>

// → 실제 컴포넌트로 교체
<motion.div layoutId="card-1"> // 같은 layoutId!
  <Card>실제 내용</Card>
</motion.div>

// Framer Motion이 자동으로 크기 변화를 애니메이션!
```

**장점:**
- ✅ 구현이 매우 간단
- ✅ Framer Motion이 자동으로 FLIP 애니메이션 처리
- ✅ 성능 최적화됨 (GPU 가속)
- ✅ 코드가 선언적이고 깔끔

**단점:**
- ⚠️ layoutId가 같아야 하므로 구조 변경 필요
- ⚠️ Framer Motion 의존성

**동작 흐름:**
```
1. Skeleton이 layoutId="card-1"로 렌더링
2. Replace 액션 수신
3. 실제 컴포넌트가 같은 layoutId로 렌더링
4. Framer Motion이 자동으로 크기/위치 변화 계산
5. 부드러운 모핑 애니메이션 실행
```

**코드:**
```typescript
// 매우 간단!
<motion.div
  layoutId={node.id}
  transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
>
  {isLoading ? <Skeleton /> : <RealComponent />}
</motion.div>
```

---

### 2. AdaptiveRenderer (크기 측정 방식)

**원리:**
```typescript
1. 실제 컴포넌트를 invisible로 먼저 렌더링
2. getBoundingClientRect()로 width, height 측정
3. Skeleton을 측정된 크기로 애니메이션
4. 동시에 실제 컴포넌트 fade-in
```

**장점:**
- ✅ 정확한 크기 측정 가능
- ✅ 복잡한 레이아웃에도 대응
- ✅ Framer Motion 없이도 구현 가능

**단점:**
- ❌ 복잡한 구현
- ❌ 두 번 렌더링 (invisible + visible)
- ❌ 성능 오버헤드
- ❌ 레이아웃 thrashing 위험

**동작 흐름:**
```
1. Replace 액션 수신
2. 실제 컴포넌트를 invisible로 렌더링
3. useEffect에서 measureRef.current.getBoundingClientRect()
4. 측정된 크기를 state에 저장
5. Skeleton을 해당 크기로 animate
6. 동시에 실제 컴포넌트 opacity: 0 → 1
```

**코드:**
```typescript
// 복잡함
const [dimensions, setDimensions] = useState(null);

useEffect(() => {
  if (measureRef.current) {
    const rect = measureRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
  }
}, [node]);

return (
  <>
    {/* invisible 측정용 */}
    <div ref={measureRef} className="invisible absolute">
      <RealComponent />
    </div>

    {/* 실제 렌더링 */}
    <motion.div animate={dimensions}>
      {isLoading ? <Skeleton /> : <RealComponent />}
    </motion.div>
  </>
);
```

---

### 3. CSS View Transitions API (미래 기술)

**원리:**
```typescript
document.startViewTransition(() => {
  // DOM 변경
  setSkeleton(false);
});
```

**장점:**
- ✅ 네이티브 브라우저 지원
- ✅ 프레임워크 독립적
- ✅ 성능 최상

**단점:**
- ❌ 브라우저 지원률 낮음 (Chrome 111+)
- ❌ 아직 실험적 기능
- ❌ 세밀한 제어 어려움

---

## 🏆 최종 추천

### **MorphingRenderer (방법 1)** 사용 권장

**이유:**
1. **간단함**: 코드 30% 감소
2. **성능**: GPU 가속, 최적화됨
3. **안정성**: Framer Motion의 검증된 기술
4. **유지보수**: 선언적 코드

### 구현 전략

```typescript
// StreamingUIRenderer.tsx 수정
export function StreamingUIRenderer({ node, animate = true }) {
  if (animate) {
    return (
      <motion.div
        layoutId={node.id} // 핵심!
        layout // 자동 레이아웃 애니메이션
        initial={node.streaming?.status === 'streaming' ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{
          layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.3 }
        }}
      >
        {renderContent(node)}
      </motion.div>
    );
  }

  return renderContent(node);
}
```

---

## 🎬 실제 동작 예시

### Before (현재):
```
[Skeleton h-20] → [즉시 교체] → [Card h-32]
                     뚝!
```

### After (MorphingRenderer):
```
[Skeleton h-20] → [부드럽게 확장] → [Card h-32]
                  ~~~~~~~~~~~~~~
                   0.5초 애니메이션
```

### 시각적 표현:
```
Time: 0ms
┌──────────────┐
│ ▓▓▓▓▓▓▓▓▓▓  │ h-20
└──────────────┘

Time: 250ms (애니메이션 중)
┌──────────────┐
│ ▓▓▓▓Revenue ▓│ h-26 (확장 중)
│ ▓▓▓$45,231▓▓ │
└──────────────┘

Time: 500ms (완료)
┌──────────────┐
│ Total Revenue│ h-32
│ $45,231      │
│ +20.1% ↑     │
└──────────────┘
```

---

## ⚠️ 주의사항

### 1. Layout Shift 방지
```typescript
// Skeleton 크기를 실제와 비슷하게 설정
if (nodeType === 'Card') {
  return (
    <div className="p-6 space-y-3"> // 실제 Card와 동일한 padding
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
```

### 2. 성능 최적화
```typescript
// layout 애니메이션만 켜기
transition={{
  layout: { duration: 0.5 }, // 크기 변화만
  // 다른 속성은 애니메이션 안 함
}}
```

### 3. 접근성
```typescript
<motion.div
  layoutId={node.id}
  role="progressbar" // Skeleton일 때
  aria-busy={isLoading}
  aria-label="Loading content"
>
```

---

## 🚀 다음 단계

1. **StreamingUIRenderer.tsx 수정**
   - layoutId 추가
   - layout prop 추가

2. **API route 수정 필요 없음**
   - 기존 replace 액션 그대로 사용
   - layoutId는 node.id로 자동 처리

3. **테스트**
   - Dashboard 테스트
   - 다양한 크기의 컴포넌트 테스트
   - 성능 모니터링

---

## 📝 결론

**MorphingRenderer 방식**으로 구현하면:
- ✅ 코드 간단
- ✅ 성능 우수
- ✅ 사용자 경험 향상
- ✅ 유지보수 용이

**AdaptiveRenderer 방식**은:
- 정확한 크기 측정이 critical한 경우에만 사용
- 복잡도 대비 효과가 크지 않음
