# Server-Driven UI (SDUI) Monorepo

shadcn/ui 컴포넌트를 활용한 스트리밍 서버드리븐 UI 라이브러리입니다.

## 🌟 주요 기능

- **실시간 스트리밍 렌더링**: LLM이 생성하는 UI를 실시간으로 렌더링
- **shadcn/ui 통합**: 아름다운 shadcn/ui 컴포넌트를 동적으로 조합
- **다중 포맷 지원**: JSON, JSONL, DSL, SSE 등 다양한 형식 지원
- **🆕 DSL**: 80% 토큰 절감! LLM 친화적인 간결한 문법
- **NPM 패키지**: `@sdui/core`와 `@sdui/react`로 쉽게 설치 가능

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
npm run build              # 모든 패키지와 웹사이트 빌드
npm run build:packages     # 패키지만 빌드
npm run build:website      # 웹사이트만 빌드
npm run dev               # 웹사이트 개발 서버 실행
npm run clean             # 빌드 결과물 삭제
```

## 🆕 DSL 문법

```text
Card
  @className: w-full

  CardHeader
    CardTitle: Hello World

  CardContent
    Button: Click Me
```

## 🎨 지원 컴포넌트

- **Container**: Screen, AppBar, VStack, HStack, Grid 등
- **Primitive**: Button, Card, Input, Tabs 등 (shadcn/ui)
- **HTML**: div, span, p, form 등 표준 HTML 태그

## 🌐 배포

GitHub Actions를 통해 자동 배포됩니다.

## 📚 문서

- [DSL 가이드](./docs/DSL_GUIDE.md)
- 웹사이트에서 컴포넌트 문서 확인

## 📄 라이선스

MIT
