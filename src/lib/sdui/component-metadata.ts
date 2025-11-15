import { UINode } from './types';

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

export interface ComponentExample {
  title: string;
  description: string;
  dsl: string;
  json: UINode;
}

export interface ComponentMetadata {
  name: string;
  category: 'container' | 'primitive' | 'html';
  description: string;
  props: PropDefinition[];
  examples: ComponentExample[];
}

export const componentMetadata: Record<string, ComponentMetadata> = {
  // ============================================
  // Container Components
  // ============================================
  Screen: {
    name: 'Screen',
    category: 'container',
    description: '화면 전체를 담는 최상위 컨테이너입니다. SafeArea와 스크롤을 설정할 수 있습니다.',
    props: [
      {
        name: 'backgroundColor',
        type: 'string',
        description: '배경색 (CSS 색상값)',
      },
      {
        name: 'safeArea',
        type: 'boolean',
        description: 'SafeArea 적용 여부',
        default: 'false',
      },
      {
        name: 'scrollable',
        type: 'boolean',
        description: '스크롤 가능 여부',
        default: 'false',
      },
      {
        name: 'padding',
        type: 'number | string',
        description: '패딩 값',
      },
      {
        name: 'className',
        type: 'string',
        description: '추가 CSS 클래스',
      },
    ],
    examples: [
      {
        title: '기본 화면',
        description: '기본 스크린 설정',
        dsl: `Screen
  @backgroundColor: #f5f5f5
  @scrollable: true
  @padding: 20px

  h1: Welcome
  p: This is a screen component`,
        json: {
          id: 'screen-1',
          type: 'Screen',
          props: {
            backgroundColor: '#f5f5f5',
            scrollable: true,
            padding: '20px',
          },
          children: [
            {
              id: 'title',
              type: 'h1',
              children: ['Welcome'],
            },
            {
              id: 'desc',
              type: 'p',
              children: ['This is a screen component'],
            },
          ],
        },
      },
    ],
  },

  AppBar: {
    name: 'AppBar',
    category: 'container',
    description: '상단 네비게이션 바입니다. 타이틀, 뒤로가기 버튼, 액션 버튼을 포함할 수 있습니다.',
    props: [
      {
        name: 'title',
        type: 'string',
        description: '앱바 타이틀',
      },
      {
        name: 'leading',
        type: 'ReactNode',
        description: '왼쪽 버튼 (보통 뒤로가기)',
      },
      {
        name: 'actions',
        type: 'ReactNode',
        description: '오른쪽 액션 버튼들',
      },
      {
        name: 'position',
        type: "'fixed' | 'sticky' | 'static'",
        description: '위치 고정 방식',
        default: 'sticky',
      },
      {
        name: 'elevation',
        type: 'number',
        description: '그림자 깊이 (0-5)',
        default: '2',
      },
    ],
    examples: [
      {
        title: '기본 앱바',
        description: '타이틀만 있는 간단한 앱바',
        dsl: `AppBar
  @title: My App
  @position: sticky
  @elevation: 2`,
        json: {
          id: 'appbar-1',
          type: 'AppBar',
          props: {
            title: 'My App',
            position: 'sticky',
            elevation: 2,
          },
        },
      },
    ],
  },

  VStack: {
    name: 'VStack',
    category: 'container',
    description: '세로 방향으로 자식을 배치하는 스택 레이아웃입니다. Flexbox 기반입니다.',
    props: [
      {
        name: 'spacing',
        type: 'number | string',
        description: '자식 간 간격',
      },
      {
        name: 'alignment',
        type: "'start' | 'center' | 'end' | 'stretch'",
        description: '가로 정렬',
        default: 'stretch',
      },
      {
        name: 'justify',
        type: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'",
        description: '세로 정렬',
      },
      {
        name: 'wrap',
        type: 'boolean',
        description: 'wrap 여부',
        default: 'false',
      },
    ],
    examples: [
      {
        title: '간격이 있는 세로 스택',
        description: '카드를 세로로 균등한 간격으로 배치',
        dsl: `VStack
  @spacing: 16
  @alignment: stretch

  Card
    CardHeader
      CardTitle: Dashboard Overview
      CardDescription: View your key metrics
    CardContent
      p: Total users: 1,234
      p: Active sessions: 89

  Card
    CardHeader
      CardTitle: Recent Activity
      CardDescription: Latest updates from your team
    CardContent
      p: John posted a new update
      p: Sarah completed the project

  Card
    CardHeader
      CardTitle: Quick Actions
      CardDescription: Frequently used features
    CardContent
      HStack
        @spacing: 8
        Button: New Post
          @variant: default
        Button: Settings
          @variant: outline`,
        json: {
          id: 'vstack-1',
          type: 'VStack',
          props: {
            spacing: 16,
            alignment: 'stretch',
          },
          children: [
            {
              id: 'card-1',
              type: 'Card',
              children: [
                {
                  id: 'header-1',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-1',
                      type: 'CardTitle',
                      children: ['Dashboard Overview'],
                    },
                    {
                      id: 'desc-1',
                      type: 'CardDescription',
                      children: ['View your key metrics'],
                    },
                  ],
                },
                {
                  id: 'content-1',
                  type: 'CardContent',
                  children: [
                    {
                      id: 'p-1',
                      type: 'p',
                      children: ['Total users: 1,234'],
                    },
                    {
                      id: 'p-2',
                      type: 'p',
                      children: ['Active sessions: 89'],
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-2',
              type: 'Card',
              children: [
                {
                  id: 'header-2',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-2',
                      type: 'CardTitle',
                      children: ['Recent Activity'],
                    },
                    {
                      id: 'desc-2',
                      type: 'CardDescription',
                      children: ['Latest updates from your team'],
                    },
                  ],
                },
                {
                  id: 'content-2',
                  type: 'CardContent',
                  children: [
                    {
                      id: 'p-3',
                      type: 'p',
                      children: ['John posted a new update'],
                    },
                    {
                      id: 'p-4',
                      type: 'p',
                      children: ['Sarah completed the project'],
                    },
                  ],
                },
              ],
            },
            {
              id: 'card-3',
              type: 'Card',
              children: [
                {
                  id: 'header-3',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-3',
                      type: 'CardTitle',
                      children: ['Quick Actions'],
                    },
                    {
                      id: 'desc-3',
                      type: 'CardDescription',
                      children: ['Frequently used features'],
                    },
                  ],
                },
                {
                  id: 'content-3',
                  type: 'CardContent',
                  children: [
                    {
                      id: 'hstack-1',
                      type: 'HStack',
                      props: {
                        spacing: 8,
                      },
                      children: [
                        {
                          id: 'btn-1',
                          type: 'Button',
                          props: {
                            variant: 'default',
                          },
                          children: ['New Post'],
                        },
                        {
                          id: 'btn-2',
                          type: 'Button',
                          props: {
                            variant: 'outline',
                          },
                          children: ['Settings'],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  HStack: {
    name: 'HStack',
    category: 'container',
    description: '가로 방향으로 자식을 배치하는 스택 레이아웃입니다. Flexbox 기반입니다.',
    props: [
      {
        name: 'spacing',
        type: 'number | string',
        description: '자식 간 간격',
      },
      {
        name: 'alignment',
        type: "'start' | 'center' | 'end' | 'stretch'",
        description: '세로 정렬',
        default: 'stretch',
      },
      {
        name: 'justify',
        type: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'",
        description: '가로 정렬',
      },
      {
        name: 'wrap',
        type: 'boolean',
        description: 'wrap 여부',
        default: 'false',
      },
    ],
    examples: [
      {
        title: '간격이 있는 가로 스택',
        description: '버튼을 가로로 배치',
        dsl: `HStack
  @spacing: 12
  @justify: center

  Button: Cancel
    @variant: outline
  Button: Save
    @variant: default`,
        json: {
          id: 'hstack-1',
          type: 'HStack',
          props: {
            spacing: 12,
            justify: 'center',
          },
          children: [
            {
              id: 'btn-1',
              type: 'Button',
              props: {
                variant: 'outline',
              },
              children: ['Cancel'],
            },
            {
              id: 'btn-2',
              type: 'Button',
              props: {
                variant: 'default',
              },
              children: ['Save'],
            },
          ],
        },
      },
    ],
  },

  ZStack: {
    name: 'ZStack',
    category: 'container',
    description: '자식을 겹쳐서 배치하는 레이아웃입니다. CSS position을 사용합니다.',
    props: [
      {
        name: 'alignment',
        type: "'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'",
        description: '정렬 위치',
        default: 'center',
      },
    ],
    examples: [
      {
        title: '배경과 텍스트 오버레이',
        description: '색상 배경 위에 중앙 정렬된 텍스트',
        dsl: `ZStack
  @alignment: center
  @className: h-64 w-full rounded-lg

  div
    @className: w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg

  VStack
    @spacing: 12
    @alignment: center
    @className: text-white

    h2: Overlay Content
      @className: text-4xl font-bold drop-shadow-lg
    p: Beautiful text layered on gradient background
      @className: text-lg drop-shadow-md`,
        json: {
          id: 'zstack-1',
          type: 'ZStack',
          props: {
            alignment: 'center',
            className: 'h-64 w-full rounded-lg',
          },
          children: [
            {
              id: 'bg-1',
              type: 'div',
              props: {
                className: 'w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg',
              },
            },
            {
              id: 'content-1',
              type: 'VStack',
              props: {
                spacing: 12,
                alignment: 'center',
                className: 'text-white',
              },
              children: [
                {
                  id: 'title-1',
                  type: 'h2',
                  props: {
                    className: 'text-4xl font-bold drop-shadow-lg',
                  },
                  children: ['Overlay Content'],
                },
                {
                  id: 'desc-1',
                  type: 'p',
                  props: {
                    className: 'text-lg drop-shadow-md',
                  },
                  children: ['Beautiful text layered on gradient background'],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  ScrollView: {
    name: 'ScrollView',
    category: 'container',
    description: '스크롤 가능한 컨테이너입니다. 세로, 가로, 양방향 스크롤을 지원합니다.',
    props: [
      {
        name: 'direction',
        type: "'vertical' | 'horizontal' | 'both'",
        description: '스크롤 방향',
        default: 'vertical',
      },
      {
        name: 'showScrollbar',
        type: 'boolean',
        description: '스크롤바 표시 여부',
        default: 'true',
      },
    ],
    examples: [
      {
        title: '가로 스크롤 카드',
        description: '고정 너비를 가진 카드들을 가로로 스크롤',
        dsl: `ScrollView
  @direction: horizontal
  @className: w-full

  HStack
    @spacing: 16
    @className: px-4
    @wrap: false

    Card
      @className: w-[500px] shrink-0
      CardHeader
        CardTitle: Product 1
      CardContent: This is a horizontally scrollable card with 500px width

    Card
      @className: w-[500px] shrink-0
      CardHeader
        CardTitle: Product 2
      CardContent: Each card has a fixed width to ensure scrolling

    Card
      @className: w-[500px] shrink-0
      CardHeader
        CardTitle: Product 3
      CardContent: Scroll horizontally to see more cards

    Card
      @className: w-[500px] shrink-0
      CardHeader
        CardTitle: Product 4
      CardContent: Additional content here with more space

    Card
      @className: w-[500px] shrink-0
      CardHeader
        CardTitle: Product 5
      CardContent: Even more cards to scroll through`,
        json: {
          id: 'scroll-1',
          type: 'ScrollView',
          props: {
            direction: 'horizontal',
            className: 'w-full',
          },
          children: [
            {
              id: 'hstack-1',
              type: 'HStack',
              props: {
                spacing: 16,
                className: 'px-4',
                wrap: false,
              },
              children: [
                {
                  id: 'card-1',
                  type: 'Card',
                  props: {
                    className: 'w-[500px] shrink-0',
                  },
                  children: [
                    {
                      id: 'header-1',
                      type: 'CardHeader',
                      children: [
                        {
                          id: 'title-1',
                          type: 'CardTitle',
                          children: ['Product 1'],
                        },
                      ],
                    },
                    {
                      id: 'content-1',
                      type: 'CardContent',
                      children: ['This is a horizontally scrollable card with 500px width'],
                    },
                  ],
                },
                {
                  id: 'card-2',
                  type: 'Card',
                  props: {
                    className: 'w-[500px] shrink-0',
                  },
                  children: [
                    {
                      id: 'header-2',
                      type: 'CardHeader',
                      children: [
                        {
                          id: 'title-2',
                          type: 'CardTitle',
                          children: ['Product 2'],
                        },
                      ],
                    },
                    {
                      id: 'content-2',
                      type: 'CardContent',
                      children: ['Each card has a fixed width to ensure scrolling'],
                    },
                  ],
                },
                {
                  id: 'card-3',
                  type: 'Card',
                  props: {
                    className: 'w-[500px] shrink-0',
                  },
                  children: [
                    {
                      id: 'header-3',
                      type: 'CardHeader',
                      children: [
                        {
                          id: 'title-3',
                          type: 'CardTitle',
                          children: ['Product 3'],
                        },
                      ],
                    },
                    {
                      id: 'content-3',
                      type: 'CardContent',
                      children: ['Scroll horizontally to see more cards'],
                    },
                  ],
                },
                {
                  id: 'card-4',
                  type: 'Card',
                  props: {
                    className: 'w-[500px] shrink-0',
                  },
                  children: [
                    {
                      id: 'header-4',
                      type: 'CardHeader',
                      children: [
                        {
                          id: 'title-4',
                          type: 'CardTitle',
                          children: ['Product 4'],
                        },
                      ],
                    },
                    {
                      id: 'content-4',
                      type: 'CardContent',
                      children: ['Additional content here with more space'],
                    },
                  ],
                },
                {
                  id: 'card-5',
                  type: 'Card',
                  props: {
                    className: 'w-[500px] shrink-0',
                  },
                  children: [
                    {
                      id: 'header-5',
                      type: 'CardHeader',
                      children: [
                        {
                          id: 'title-5',
                          type: 'CardTitle',
                          children: ['Product 5'],
                        },
                      ],
                    },
                    {
                      id: 'content-5',
                      type: 'CardContent',
                      children: ['Even more cards to scroll through'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  Grid: {
    name: 'Grid',
    category: 'container',
    description: 'CSS Grid 레이아웃입니다. 반응형 그리드를 쉽게 만들 수 있습니다.',
    props: [
      {
        name: 'columns',
        type: 'number | string',
        description: '컬럼 수 또는 grid-template-columns 값',
      },
      {
        name: 'rows',
        type: 'number | string',
        description: '로우 수 또는 grid-template-rows 값',
      },
      {
        name: 'gap',
        type: 'number | string',
        description: '간격',
      },
      {
        name: 'responsive',
        type: 'object',
        description: '반응형 설정 (sm, md, lg, xl)',
      },
    ],
    examples: [
      {
        title: '반응형 그리드',
        description: '모바일 1열, 태블릿 2열, 데스크톱 3열',
        dsl: `Grid
  @columns: 1
  @gap: 16
  @responsive: {"md": {"columns": 2}, "lg": {"columns": 3}}

  Card
    CardHeader
      CardTitle: Feature 1
      CardDescription: First grid item
    CardContent: This card adapts to screen size

  Card
    CardHeader
      CardTitle: Feature 2
      CardDescription: Second grid item
    CardContent: Grid automatically adjusts columns

  Card
    CardHeader
      CardTitle: Feature 3
      CardDescription: Third grid item
    CardContent: Responsive layout made easy

  Card
    CardHeader
      CardTitle: Feature 4
      CardDescription: Fourth grid item
    CardContent: 1 column on mobile, 2 on tablet

  Card
    CardHeader
      CardTitle: Feature 5
      CardDescription: Fifth grid item
    CardContent: 3 columns on desktop

  Card
    CardHeader
      CardTitle: Feature 6
      CardDescription: Sixth grid item
    CardContent: Perfect for feature showcases`,
        json: {
          id: 'grid-1',
          type: 'Grid',
          props: {
            columns: 1,
            gap: 16,
            responsive: {
              md: { columns: 2 },
              lg: { columns: 3 },
            },
          },
          children: [
            {
              id: 'card-1',
              type: 'Card',
              children: [
                {
                  id: 'header-1',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-1',
                      type: 'CardTitle',
                      children: ['Feature 1'],
                    },
                    {
                      id: 'desc-1',
                      type: 'CardDescription',
                      children: ['First grid item'],
                    },
                  ],
                },
                {
                  id: 'content-1',
                  type: 'CardContent',
                  children: ['This card adapts to screen size'],
                },
              ],
            },
            {
              id: 'card-2',
              type: 'Card',
              children: [
                {
                  id: 'header-2',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-2',
                      type: 'CardTitle',
                      children: ['Feature 2'],
                    },
                    {
                      id: 'desc-2',
                      type: 'CardDescription',
                      children: ['Second grid item'],
                    },
                  ],
                },
                {
                  id: 'content-2',
                  type: 'CardContent',
                  children: ['Grid automatically adjusts columns'],
                },
              ],
            },
            {
              id: 'card-3',
              type: 'Card',
              children: [
                {
                  id: 'header-3',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-3',
                      type: 'CardTitle',
                      children: ['Feature 3'],
                    },
                    {
                      id: 'desc-3',
                      type: 'CardDescription',
                      children: ['Third grid item'],
                    },
                  ],
                },
                {
                  id: 'content-3',
                  type: 'CardContent',
                  children: ['Responsive layout made easy'],
                },
              ],
            },
            {
              id: 'card-4',
              type: 'Card',
              children: [
                {
                  id: 'header-4',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-4',
                      type: 'CardTitle',
                      children: ['Feature 4'],
                    },
                    {
                      id: 'desc-4',
                      type: 'CardDescription',
                      children: ['Fourth grid item'],
                    },
                  ],
                },
                {
                  id: 'content-4',
                  type: 'CardContent',
                  children: ['1 column on mobile, 2 on tablet'],
                },
              ],
            },
            {
              id: 'card-5',
              type: 'Card',
              children: [
                {
                  id: 'header-5',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-5',
                      type: 'CardTitle',
                      children: ['Feature 5'],
                    },
                    {
                      id: 'desc-5',
                      type: 'CardDescription',
                      children: ['Fifth grid item'],
                    },
                  ],
                },
                {
                  id: 'content-5',
                  type: 'CardContent',
                  children: ['3 columns on desktop'],
                },
              ],
            },
            {
              id: 'card-6',
              type: 'Card',
              children: [
                {
                  id: 'header-6',
                  type: 'CardHeader',
                  children: [
                    {
                      id: 'title-6',
                      type: 'CardTitle',
                      children: ['Feature 6'],
                    },
                    {
                      id: 'desc-6',
                      type: 'CardDescription',
                      children: ['Sixth grid item'],
                    },
                  ],
                },
                {
                  id: 'content-6',
                  type: 'CardContent',
                  children: ['Perfect for feature showcases'],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  Container: {
    name: 'Container',
    category: 'container',
    description: '최대 너비를 제한하고 중앙 정렬하는 컨테이너입니다.',
    props: [
      {
        name: 'maxWidth',
        type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number",
        description: '최대 너비',
        default: 'lg',
      },
      {
        name: 'center',
        type: 'boolean',
        description: '중앙 정렬 여부',
        default: 'true',
      },
      {
        name: 'padding',
        type: 'number | string',
        description: '패딩',
      },
    ],
    examples: [
      {
        title: '중앙 정렬 컨테이너',
        description: '최대 너비를 제한하고 중앙 정렬',
        dsl: `Container
  @maxWidth: md
  @padding: 24px

  h1: Centered Content
  p: This content is centered and has a max width`,
        json: {
          id: 'container-1',
          type: 'Container',
          props: {
            maxWidth: 'md',
            padding: '24px',
          },
          children: [
            {
              id: 'title-1',
              type: 'h1',
              children: ['Centered Content'],
            },
            {
              id: 'desc-1',
              type: 'p',
              children: ['This content is centered and has a max width'],
            },
          ],
        },
      },
    ],
  },

  SafeArea: {
    name: 'SafeArea',
    category: 'container',
    description: '노치나 홈 인디케이터 영역을 피하는 안전 영역 패딩을 제공합니다.',
    props: [
      {
        name: 'edges',
        type: "('top' | 'bottom' | 'left' | 'right')[]",
        description: '적용할 엣지',
        default: "['top', 'bottom']",
      },
    ],
    examples: [
      {
        title: '상하단 SafeArea',
        description: '상단과 하단에 SafeArea 적용',
        dsl: `SafeArea
  @edges: ["top", "bottom"]

  VStack
    h1: Safe Content
    p: This content respects safe areas`,
        json: {
          id: 'safearea-1',
          type: 'SafeArea',
          props: {
            edges: ['top', 'bottom'],
          },
          children: [
            {
              id: 'stack-1',
              type: 'VStack',
              children: [
                {
                  id: 'title-1',
                  type: 'h1',
                  children: ['Safe Content'],
                },
                {
                  id: 'desc-1',
                  type: 'p',
                  children: ['This content respects safe areas'],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // ============================================
  // Primitive Components
  // ============================================
  Button: {
    name: 'Button',
    category: 'primitive',
    description: 'shadcn/ui 버튼 컴포넌트입니다. 다양한 variant와 size를 지원합니다.',
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        description: '버튼 스타일',
        default: 'default',
      },
      {
        name: 'size',
        type: "'default' | 'sm' | 'lg' | 'icon'",
        description: '버튼 크기',
        default: 'default',
      },
    ],
    examples: [
      {
        title: '다양한 버튼 스타일',
        description: '여러 variant를 가진 버튼들',
        dsl: `HStack
  @spacing: 8

  Button: Default
    @variant: default
  Button: Outline
    @variant: outline
  Button: Ghost
    @variant: ghost`,
        json: {
          id: 'buttons-1',
          type: 'HStack',
          props: {
            spacing: 8,
          },
          children: [
            {
              id: 'btn-1',
              type: 'Button',
              props: {
                variant: 'default',
              },
              children: ['Default'],
            },
            {
              id: 'btn-2',
              type: 'Button',
              props: {
                variant: 'outline',
              },
              children: ['Outline'],
            },
            {
              id: 'btn-3',
              type: 'Button',
              props: {
                variant: 'ghost',
              },
              children: ['Ghost'],
            },
          ],
        },
      },
    ],
  },

  Input: {
    name: 'Input',
    category: 'primitive',
    description: 'shadcn/ui 인풋 컴포넌트입니다. 다양한 타입의 입력을 지원합니다.',
    props: [
      {
        name: 'type',
        type: 'string',
        description: '인풋 타입 (text, email, password 등)',
        default: 'text',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: '플레이스홀더 텍스트',
      },
    ],
    examples: [
      {
        title: '폼 입력',
        description: '라벨과 함께 사용하는 인풋',
        dsl: `VStack
  @spacing: 8

  Label: Email
    @htmlFor: email
  Input
    @id: email
    @type: email
    @placeholder: Enter your email`,
        json: {
          id: 'form-1',
          type: 'VStack',
          props: {
            spacing: 8,
          },
          children: [
            {
              id: 'label-1',
              type: 'Label',
              props: {
                htmlFor: 'email',
              },
              children: ['Email'],
            },
            {
              id: 'input-1',
              type: 'Input',
              props: {
                id: 'email',
                type: 'email',
                placeholder: 'Enter your email',
              },
            },
          ],
        },
      },
    ],
  },

  Label: {
    name: 'Label',
    category: 'primitive',
    description: 'shadcn/ui 라벨 컴포넌트입니다. 폼 요소와 함께 사용합니다.',
    props: [
      {
        name: 'htmlFor',
        type: 'string',
        description: '연결할 input의 id',
      },
    ],
    examples: [
      {
        title: '라벨과 인풋',
        description: 'htmlFor로 연결된 라벨',
        dsl: `Label: Username
  @htmlFor: username`,
        json: {
          id: 'label-1',
          type: 'Label',
          props: {
            htmlFor: 'username',
          },
          children: ['Username'],
        },
      },
    ],
  },

  Card: {
    name: 'Card',
    category: 'primitive',
    description: 'shadcn/ui 카드 컴포넌트입니다. 컨텐츠를 그룹화합니다.',
    props: [
      {
        name: 'className',
        type: 'string',
        description: '추가 CSS 클래스',
      },
    ],
    examples: [
      {
        title: '완전한 카드',
        description: 'Header, Content, Footer가 있는 카드',
        dsl: `Card
  CardHeader
    CardTitle: Card Title
    CardDescription: Card description here
  CardContent
    p: This is the main content
  CardFooter
    Button: Action`,
        json: {
          id: 'card-1',
          type: 'Card',
          children: [
            {
              id: 'header-1',
              type: 'CardHeader',
              children: [
                {
                  id: 'title-1',
                  type: 'CardTitle',
                  children: ['Card Title'],
                },
                {
                  id: 'desc-1',
                  type: 'CardDescription',
                  children: ['Card description here'],
                },
              ],
            },
            {
              id: 'content-1',
              type: 'CardContent',
              children: [
                {
                  id: 'p-1',
                  type: 'p',
                  children: ['This is the main content'],
                },
              ],
            },
            {
              id: 'footer-1',
              type: 'CardFooter',
              children: [
                {
                  id: 'btn-1',
                  type: 'Button',
                  children: ['Action'],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  Tabs: {
    name: 'Tabs',
    category: 'primitive',
    description: 'shadcn/ui 탭 컴포넌트입니다. 여러 컨텐츠를 탭으로 전환할 수 있습니다.',
    props: [
      {
        name: 'defaultValue',
        type: 'string',
        description: '기본 선택 탭',
        required: true,
      },
    ],
    examples: [
      {
        title: '기본 탭',
        description: '3개의 탭이 있는 예제',
        dsl: `Tabs
  @defaultValue: tab1

  TabsList
    TabsTrigger: Tab 1
      @value: tab1
    TabsTrigger: Tab 2
      @value: tab2

  TabsContent
    @value: tab1
    p: Content for Tab 1

  TabsContent
    @value: tab2
    p: Content for Tab 2`,
        json: {
          id: 'tabs-1',
          type: 'Tabs',
          props: {
            defaultValue: 'tab1',
          },
          children: [
            {
              id: 'list-1',
              type: 'TabsList',
              children: [
                {
                  id: 'trigger-1',
                  type: 'TabsTrigger',
                  props: {
                    value: 'tab1',
                  },
                  children: ['Tab 1'],
                },
                {
                  id: 'trigger-2',
                  type: 'TabsTrigger',
                  props: {
                    value: 'tab2',
                  },
                  children: ['Tab 2'],
                },
              ],
            },
            {
              id: 'content-1',
              type: 'TabsContent',
              props: {
                value: 'tab1',
              },
              children: [
                {
                  id: 'p-1',
                  type: 'p',
                  children: ['Content for Tab 1'],
                },
              ],
            },
            {
              id: 'content-2',
              type: 'TabsContent',
              props: {
                value: 'tab2',
              },
              children: [
                {
                  id: 'p-2',
                  type: 'p',
                  children: ['Content for Tab 2'],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  Skeleton: {
    name: 'Skeleton',
    category: 'primitive',
    description: '로딩 중 스켈레톤 플레이스홀더입니다.',
    props: [
      {
        name: 'className',
        type: 'string',
        description: '추가 CSS 클래스 (크기 조정용)',
      },
    ],
    examples: [
      {
        title: '로딩 스켈레톤',
        description: '카드 로딩 상태',
        dsl: `VStack
  @spacing: 16

  Skeleton
    @className: h-12 w-12 rounded-full
  Skeleton
    @className: h-4 w-full
  Skeleton
    @className: h-4 w-3/4`,
        json: {
          id: 'skeleton-1',
          type: 'VStack',
          props: {
            spacing: 16,
          },
          children: [
            {
              id: 'sk-1',
              type: 'Skeleton',
              props: {
                className: 'h-12 w-12 rounded-full',
              },
            },
            {
              id: 'sk-2',
              type: 'Skeleton',
              props: {
                className: 'h-4 w-full',
              },
            },
            {
              id: 'sk-3',
              type: 'Skeleton',
              props: {
                className: 'h-4 w-3/4',
              },
            },
          ],
        },
      },
    ],
  },

  // ============================================
  // HTML Components (Selected Common Ones)
  // ============================================
  div: {
    name: 'div',
    category: 'html',
    description: '기본 HTML div 요소입니다. 범용 컨테이너로 사용됩니다.',
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'CSS 클래스',
      },
    ],
    examples: [
      {
        title: '기본 div',
        description: 'className과 함께 사용',
        dsl: `div
  @className: p-4 border rounded
  p: Content inside div`,
        json: {
          id: 'div-1',
          type: 'div',
          props: {
            className: 'p-4 border rounded',
          },
          children: [
            {
              id: 'p-1',
              type: 'p',
              children: ['Content inside div'],
            },
          ],
        },
      },
    ],
  },

  h1: {
    name: 'h1',
    category: 'html',
    description: 'HTML h1 헤딩 요소입니다. 가장 큰 제목에 사용됩니다.',
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'CSS 클래스',
      },
    ],
    examples: [
      {
        title: '메인 헤딩',
        description: '페이지 제목',
        dsl: `h1: Welcome to Our Site
  @className: text-4xl font-bold`,
        json: {
          id: 'h1-1',
          type: 'h1',
          props: {
            className: 'text-4xl font-bold',
          },
          children: ['Welcome to Our Site'],
        },
      },
    ],
  },

  p: {
    name: 'p',
    category: 'html',
    description: 'HTML p 단락 요소입니다. 텍스트 단락에 사용됩니다.',
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'CSS 클래스',
      },
    ],
    examples: [
      {
        title: '단락',
        description: '기본 텍스트 단락',
        dsl: `p: This is a paragraph of text
  @className: text-gray-600`,
        json: {
          id: 'p-1',
          type: 'p',
          props: {
            className: 'text-gray-600',
          },
          children: ['This is a paragraph of text'],
        },
      },
    ],
  },

  a: {
    name: 'a',
    category: 'html',
    description: 'HTML 앵커 요소입니다. 링크를 만들 때 사용됩니다.',
    props: [
      {
        name: 'href',
        type: 'string',
        description: '링크 URL',
        required: true,
      },
      {
        name: 'target',
        type: 'string',
        description: '링크 타겟 (_blank, _self 등)',
      },
    ],
    examples: [
      {
        title: '외부 링크',
        description: '새 탭으로 여는 링크',
        dsl: `a: Visit Google
  @href: https://google.com
  @target: _blank
  @className: text-blue-600 hover:underline`,
        json: {
          id: 'a-1',
          type: 'a',
          props: {
            href: 'https://google.com',
            target: '_blank',
            className: 'text-blue-600 hover:underline',
          },
          children: ['Visit Google'],
        },
      },
    ],
  },

  img: {
    name: 'img',
    category: 'html',
    description: 'HTML 이미지 요소입니다.',
    props: [
      {
        name: 'src',
        type: 'string',
        description: '이미지 URL',
        required: true,
      },
      {
        name: 'alt',
        type: 'string',
        description: '대체 텍스트',
      },
    ],
    examples: [
      {
        title: '이미지',
        description: '기본 이미지',
        dsl: `img
  @src: /image.jpg
  @alt: Description
  @className: w-full rounded-lg`,
        json: {
          id: 'img-1',
          type: 'img',
          props: {
            src: '/image.jpg',
            alt: 'Description',
            className: 'w-full rounded-lg',
          },
        },
      },
    ],
  },
};

// 카테고리별로 컴포넌트 가져오기
export function getComponentsByCategory(category: 'container' | 'primitive' | 'html') {
  return Object.entries(componentMetadata)
    .filter(([_, meta]) => meta.category === category)
    .map(([key, meta]) => ({ key, ...meta }));
}

// 모든 컴포넌트 이름 가져오기
export function getAllComponentNames() {
  return Object.keys(componentMetadata);
}

// 검색 기능
export function searchComponents(query: string) {
  const lowerQuery = query.toLowerCase();
  return Object.entries(componentMetadata)
    .filter(
      ([key, meta]) =>
        key.toLowerCase().includes(lowerQuery) ||
        meta.description.toLowerCase().includes(lowerQuery)
    )
    .map(([key, meta]) => ({ key, ...meta }));
}
