# Server-Driven UI with shadcn/ui

shadcn/ui 컴포넌트를 활용한 스트리밍 서버드리븐 UI 라이브러리입니다.

## 🌟 주요 기능

- **실시간 스트리밍 렌더링**: LLM이 생성하는 UI를 실시간으로 렌더링
- **shadcn/ui 통합**: 아름다운 shadcn/ui 컴포넌트를 동적으로 조합
- **다중 포맷 지원**: JSON, JSONL, DSL, SSE 등 다양한 형식 지원
- **🆕 DSL**: 80% 토큰 절감! LLM 친화적인 간결한 문법

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📖 사용법

### 기본 사용

```typescript
import { useStreamingUI } from '@/lib/sdui/hooks/useStreamingUI';
import { StreamingUIRenderer } from '@/components/sdui/StreamingUIRenderer';

function MyComponent() {
  const { uiTree, isStreaming, start } = useStreamingUI({
    format: 'dsl', // 'json', 'jsonl', 'dsl', 'sse' 중 선택
    onComplete: () => console.log('UI 생성 완료!'),
  });

  const handleGenerate = () => {
    start('/api/generate-ui', {
      prompt: 'Create a beautiful dashboard'
    });
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={isStreaming}>
        {isStreaming ? 'UI 생성 중...' : 'UI 생성'}
      </button>
      <StreamingUIRenderer node={uiTree} animate={true} />
    </div>
  );
}
```

### 🆕 DSL (권장)

LLM이 80% 적은 토큰으로 UI를 생성할 수 있는 간결한 문법입니다!

```text
Card
  @className: w-full

  CardHeader
    CardTitle: Hello World

  CardContent
    VStack
      @spacing: 4

      Button: Click Me

      Input
        @placeholder: Enter text...
```

**특징**:
- 들여쓰기로 중첩 구조 표현
- `@`로 속성 지정
- `ComponentType: Text` 형태로 간단한 텍스트 추가
- `//`로 주석 작성
- ID는 자동 생성

**토큰 비교**:
- JSON: ~60 토큰
- DSL: ~12 토큰 (80% 절감!)

### UINode JSON 스키마 (레거시)

서버에서 전송하는 UI는 다음과 같은 JSON 형식을 따릅니다:

```json
{
  "id": "unique-id",
  "type": "Card",
  "props": {
    "className": "w-full"
  },
  "children": [
    {
      "id": "card-header",
      "type": "CardHeader",
      "children": [
        {
          "id": "card-title",
          "type": "CardTitle",
          "children": ["Hello World"]
        }
      ]
    }
  ],
  "streaming": {
    "status": "streaming"
  }
}
```

### 스트리밍 액션

서버는 다음과 같은 액션을 스트리밍으로 전송할 수 있습니다:

```typescript
// 루트 컴포넌트 생성
{ "action": "create", "component": { ... } }

// 자식 컴포넌트 추가
{ "action": "append", "parentId": "root", "component": { ... } }

// 컴포넌트 업데이트
{ "action": "update", "componentId": "id", "updates": { ... } }

// 컴포넌트 교체
{ "action": "replace", "componentId": "id", "component": { ... } }

// 컴포넌트 제거
{ "action": "remove", "componentId": "id" }

// 스트리밍 완료
{ "action": "complete", "componentId": "root" }

// 에러 발생
{ "action": "error", "componentId": "id", "error": "Error message" }
```

## 🎨 지원 컴포넌트

현재 다음 shadcn/ui 컴포넌트를 지원합니다:

- `Button`
- `Card`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`
- `Input`
- `Label`
- `Skeleton`
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`

추가 컴포넌트는 `component-registry.ts`에서 확장할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── generate-ui/     # UI 생성 API 엔드포인트
│   ├── demo/                # 데모 페이지
│   └── page.tsx             # 홈 페이지
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트
│   └── sdui/
│       └── StreamingUIRenderer.tsx  # 동적 렌더러
└── lib/
    └── sdui/
        ├── types.ts         # TypeScript 타입 정의
        ├── streaming-parser.ts  # 스트리밍 파서
        ├── component-registry.ts  # 컴포넌트 레지스트리
        ├── hooks/
        │   └── useStreamingUI.ts  # 스트리밍 Hook
        └── index.ts         # 라이브러리 exports
```

## 🔧 커스터마이징

### 커스텀 컴포넌트 추가

```typescript
import { extendRegistry } from '@/lib/sdui/component-registry';
import MyCustomComponent from './MyCustomComponent';

const customRegistry = extendRegistry({
  MyCustomComponent,
});

// 렌더러에 전달
<StreamingUIRenderer
  node={uiTree}
  context={{ registry: customRegistry }}
/>
```

### 액션 핸들러 구현

```typescript
const context = {
  executeAction: async (actionType, payload) => {
    switch (actionType) {
      case 'submit':
        await submitForm(payload);
        break;
      case 'navigate':
        router.push(payload.url);
        break;
      default:
        console.log('Unknown action:', actionType);
    }
  },
};

<StreamingUIRenderer node={uiTree} context={context} />
```

## 🌐 API 구현

### Next.js API Route 예시

```typescript
// app/api/generate-ui/route.ts
export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // LLM API 호출 (예: OpenAI)
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      });

      // 스트리밍 처리
      for await (const chunk of response) {
        const action = parseChunkToAction(chunk);
        controller.enqueue(encoder.encode(JSON.stringify(action) + '\n'));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
    },
  });
}
```

## 🎯 사용 사례

- **동적 대시보드**: 사용자 역할에 따라 다른 UI 표시
- **A/B 테스팅**: 서버에서 UI 변형 제어
- **개인화**: 사용자 선호도에 맞춘 UI 생성
- **AI 기반 UI**: LLM이 자연어로부터 UI 생성

## 🤝 기여

이슈와 PR을 환영합니다!

## 📄 라이선스

MIT

## 🔗 관련 링크

- [shadcn/ui](https://ui.shadcn.com)
- [Next.js](https://nextjs.org)
