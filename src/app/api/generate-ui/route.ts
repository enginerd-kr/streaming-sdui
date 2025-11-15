import { NextRequest } from 'next/server';
import type { StreamAction, UINode } from '@/lib/sdui/types';

/**
 * UI 생성 스트리밍 API
 * LLM을 사용하여 UI를 동적으로 생성하고 스트리밍으로 전송
 */
export async function POST(request: NextRequest) {
  try {
    const { prompt, context, format = 'jsonl' } = await request.json();

    // DSL 포맷은 아직 서버 구현이 필요
    // 데모 API는 JSON 기반이므로 DSL 요청 시 JSONL로 폴백
    const actualFormat = format === 'dsl' ? 'jsonl' : format;

    // ReadableStream 생성
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // DSL 포맷 요청 시 안내 메시지
          if (format === 'dsl') {
            const infoAction: StreamAction = {
              action: 'create',
              component: {
                id: 'dsl-info',
                type: 'Card',
                props: { className: 'border-orange-500' },
                children: [
                  {
                    id: 'dsl-info-header',
                    type: 'CardHeader',
                    children: [
                      {
                        id: 'dsl-info-title',
                        type: 'CardTitle',
                        children: ['⚠️ DSL 데모 모드'],
                      },
                      {
                        id: 'dsl-info-desc',
                        type: 'CardDescription',
                        children: ['데모 API는 JSON 형식으로 응답합니다. 실제 LLM 연동 시 DSL로 응답하도록 구현할 수 있습니다.'],
                      },
                    ],
                  },
                  {
                    id: 'dsl-info-content',
                    type: 'CardContent',
                    children: [
                      {
                        id: 'dsl-example',
                        type: 'pre',
                        props: { className: 'bg-muted p-3 rounded text-xs' },
                        children: ['Card\n  @className: w-full\n  CardHeader\n    CardTitle: Hello\n  CardContent\n    Button: Click Me'],
                      },
                    ],
                  },
                ],
              },
            };
            controller.enqueue(encoder.encode(JSON.stringify(infoAction) + '\n'));
            await sleep(500);
          }

          // 실제 환경에서는 여기서 LLM API를 호출
          // 현재는 데모용 UI를 생성
          await generateDemoUI(controller, encoder, prompt, context);
        } catch (error) {
          console.error('Stream generation error:', error);
          const errorAction: StreamAction = {
            action: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          };
          controller.enqueue(encoder.encode(JSON.stringify(errorAction) + '\n'));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate UI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * 데모용 UI 생성 함수
 * 실제 환경에서는 LLM API로 교체
 */
async function generateDemoUI(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  prompt: string,
  context?: any
) {
  // 루트 컨테이너 생성
  const rootAction: StreamAction = {
    action: 'create',
    component: {
      id: 'root',
      type: 'div',
      props: { className: 'space-y-4 p-4' },
      children: [],
      streaming: { status: 'streaming' },
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(rootAction) + '\n'));
  await sleep(300);

  // 프롬프트 기반 UI 생성
  if (prompt.toLowerCase().includes('dashboard') || prompt.toLowerCase().includes('대시보드')) {
    await generateDashboardUI(controller, encoder);
  } else if (prompt.toLowerCase().includes('form') || prompt.toLowerCase().includes('폼')) {
    await generateFormUI(controller, encoder);
  } else if (prompt.toLowerCase().includes('card') || prompt.toLowerCase().includes('카드')) {
    await generateCardsUI(controller, encoder);
  } else if (prompt.toLowerCase().includes('nested') || prompt.toLowerCase().includes('중첩')) {
    await generateNestedUI(controller, encoder);
  } else {
    await generateDefaultUI(controller, encoder, prompt);
  }

  // 완료
  const completeAction: StreamAction = {
    action: 'complete',
    componentId: 'root',
  };
  controller.enqueue(encoder.encode(JSON.stringify(completeAction) + '\n'));
}

/**
 * 대시보드 UI 생성
 */
async function generateDashboardUI(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  // 헤더 추가
  const headerAction: StreamAction = {
    action: 'append',
    parentId: 'root',
    component: {
      id: 'header',
      type: 'div',
      props: { className: 'mb-6' },
      children: [
        { id: 'title', type: 'h1', props: { className: 'text-3xl font-bold' }, children: ['Dashboard'] },
        { id: 'subtitle', type: 'p', props: { className: 'text-muted-foreground mt-2' }, children: ['Welcome to your analytics dashboard'] },
      ],
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(headerAction) + '\n'));
  await sleep(200);

  // 통계 카드들
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%' },
    { label: 'Active Users', value: '2,350', change: '+12.5%' },
    { label: 'Sales', value: '1,234', change: '+8.2%' },
  ];

  // 1단계: Skeleton 카드들을 먼저 모두 표시 (즉시 레이아웃 확보)
  for (let i = 0; i < stats.length; i++) {
    const skeletonAction: StreamAction = {
      action: 'append',
      parentId: 'root',
      component: {
        id: `stat-card-${i}`,
        type: 'Card',
        props: { className: 'mb-4' },
        children: [
          {
            id: `skeleton-${i}`,
            type: 'div',
            props: { className: 'p-6 space-y-3' },
            children: [
              { id: `skel-title-${i}`, type: 'Skeleton', props: { className: 'h-4 w-24' } },
              { id: `skel-value-${i}`, type: 'Skeleton', props: { className: 'h-8 w-32' } },
              { id: `skel-change-${i}`, type: 'Skeleton', props: { className: 'h-3 w-20' } },
            ],
          },
        ],
        streaming: { status: 'pending' },
      },
    };
    controller.enqueue(encoder.encode(JSON.stringify(skeletonAction) + '\n'));
  }
  await sleep(100); // Skeleton 렌더링 시간

  // 2단계: Skeleton을 실제 컨텐츠로 하나씩 교체
  for (let i = 0; i < stats.length; i++) {
    await sleep(400); // LLM이 생성하는 시뮬레이션

    const stat = stats[i];
    const replaceAction: StreamAction = {
      action: 'replace',
      componentId: `stat-card-${i}`,
      component: {
        id: `stat-card-${i}`,
        type: 'Card',
        props: { className: 'mb-4' },
        children: [
          {
            id: `stat-card-header-${i}`,
            type: 'CardHeader',
            children: [
              {
                id: `stat-card-title-${i}`,
                type: 'CardTitle',
                props: { className: 'text-sm font-medium' },
                children: [stat.label],
              },
            ],
          },
          {
            id: `stat-card-content-${i}`,
            type: 'CardContent',
            children: [
              {
                id: `stat-value-${i}`,
                type: 'div',
                props: { className: 'text-2xl font-bold' },
                children: [stat.value],
              },
              {
                id: `stat-change-${i}`,
                type: 'p',
                props: { className: 'text-xs text-muted-foreground' },
                children: [`${stat.change} from last month`],
              },
            ],
          },
        ],
        streaming: { status: 'complete' },
      },
    };
    controller.enqueue(encoder.encode(JSON.stringify(replaceAction) + '\n'));
  }
}

/**
 * 폼 UI 생성
 */
async function generateFormUI(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const formAction: StreamAction = {
    action: 'append',
    parentId: 'root',
    component: {
      id: 'form-card',
      type: 'Card',
      props: { className: 'w-full max-w-md mx-auto' },
      children: [
        {
          id: 'form-header',
          type: 'CardHeader',
          children: [
            { id: 'form-title', type: 'CardTitle', children: ['Create Account'] },
            { id: 'form-desc', type: 'CardDescription', children: ['Enter your information below'] },
          ],
        },
        {
          id: 'form-content',
          type: 'CardContent',
          props: { className: 'space-y-4' },
          children: [
            {
              id: 'name-field',
              type: 'div',
              props: { className: 'space-y-2' },
              children: [
                { id: 'name-label', type: 'Label', props: { htmlFor: 'name' }, children: ['Name'] },
                { id: 'name-input', type: 'Input', props: { id: 'name', placeholder: 'John Doe' } },
              ],
            },
            {
              id: 'email-field',
              type: 'div',
              props: { className: 'space-y-2' },
              children: [
                { id: 'email-label', type: 'Label', props: { htmlFor: 'email' }, children: ['Email'] },
                { id: 'email-input', type: 'Input', props: { id: 'email', type: 'email', placeholder: 'john@example.com' } },
              ],
            },
          ],
        },
        {
          id: 'form-footer',
          type: 'CardFooter',
          children: [
            {
              id: 'submit-btn',
              type: 'Button',
              props: { className: 'w-full' },
              children: ['Create Account'],
              actions: {
                onClick: {
                  type: 'submit',
                  payload: {
                    formName: 'createAccount',
                    message: 'Account creation submitted!',
                  },
                },
              },
            },
          ],
        },
      ],
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(formAction) + '\n'));
  await sleep(600);
}

/**
 * 카드 그리드 UI 생성
 */
async function generateCardsUI(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const items = [
    { title: 'Product 1', description: 'A great product', price: '$99' },
    { title: 'Product 2', description: 'Another amazing item', price: '$149' },
    { title: 'Product 3', description: 'Premium quality', price: '$199' },
  ];

  // 1단계: Skeleton 카드들을 먼저 모두 표시
  for (let i = 0; i < items.length; i++) {
    const skeletonAction: StreamAction = {
      action: 'append',
      parentId: 'root',
      component: {
        id: `product-card-${i}`,
        type: 'Card',
        props: { className: 'mb-4' },
        children: [
          {
            id: `product-skeleton-${i}`,
            type: 'div',
            props: { className: 'p-6 space-y-4' },
            children: [
              { id: `skel-prod-title-${i}`, type: 'Skeleton', props: { className: 'h-6 w-32' } },
              { id: `skel-prod-desc-${i}`, type: 'Skeleton', props: { className: 'h-4 w-48' } },
              {
                id: `skel-prod-footer-${i}`,
                type: 'div',
                props: { className: 'flex justify-between items-center mt-4' },
                children: [
                  { id: `skel-prod-price-${i}`, type: 'Skeleton', props: { className: 'h-8 w-20' } },
                  { id: `skel-prod-btn-${i}`, type: 'Skeleton', props: { className: 'h-10 w-28' } },
                ],
              },
            ],
          },
        ],
        streaming: { status: 'pending' },
      },
    };
    controller.enqueue(encoder.encode(JSON.stringify(skeletonAction) + '\n'));
  }
  await sleep(100);

  // 2단계: Skeleton을 실제 컨텐츠로 교체
  for (let i = 0; i < items.length; i++) {
    await sleep(400);

    const item = items[i];
    const replaceAction: StreamAction = {
      action: 'replace',
      componentId: `product-card-${i}`,
      component: {
        id: `product-card-${i}`,
        type: 'Card',
        props: { className: 'mb-4' },
        children: [
          {
            id: `product-header-${i}`,
            type: 'CardHeader',
            children: [
              { id: `product-title-${i}`, type: 'CardTitle', children: [item.title] },
              { id: `product-desc-${i}`, type: 'CardDescription', children: [item.description] },
            ],
          },
          {
            id: `product-footer-${i}`,
            type: 'CardFooter',
            props: { className: 'flex justify-between items-center' },
            children: [
              { id: `product-price-${i}`, type: 'span', props: { className: 'text-2xl font-bold' }, children: [item.price] },
              { id: `product-btn-${i}`, type: 'Button', children: ['Add to Cart'] },
            ],
          },
        ],
        streaming: { status: 'complete' },
      },
    };
    controller.enqueue(encoder.encode(JSON.stringify(replaceAction) + '\n'));
  }
}

/**
 * 기본 UI 생성
 */
async function generateDefaultUI(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  prompt: string
) {
  const cardAction: StreamAction = {
    action: 'append',
    parentId: 'root',
    component: {
      id: 'default-card',
      type: 'Card',
      children: [
        {
          id: 'default-header',
          type: 'CardHeader',
          children: [
            { id: 'default-title', type: 'CardTitle', children: ['Generated UI'] },
            { id: 'default-desc', type: 'CardDescription', children: [`Based on: "${prompt}"`] },
          ],
        },
        {
          id: 'default-content',
          type: 'CardContent',
          children: [
            { id: 'default-text', type: 'p', children: ['This is a dynamically generated UI based on your prompt. In a production environment, this would be generated by an LLM.'] },
          ],
        },
      ],
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(cardAction) + '\n'));
  await sleep(500);
}

/**
 * 중첩 UI 생성 (다층 구조 테스트용)
 * 외부 컨테이너 → Tabs → 각 Tab 내용 → 내부 카드들 순서로 생성
 */
async function generateNestedUI(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  // 1단계: 외부 Container Card를 pending 상태로 생성
  // 클라이언트가 Card 타입을 보고 자동으로 스켈레톤 생성
  console.log('🔷 1단계: Container pending 생성 (클라이언트가 스켈레톤 자동 생성)');
  const containerAction: StreamAction = {
    action: 'append',
    parentId: 'root',
    component: {
      id: 'container-card',
      type: 'Card',
      props: { className: 'w-full' },
      children: [],
      streaming: { status: 'pending' },
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(containerAction) + '\n'));
  await sleep(500);

  // 2단계: Header를 준비한 후 Container를 실제 컴포넌트로 교체
  console.log('🔷 2단계: Container Header와 함께 실제 Card로 교체');
  const replaceWithHeaderAction: StreamAction = {
    action: 'replace',
    componentId: 'container-card',
    component: {
      id: 'container-card',
      type: 'Card',
      props: { className: 'w-full' },
      children: [
        {
          id: 'container-header',
          type: 'CardHeader',
          children: [
            {
              id: 'container-title',
              type: 'CardTitle',
              children: ['Multi-Level Nested UI'],
            },
            {
              id: 'container-desc',
              type: 'CardDescription',
              children: ['외부 Container → Tabs → Tab Contents → Cards 구조'],
            },
          ],
        },
      ],
      streaming: { status: 'streaming' },
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(replaceWithHeaderAction) + '\n'));
  await sleep(400);

  // 3단계: Container 내부에 CardContent 추가
  console.log('🔷 3단계: CardContent 추가');
  const contentAction: StreamAction = {
    action: 'append',
    parentId: 'container-card',
    component: {
      id: 'container-content',
      type: 'CardContent',
      children: [],
      streaming: { status: 'streaming' },
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(contentAction) + '\n'));
  await sleep(400);

  // 4단계: Tabs 컴포넌트 추가 (Skeleton)
  console.log('🔷 4단계: Tabs Skeleton 추가');
  const tabsSkeletonAction: StreamAction = {
    action: 'append',
    parentId: 'container-content',
    component: {
      id: 'tabs-container',
      type: 'div',
      props: { className: 'w-full' },
      children: [
        {
          id: 'tabs-skeleton',
          type: 'div',
          props: { className: 'space-y-4' },
          children: [
            { id: 'tabs-skel-1', type: 'Skeleton', props: { className: 'h-10 w-full' } },
            { id: 'tabs-skel-2', type: 'Skeleton', props: { className: 'h-64 w-full' } },
          ],
        },
      ],
      streaming: { status: 'pending' },
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(tabsSkeletonAction) + '\n'));
  await sleep(600);

  // 5단계: Tabs를 실제 컴포넌트로 교체
  console.log('🔷 5단계: Tabs 실제 컴포넌트로 교체');
  const tabsAction: StreamAction = {
    action: 'replace',
    componentId: 'tabs-container',
    component: {
      id: 'tabs-container',
      type: 'Tabs',
      props: { defaultValue: 'overview', className: 'w-full' },
      children: [
        {
          id: 'tabs-list',
          type: 'TabsList',
          props: { className: 'grid w-full grid-cols-3' },
          children: [
            { id: 'tab-trigger-1', type: 'TabsTrigger', props: { value: 'overview' }, children: ['Overview'] },
            { id: 'tab-trigger-2', type: 'TabsTrigger', props: { value: 'analytics' }, children: ['Analytics'] },
            { id: 'tab-trigger-3', type: 'TabsTrigger', props: { value: 'reports' }, children: ['Reports'] },
          ],
        },
        {
          id: 'tab-content-overview',
          type: 'TabsContent',
          props: { value: 'overview', className: 'space-y-4' },
          children: [],
          streaming: { status: 'streaming' },
        },
        {
          id: 'tab-content-analytics',
          type: 'TabsContent',
          props: { value: 'analytics' },
          children: [
            {
              id: 'analytics-placeholder',
              type: 'div',
              props: { className: 'text-center p-8 text-muted-foreground' },
              children: ['Analytics content will appear here'],
            },
          ],
        },
        {
          id: 'tab-content-reports',
          type: 'TabsContent',
          props: { value: 'reports' },
          children: [
            {
              id: 'reports-placeholder',
              type: 'div',
              props: { className: 'text-center p-8 text-muted-foreground' },
              children: ['Reports content will appear here'],
            },
          ],
        },
      ],
      streaming: { status: 'complete' },
    },
  };
  controller.enqueue(encoder.encode(JSON.stringify(tabsAction) + '\n'));
  await sleep(500);

  // 6단계: Overview 탭 내부에 Skeleton 카드들 추가
  console.log('🔷 6단계: Overview 탭에 Skeleton 카드 추가');
  for (let i = 0; i < 3; i++) {
    const cardSkeletonAction: StreamAction = {
      action: 'append',
      parentId: 'tab-content-overview',
      component: {
        id: `overview-card-${i}`,
        type: 'Card',
        children: [
          {
            id: `overview-card-skeleton-${i}`,
            type: 'div',
            props: { className: 'p-6 space-y-3' },
            children: [
              { id: `overview-skel-title-${i}`, type: 'Skeleton', props: { className: 'h-5 w-32' } },
              { id: `overview-skel-content-${i}`, type: 'Skeleton', props: { className: 'h-20 w-full' } },
            ],
          },
        ],
        streaming: { status: 'pending' },
      },
    };
    controller.enqueue(encoder.encode(JSON.stringify(cardSkeletonAction) + '\n'));
  }
  await sleep(300);

  // 7단계: 각 카드를 실제 컨텐츠로 교체
  console.log('🔷 7단계: 카드들을 실제 컨텐츠로 교체');
  const metrics = [
    { title: 'Total Users', value: '45,231', description: 'Active users in the system' },
    { title: 'Revenue', value: '$123,456', description: 'Total revenue this month' },
    { title: 'Performance', value: '98.2%', description: 'System uptime percentage' },
  ];

  for (let i = 0; i < metrics.length; i++) {
    await sleep(500);
    const metric = metrics[i];

    const cardReplaceAction: StreamAction = {
      action: 'replace',
      componentId: `overview-card-${i}`,
      component: {
        id: `overview-card-${i}`,
        type: 'Card',
        children: [
          {
            id: `overview-card-header-${i}`,
            type: 'CardHeader',
            children: [
              {
                id: `overview-card-title-${i}`,
                type: 'CardTitle',
                props: { className: 'text-lg' },
                children: [metric.title],
              },
            ],
          },
          {
            id: `overview-card-content-${i}`,
            type: 'CardContent',
            children: [
              {
                id: `overview-card-value-${i}`,
                type: 'div',
                props: { className: 'text-3xl font-bold text-primary' },
                children: [metric.value],
              },
              {
                id: `overview-card-desc-${i}`,
                type: 'p',
                props: { className: 'text-sm text-muted-foreground mt-2' },
                children: [metric.description],
              },
            ],
          },
        ],
        streaming: { status: 'complete' },
      },
    };
    controller.enqueue(encoder.encode(JSON.stringify(cardReplaceAction) + '\n'));
  }

  console.log('✅ 중첩 UI 생성 완료');
}

/**
 * 유틸리티: sleep 함수
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
