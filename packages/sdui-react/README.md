# @sdui/react

Server-Driven UI의 React 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install @sdui/core @sdui/react
```

## 주요 컴포넌트

### StreamingUIRenderer

동적 UI를 렌더링하는 메인 컴포넌트입니다.

```typescript
import { StreamingUIRenderer } from '@sdui/react';

<StreamingUIRenderer node={uiTree} />
```

### Container Components

레이아웃과 구조를 담당하는 컴포넌트들:

- `Screen`: 전체 화면 컨테이너
- `AppBar`: 상단 앱 바
- `VStack`, `HStack`: 세로/가로 스택
- `ZStack`: 겹침 레이아웃
- `ScrollView`: 스크롤 가능한 뷰
- `Grid`: 그리드 레이아웃
- `Container`: 일반 컨테이너
- `SafeArea`: 안전 영역

## 컴포넌트 레지스트리

```typescript
import { defaultRegistry, extendRegistry } from '@sdui/react';

// 커스텀 컴포넌트 추가
const customRegistry = extendRegistry({
  MyComponent: MyCustomComponent,
});

<StreamingUIRenderer
  node={uiTree}
  context={{ registry: customRegistry }}
/>
```

## License

MIT
