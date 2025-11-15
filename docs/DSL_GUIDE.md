# DSL Guide

## 개요

DSL은 LLM이 Server-Driven UI를 **80% 적은 토큰**으로 생성할 수 있도록 설계된 간결한 문법입니다.

## 주요 특징

- ✅ **80% 토큰 절감**: JSON 대비 훨씬 적은 토큰 사용
- ✅ **스트리밍 친화적**: 라인 단위로 즉시 파싱 가능
- ✅ **가독성**: 들여쓰기로 구조를 명확하게 표현
- ✅ **타입 안전**: TypeScript 기반 파서

## 문법

### 기본 구조

```text
ComponentType
  @propName: value
  ChildComponent
    @prop: value
```

### 들여쓰기 규칙

- **2칸 들여쓰기** 권장 (스페이스)
- 들여쓰기로 부모-자식 관계 표현
- 같은 레벨 = 형제 컴포넌트

### 속성 정의

속성은 `@` 기호로 시작:

```text
Button
  @variant: primary
  @size: lg
  @onClick: handleClick
```

### 텍스트 컨텐츠

#### 인라인 텍스트
```text
CardTitle: Hello World
Button: Click Me
```

#### 여러 줄 텍스트
```text
CardContent
  "This is a text node"
  "Another text line"
```

### 주석

```text
// 이것은 주석입니다
Card
  // 카드 헤더
  CardHeader
    CardTitle: Title
```

## 값 타입

### String
```text
@title: Hello World
@className: w-full p-4
```

### Number
```text
@spacing: 4
@columns: 3
@elevation: 1
```

### Boolean
```text
@scrollable: true
@disabled: false
```

### Object/Array (JSON)
```text
@responsive: {sm:1,md:2,lg:3}
@items: [1,2,3,4,5]
```

## 예시

### 간단한 Card

**DSL (~20 토큰)**:
```text
Card
  @className: w-full

  CardHeader
    CardTitle: User Profile
    CardDescription: Manage your account

  CardContent
    VStack
      @spacing: 4

      Input
        @placeholder: Enter name
        @type: text

      Button: Save Changes
```

**동일한 JSON (~100 토큰)**:
```json
{
  "id": "card-1",
  "type": "Card",
  "props": {"className": "w-full"},
  "children": [
    {
      "id": "header-1",
      "type": "CardHeader",
      "children": [
        {"id": "title-1", "type": "CardTitle", "children": ["User Profile"]},
        {"id": "desc-1", "type": "CardDescription", "children": ["Manage your account"]}
      ]
    },
    {
      "id": "content-1",
      "type": "CardContent",
      "children": [
        {
          "id": "vstack-1",
          "type": "VStack",
          "props": {"spacing": 4},
          "children": [
            {"id": "input-1", "type": "Input", "props": {"placeholder": "Enter name", "type": "text"}},
            {"id": "btn-1", "type": "Button", "children": ["Save Changes"]}
          ]
        }
      ]
    }
  ]
}
```

### 복잡한 레이아웃

```text
Screen
  @backgroundColor: #f9fafb
  @scrollable: true

  AppBar
    @title: Dashboard
    @position: sticky
    @elevation: 1

  Container
    @maxWidth: xl
    @padding: 6

    VStack
      @spacing: 8

      // 통계 카드들
      Grid
        @columns: 3
        @gap: 4
        @responsive: {sm:1,md:2,lg:3}

        Card
          CardHeader
            CardTitle: Total Users
          CardContent
            "1,234"

        Card
          CardHeader
            CardTitle: Revenue
          CardContent
            "$12,345"

        Card
          CardHeader
            CardTitle: Growth
          CardContent
            "+23%"

      // 데이터 테이블
      Card
        CardHeader
          CardTitle: Recent Orders
          CardDescription: Latest transactions

        CardContent
          ScrollView
            @direction: horizontal

            HStack
              @spacing: 4

              Button: Order #1
              Button: Order #2
              Button: Order #3
```

## 스트리밍 동작

DSL은 **라인 단위로 파싱**되므로 스트리밍에 최적화되어 있습니다:

```typescript
// LLM이 한 줄씩 생성
"Card\n"                    → Card 노드 생성
"  CardHeader\n"            → CardHeader 추가
"    CardTitle: Hello\n"    → CardTitle 추가 + 텍스트 설정
"  CardContent\n"           → CardContent 추가
```

각 라인이 완성되는 즉시 파싱되어 UI에 반영됩니다!

## 사용 방법

### Hook에서 포맷 지정

```typescript
import { useStreamingUI } from '@/lib/sdui';

const { uiTree, isStreaming, start } = useStreamingUI({
  format: 'dsl', // ← DSL 포맷 사용
  onComplete: () => console.log('Done!'),
});

start('/api/generate-ui', {
  prompt: 'Create a dashboard'
});
```

### 파서 직접 사용

```typescript
import { DSLParser } from '@/lib/sdui/parsers';

const parser = new DSLParser();

// 라인 추가
const actions = parser.append('Card\n');
// → [{ action: 'create', component: { id: 'dsl-0', type: 'Card' } }]

const actions2 = parser.append('  CardTitle: Hello\n');
// → [{ action: 'append', parentId: 'dsl-0', component: {...} }]
```

## LLM 프롬프트 예시

LLM에게 DSL로 UI를 생성하도록 요청할 때:

```
Generate a user profile page using DSL syntax.

Rules:
- Use 2-space indentation
- Properties start with @ (e.g., @className: w-full)
- Inline text with colon (e.g., Button: Click Me)
- Comments with // (optional)

Example:
Card
  @className: w-full
  CardHeader
    CardTitle: Profile
  CardContent
    Button: Edit Profile
```

## 장점

### 1. 토큰 효율성
- JSON: 평균 60-100 토큰
- DSL: 평균 12-20 토큰
- **절감률: 80%**

### 2. 에러 감소
- JSON: 중괄호, 따옴표 매칭 실수 많음
- DSL: 들여쓰기만 맞으면 됨

### 3. 스트리밍 성능
- JSON: 완전한 객체 완성 필요
- DSL: 라인 단위 즉시 파싱

### 4. 가독성
- JSON: 중첩이 깊으면 읽기 어려움
- DSL: 시각적으로 구조 명확

## 제한사항

### 1. ID는 자동 생성
사용자가 직접 ID를 지정할 수 없습니다. 파서가 자동으로 `dsl-0`, `dsl-1` 형태로 생성합니다.

### 2. 복잡한 Props는 JSON 사용
복잡한 객체나 배열은 JSON 형태로 작성:
```text
Grid
  @responsive: {sm:{columns:1},md:{columns:2}}
```

### 3. 이벤트 핸들러는 문자열
실제 함수는 클라이언트에서 매핑 필요:
```text
Button
  @onClick: handleSubmit
```

## 마이그레이션

기존 JSON 기반 시스템에서 전환:

### Before (JSON)
```typescript
useStreamingUI({ format: 'jsonl' })
```

### After (DSL)
```typescript
useStreamingUI({ format: 'dsl' })
```

서버에서는 `format` 파라미터를 받아 적절한 형식으로 응답하면 됩니다.

## 데모

DSL 파서 데모를 테스트해보세요:

```
http://localhost:3000/demo
```

- 실시간 파싱 테스트
- 스트리밍 시뮬레이션
- 토큰 효율성 비교

## 참고

- [examples/dsl-example.dsl](../examples/dsl-example.dsl) - 전체 예시
