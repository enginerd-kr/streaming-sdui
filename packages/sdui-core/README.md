# @sdui/core

Server-Driven UI의 핵심 로직을 담은 라이브러리입니다.

## 설치

```bash
npm install @sdui/core
```

## 주요 기능

- **Types**: TypeScript 타입 정의
- **Parsers**: JSON, JSONL, DSL, SSE 파서
- **Hooks**: `useStreamingUI` React Hook
- **Component Metadata**: 컴포넌트 메타데이터 및 문서

## 사용법

```typescript
import { useStreamingUI } from '@sdui/core';

const { uiTree, isStreaming, start } = useStreamingUI({
  format: 'dsl',
  onComplete: () => console.log('완료'),
});

// UI 생성 시작
start('/api/generate-ui', { prompt: '대시보드 생성' });
```

## API

### useStreamingUI(options)

스트리밍 UI를 관리하는 Hook입니다.

**Options:**
- `format`: 'json' | 'jsonl' | 'dsl' | 'sse'
- `onComplete`: 완료 콜백
- `onError`: 에러 콜백
- `onUpdate`: 업데이트 콜백

**Returns:**
- `uiTree`: 현재 UI 트리
- `isStreaming`: 스트리밍 상태
- `error`: 에러 정보
- `start()`: 스트리밍 시작
- `stop()`: 스트리밍 중단
- `reset()`: 상태 초기화

## License

MIT
