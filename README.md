# Server-Driven UI (SDUI)

**스트리밍 기반 서버드리븐 UI로 80% 토큰 절감**

LLM이 생성하는 UI를 실시간으로 스트리밍하며, 커스텀 DSL로 JSON 대비 80% 적은 토큰을 사용합니다.

🌐 **Live Demo**: [https://enginerd-kr.github.io/streaming-sdui/](https://enginerd-kr.github.io/streaming-sdui/)

## 🌟 주요 기능

### ⚡ 핵심 강점

- **✨ 80% 토큰 절감**: 커스텀 DSL로 JSON 대비 압도적인 비용 절감
- **🚀 실시간 스트리밍**: ChatGPT처럼 UI가 점진적으로 생성되는 경험
- **🎯 LLM 최적화**: 들여쓰기 기반 구문으로 LLM이 이해하고 생성하기 쉬움

### 🛠️ 기술 특징

- **다중 포맷 지원**: DSL, JSON, JSONL, SSE 등 유연한 전송 방식
- **shadcn/ui 통합**: 아름다운 UI 컴포넌트를 동적으로 조합
- **NPM 패키지**: `@sdui/core`와 `@sdui/react`로 쉽게 설치
- **정적 호스팅**: GitHub Pages 완벽 지원

## 📦 Monorepo 구조

```text
sdui-monorepo/
├── packages/
│   ├── sdui-core/          # @sdui/core - 핵심 로직
│   │   ├── types           # TypeScript 타입 정의
│   │   ├── parsers         # 스트리밍 파서 (JSON, DSL, SSE)
│   │   ├── hooks           # React hooks (useStreamingUI)
│   │   └── component-metadata  # 컴포넌트 메타데이터
│   │
│   └── sdui-react/         # @sdui/react - React 컴포넌트
│       ├── StreamingUIRenderer  # 메인 렌더러
│       ├── containers      # Container 컴포넌트
│       ├── ui             # shadcn/ui 컴포넌트
│       └── registry       # 컴포넌트 레지스트리
│
└── apps/
    └── website/           # 데모 + 문서 사이트
        ├── pages          # 메인, 데모, 컴포넌트 문서
        └── api           # API 예제
```

## 🚀 빠른 시작

### 설치

```bash
# 전체 monorepo 설치
npm install

# 패키지 빌드
npm run build:packages

# 웹사이트 실행
npm run dev
```

### 패키지만 사용하기

```bash
npm install @sdui/core @sdui/react
```

### 기본 사용법

```typescript
import { useStreamingUI } from '@sdui/core';
import { StreamingUIRenderer } from '@sdui/react';

function MyComponent() {
  const { uiTree, isStreaming, start } = useStreamingUI({
    format: 'dsl',
    onComplete: () => console.log('완료!'),
  });

  return (
    <>
      <button onClick={() => start('/api/generate-ui')}>
        UI 생성
      </button>
      <StreamingUIRenderer node={uiTree} />
    </>
  );
}
```

## 📝 NPM Scripts

### 루트 레벨

```bash
npm run dev                # 웹사이트 개발 서버 실행 (Turbopack)
npm run build              # 모든 패키지와 웹사이트 빌드
npm run build:packages     # 패키지만 빌드 (sdui-core + sdui-react)
npm run build:website      # 웹사이트만 빌드 (정적 익스포트)
npm run start              # 프로덕션 빌드 실행
npm run lint               # 모든 워크스페이스 린트 검사
npm run clean              # 빌드 결과물 및 node_modules 삭제
```

## ✨ DSL vs JSON 비교

### 왜 DSL이 효율적인가?

동일한 UI를 표현할 때:

**DSL 형식** (~60-70 토큰)
```text
Card#card-1
  @className: w-full
  CardHeader#header-1
    CardTitle#title-1: Dashboard
    CardDescription#desc-1: View your metrics
  CardContent#content-1
    "Total users: 1,234"
```

**JSON 형식** (~200-250 토큰)
```json
{
  "id": "card-1",
  "type": "Card",
  "props": { "className": "w-full" },
  "children": [
    {
      "id": "header-1",
      "type": "CardHeader",
      "children": [
        { "id": "title-1", "type": "CardTitle", "children": ["Dashboard"] },
        { "id": "desc-1", "type": "CardDescription", "children": ["View your metrics"] }
      ]
    },
    { "id": "content-1", "type": "CardContent", "children": ["Total users: 1,234"] }
  ]
}
```

### 토큰 절감 원리

| 요소 | DSL | JSON | 절감 효과 |
|------|-----|------|----------|
| 구조 키워드 (`"type":`, `"children":`) | 불필요 | 필수 | -50 토큰 |
| 중괄호/대괄호 (`{}`, `[]`) | 들여쓰기로 대체 | 필수 | -60 토큰 |
| 쉼표/따옴표 | 최소화 | 모든 요소 | -50 토큰 |
| 들여쓰기 공백 | +15 토큰 | 0 | +15 토큰 |
| **순 이득** | | | **-145 토큰 (73%)** |

**핵심**: 들여쓰기로 인한 약간의 토큰 증가(+15)보다, JSON 구조 요소 제거로 얻는 절감(-160)이 압도적으로 큽니다.

### DSL 문법 규칙

```text
# ID 지정
ComponentType#id-name

# Props 설정
@propName: value

# 자식 컴포넌트
부모
  자식1
  자식2

# 인라인 텍스트
Title: Hello World

# 멀티라인 텍스트
Content
  "여러 줄의"
  "텍스트 내용"

# 주석
// 이것은 주석입니다
```

## 🎨 지원 컴포넌트

- **Container**: Screen, AppBar, VStack, HStack, Grid 등
- **Primitive**: Button, Card, Input, Tabs 등 (shadcn/ui)
- **HTML**: div, span, p, form 등 표준 HTML 태그

## 🌐 배포

### GitHub Pages
- **자동 배포**: GitHub Actions를 통해 `main` 브랜치 푸시 시 자동 배포
- **URL**: https://enginerd-kr.github.io/streaming-sdui/
- **배포 방식**: Next.js 정적 익스포트 (`output: 'export'`)

### 정적 호스팅 제약사항
GitHub Pages는 정적 파일만 제공하므로 다음 기능이 제한됩니다:

- ✅ **데모 페이지**: 클라이언트 사이드 시뮬레이션으로 작동 (API 서버 불필요)
- ✅ **컴포넌트 문서**: 전체 컴포넌트 목록 및 상세 페이지 (20개 컴포넌트 정적 생성)
- ❌ **API Routes**: 서버 사이드 API 엔드포인트는 로컬 개발 환경에서만 사용 가능

**참고**: 실제 서버 사이드 스트리밍 및 LLM 통합을 테스트하려면 로컬 환경에서 `npm run dev`를 실행하세요.

## 📚 문서

- [DSL 가이드](./docs/DSL_GUIDE.md)
- [라이브 데모](https://enginerd-kr.github.io/streaming-sdui/demo/)
- [컴포넌트 문서](https://enginerd-kr.github.io/streaming-sdui/components/)

## 📄 라이선스

MIT
