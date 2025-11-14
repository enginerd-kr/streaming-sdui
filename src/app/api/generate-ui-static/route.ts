import { NextRequest, NextResponse } from 'next/server';
import type { UINode } from '@/lib/sdui/types';

/**
 * 정적 UI 생성 API
 * 스트리밍 없이 완성된 UI를 한 번에 반환
 */
export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // 시뮬레이션 딜레이 (실제 LLM 호출 시뮬레이션)
    await sleep(1000);

    // 완성된 UI 트리 생성
    const uiTree = generateCompleteUI(prompt);

    return NextResponse.json({ uiTree });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate UI' },
      { status: 500 }
    );
  }
}

/**
 * 완성된 UI 생성 함수
 */
function generateCompleteUI(prompt: string): UINode {
  // 프롬프트 기반 UI 생성
  if (prompt.toLowerCase().includes('dashboard') || prompt.toLowerCase().includes('대시보드')) {
    return generateDashboardUI();
  } else if (prompt.toLowerCase().includes('form') || prompt.toLowerCase().includes('폼')) {
    return generateFormUI();
  } else if (prompt.toLowerCase().includes('card') || prompt.toLowerCase().includes('카드')) {
    return generateCardsUI();
  } else if (prompt.toLowerCase().includes('nested') || prompt.toLowerCase().includes('중첩')) {
    return generateNestedUI();
  } else {
    return generateDefaultUI(prompt);
  }
}

/**
 * 대시보드 UI 생성
 */
function generateDashboardUI(): UINode {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%' },
    { label: 'Active Users', value: '2,350', change: '+12.5%' },
    { label: 'Sales', value: '1,234', change: '+8.2%' },
  ];

  return {
    id: 'root',
    type: 'div',
    props: { className: 'space-y-4 p-4' },
    children: [
      // 헤더
      {
        id: 'header',
        type: 'div',
        props: { className: 'mb-6' },
        children: [
          {
            id: 'title',
            type: 'h1',
            props: { className: 'text-3xl font-bold' },
            children: ['Dashboard'],
          },
          {
            id: 'subtitle',
            type: 'p',
            props: { className: 'text-muted-foreground mt-2' },
            children: ['Welcome to your analytics dashboard'],
          },
        ],
      },
      // 통계 카드들
      ...stats.map((stat, i) => ({
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
      })),
    ],
  };
}

/**
 * 폼 UI 생성
 */
function generateFormUI(): UINode {
  return {
    id: 'root',
    type: 'div',
    props: { className: 'space-y-4 p-4' },
    children: [
      {
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
    ],
  };
}

/**
 * 카드 그리드 UI 생성
 */
function generateCardsUI(): UINode {
  const items = [
    { title: 'Product 1', description: 'A great product', price: '$99' },
    { title: 'Product 2', description: 'Another amazing item', price: '$149' },
    { title: 'Product 3', description: 'Premium quality', price: '$199' },
  ];

  return {
    id: 'root',
    type: 'div',
    props: { className: 'space-y-4 p-4' },
    children: items.map((item, i) => ({
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
    })),
  };
}

/**
 * 기본 UI 생성
 */
function generateDefaultUI(prompt: string): UINode {
  return {
    id: 'root',
    type: 'div',
    props: { className: 'space-y-4 p-4' },
    children: [
      {
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
    ],
  };
}

/**
 * 중첩 UI 생성 (정적 버전)
 */
function generateNestedUI(): UINode {
  const metrics = [
    { title: 'Total Users', value: '45,231', description: 'Active users in the system' },
    { title: 'Revenue', value: '$123,456', description: 'Total revenue this month' },
    { title: 'Performance', value: '98.2%', description: 'System uptime percentage' },
  ];

  return {
    id: 'root',
    type: 'div',
    props: { className: 'space-y-4 p-4' },
    children: [
      {
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
          {
            id: 'container-content',
            type: 'CardContent',
            children: [
              {
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
                    children: metrics.map((metric, i) => ({
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
                    })),
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
              },
            ],
          },
        ],
      },
    ],
  };
}

/**
 * 유틸리티: sleep 함수
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
