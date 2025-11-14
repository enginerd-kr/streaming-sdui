# SDUI Action System 설명

## 개요

Server-Driven UI의 **Action System**은 서버에서 정의한 UI 컴포넌트에 인터랙티브 동작을 연결하는 메커니즘입니다.

버튼 클릭, 폼 제출 등의 이벤트를 서버가 JSON으로 정의하고, 클라이언트가 실행합니다.

---

## 동작 흐름

```
1. 서버: UINode에 actions 정의
   ↓
2. API: JSON으로 전송
   ↓
3. StreamingUIRenderer: actions를 이벤트 핸들러로 변환
   ↓
4. 사용자: 버튼 클릭
   ↓
5. executeAction 함수 실행
   ↓
6. 클라이언트: 액션 처리 (alert, API 호출 등)
```

---

## 코드 구조

### 1. 타입 정의 (`types.ts`)

```typescript
export interface ActionHandler {
  /** 액션 타입 */
  type: 'submit' | 'navigate' | 'api_call' | 'custom';

  /** 액션 페이로드 (자유 형식) */
  payload?: Record<string, any>;
}

export interface UINode {
  id: string;
  type: string;
  props?: Record<string, any>;
  children?: (UINode | string)[];

  /** 이벤트 → 액션 매핑 */
  actions?: Record<string, ActionHandler>;
}
```

**핵심**: `actions`는 이벤트 이름(`onClick`, `onSubmit` 등)을 `ActionHandler`에 매핑합니다.

---

### 2. 서버에서 액션 정의 (API Route)

**예제: Form의 "Create Account" 버튼**

```typescript
// /api/generate-ui/route.ts
{
  id: 'submit-btn',
  type: 'Button',
  props: { className: 'w-full' },
  children: ['Create Account'],

  // 👇 액션 정의
  actions: {
    onClick: {
      type: 'submit',
      payload: {
        formName: 'createAccount',
        message: 'Account creation submitted!',
      },
    },
  },
}
```

**설명**:
- `onClick`: React의 이벤트 핸들러 이름
- `type: 'submit'`: 액션 종류 (submit, navigate, api_call, custom)
- `payload`: 액션 실행 시 전달될 데이터

---

### 3. 렌더러에서 액션 바인딩 (`StreamingUIRenderer.tsx`)

```typescript
// lines 133-163
function processProps(
  props: UINode['props'],
  actions: UINode['actions'],
  context?: Partial<RenderContext>
): Record<string, any> {
  const processedProps = { ...props };

  // 액션 핸들러 바인딩
  if (actions && context?.executeAction) {
    Object.entries(actions).forEach(([eventName, actionHandler]) => {

      // 👇 eventName을 실제 React 이벤트 핸들러로 변환
      processedProps[eventName] = async (event?: any) => {
        // 기본 이벤트 방지 (폼 제출 등)
        if (event?.preventDefault) {
          event.preventDefault();
        }

        try {
          // 👇 액션 실행
          await context.executeAction!(actionHandler.type, actionHandler.payload);
        } catch (error) {
          console.error('Action execution failed:', error);
        }
      };
    });
  }

  return processedProps;
}
```

**동작**:
1. `actions` 객체를 순회
2. 각 이벤트 이름(`onClick`)을 실제 함수로 변환
3. 함수 실행 시 `executeAction` 호출

---

### 4. 클라이언트에서 액션 처리 (`demo/page.tsx`)

```typescript
// Action handler for interactive components
const handleAction = async (actionType: string, payload?: Record<string, any>) => {
  console.log('Action executed:', { actionType, payload });

  // Show alert for demonstration
  if (payload?.message) {
    alert(payload.message);
  }

  // 실제 프로덕션에서는:
  // - API 호출
  // - 상태 업데이트
  // - 페이지 네비게이션
  // - 토스트 알림 등
};

// 렌더러에 전달
<StreamingUIRenderer
  node={uiTree}
  context={{ executeAction: handleAction }}
/>
```

**설명**:
- `handleAction`: 모든 액션을 처리하는 함수
- `actionType`: 어떤 종류의 액션인지 (`submit`, `navigate` 등)
- `payload`: 서버에서 전달한 데이터

---

## 실제 동작 예시

### 사용자가 "Create Account" 버튼을 클릭하면:

```
1. React의 onClick 이벤트 발생
   ↓
2. processProps에서 생성한 핸들러 함수 실행
   ↓
3. context.executeAction('submit', {
     formName: 'createAccount',
     message: 'Account creation submitted!'
   })
   ↓
4. demo/page.tsx의 handleAction 실행
   ↓
5. console.log로 액션 정보 출력
   ↓
6. alert('Account creation submitted!') 표시
```

---

## 액션 타입별 사용 예시

### 1. `submit` - 폼 제출

```typescript
actions: {
  onClick: {
    type: 'submit',
    payload: {
      formName: 'createAccount',
      message: 'Account creation submitted!',
    },
  },
}
```

**실제 구현 시**:
```typescript
if (actionType === 'submit') {
  const response = await fetch('/api/submit-form', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  // 성공 메시지 표시
}
```

---

### 2. `navigate` - 페이지 이동

```typescript
actions: {
  onClick: {
    type: 'navigate',
    payload: {
      url: '/dashboard',
    },
  },
}
```

**실제 구현 시**:
```typescript
if (actionType === 'navigate') {
  router.push(payload.url);
}
```

---

### 3. `api_call` - API 호출

```typescript
actions: {
  onClick: {
    type: 'api_call',
    payload: {
      endpoint: '/api/update-profile',
      method: 'PATCH',
      data: { name: 'John' },
    },
  },
}
```

**실제 구현 시**:
```typescript
if (actionType === 'api_call') {
  const response = await fetch(payload.endpoint, {
    method: payload.method,
    body: JSON.stringify(payload.data),
  });
  // 결과 처리
}
```

---

### 4. `custom` - 커스텀 로직

```typescript
actions: {
  onClick: {
    type: 'custom',
    payload: {
      action: 'toggleDarkMode',
    },
  },
}
```

**실제 구현 시**:
```typescript
if (actionType === 'custom') {
  if (payload.action === 'toggleDarkMode') {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
}
```

---

## 장점

### 1. **서버가 UI와 동작을 모두 제어**
```typescript
// 서버에서 버튼의 동작까지 정의
{
  type: 'Button',
  children: ['Delete'],
  actions: {
    onClick: {
      type: 'api_call',
      payload: { endpoint: '/api/delete', itemId: '123' }
    }
  }
}
```

### 2. **클라이언트 코드 수정 없이 동작 변경**
- API만 수정하면 버튼의 동작이 바뀜
- 프론트엔드 배포 불필요

### 3. **타입 안전성**
- TypeScript로 액션 타입 정의
- 페이로드 구조 검증 가능

---

## 테스트 방법

1. **데모 페이지 접속**: http://localhost:3000/demo

2. **"Form" 프리셋 선택**

3. **"UI 생성" 클릭**

4. **생성된 Form에서 "Create Account" 버튼 클릭**

5. **결과 확인**:
   - 브라우저 콘솔에 로그 출력:
     ```
     Action executed: {
       actionType: 'submit',
       payload: {
         formName: 'createAccount',
         message: 'Account creation submitted!'
       }
     }
     ```
   - Alert 창에 "Account creation submitted!" 표시

---

## 확장 예시

### React Hook Form 통합

```typescript
const handleAction = async (actionType: string, payload?: Record<string, any>) => {
  if (actionType === 'submit' && payload?.formName === 'createAccount') {
    const formData = getValues(); // React Hook Form

    const response = await fetch('/api/create-account', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success('Account created!');
      reset();
    } else {
      toast.error('Failed to create account');
    }
  }
};
```

### 상태 관리 통합 (Zustand)

```typescript
const handleAction = async (actionType: string, payload?: Record<string, any>) => {
  if (actionType === 'custom' && payload?.action === 'addToCart') {
    useCartStore.getState().addItem(payload.item);
    toast.success('Added to cart!');
  }
};
```

---

## 보안 고려사항

### 1. **액션 타입 화이트리스트**

```typescript
const ALLOWED_ACTIONS = ['submit', 'navigate', 'api_call', 'custom'];

const handleAction = async (actionType: string, payload?: Record<string, any>) => {
  if (!ALLOWED_ACTIONS.includes(actionType)) {
    console.error('Invalid action type:', actionType);
    return;
  }
  // 액션 실행
};
```

### 2. **페이로드 검증**

```typescript
import { z } from 'zod';

const SubmitPayloadSchema = z.object({
  formName: z.string(),
  message: z.string().optional(),
});

const handleAction = async (actionType: string, payload?: Record<string, any>) => {
  if (actionType === 'submit') {
    const validated = SubmitPayloadSchema.safeParse(payload);
    if (!validated.success) {
      console.error('Invalid payload:', validated.error);
      return;
    }
    // 안전하게 실행
  }
};
```

### 3. **XSS 방지**

```typescript
// ❌ 위험: 페이로드를 직접 HTML로 렌더링
<div dangerouslySetInnerHTML={{ __html: payload.message }} />

// ✅ 안전: 텍스트로만 렌더링
<div>{payload.message}</div>
```

---

## 결론

SDUI Action System을 통해:

✅ **서버가 UI와 동작을 완전히 제어**
✅ **클라이언트 코드 수정 없이 동작 변경 가능**
✅ **타입 안전한 이벤트 핸들링**
✅ **다양한 액션 타입 지원 (submit, navigate, api_call, custom)**

**Form 예제**에서 "Create Account" 버튼을 클릭해보면 실제 동작을 확인할 수 있습니다!
