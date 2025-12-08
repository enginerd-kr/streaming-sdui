/**
 * Mock Streaming API for GitHub Pages Demo
 * Simulates server-side streaming without requiring actual API routes
 */

import { type UINode, type ParserFormat } from '@sdui/core';

export interface MockStreamOptions {
  format: 'json' | 'dsl';
  transport: ParserFormat;
  chunkSize?: number;
  delay?: number;
}

export interface MockAPIRoute {
  pattern: RegExp;
  handler: () => UINode;
}

/**
 * Mock API Routes
 * Maps URL patterns to UI schemas
 */
export const mockAPIRoutes: MockAPIRoute[] = [
  {
    pattern: /\/api\/generate-ui\/dashboard/,
    handler: () => ({
      id: 'stat-card-0',
      type: 'Card',
      props: { className: 'mb-4' },
      children: [
        {
          id: 'stat-card-header-0',
          type: 'CardHeader',
          children: [
            {
              id: 'stat-card-title-0',
              type: 'CardTitle',
              props: { className: 'text-sm font-medium' },
              children: ['Total Revenue'],
            },
          ],
        },
        {
          id: 'stat-card-content-0',
          type: 'CardContent',
          children: [
            {
              id: 'stat-value-0',
              type: 'div',
              props: { className: 'text-2xl font-bold' },
              children: ['$45,231'],
            },
            {
              id: 'stat-change-0',
              type: 'p',
              props: { className: 'text-xs text-muted-foreground' },
              children: ['+20.1% from last month'],
            },
          ],
        },
      ],
    }),
  },
  {
    pattern: /\/api\/generate-ui\/form/,
    handler: () => ({
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
    }),
  },
  {
    pattern: /\/api\/generate-ui\/cards/,
    handler: () => ({
      id: 'product-grid',
      type: 'div',
      props: { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' },
      children: [
        {
          id: 'product-card-1',
          type: 'Card',
          children: [
            {
              id: 'product-header-1',
              type: 'CardHeader',
              children: [
                { id: 'product-title-1', type: 'CardTitle', children: ['Product 1'] },
                { id: 'product-desc-1', type: 'CardDescription', children: ['Premium quality product'] },
              ],
            },
            {
              id: 'product-footer-1',
              type: 'CardFooter',
              props: { className: 'flex flex-col gap-3' },
              children: [
                { id: 'product-price-1', type: 'span', props: { className: 'text-2xl font-bold' }, children: ['$99'] },
                { id: 'product-btn-1', type: 'Button', props: { className: 'w-full' }, children: ['Add to Cart'] },
              ],
            },
          ],
        },
        {
          id: 'product-card-2',
          type: 'Card',
          children: [
            {
              id: 'product-header-2',
              type: 'CardHeader',
              children: [
                { id: 'product-title-2', type: 'CardTitle', children: ['Product 2'] },
                { id: 'product-desc-2', type: 'CardDescription', children: ['Best seller item'] },
              ],
            },
            {
              id: 'product-footer-2',
              type: 'CardFooter',
              props: { className: 'flex flex-col gap-3' },
              children: [
                { id: 'product-price-2', type: 'span', props: { className: 'text-2xl font-bold' }, children: ['$149'] },
                { id: 'product-btn-2', type: 'Button', props: { className: 'w-full' }, children: ['Add to Cart'] },
              ],
            },
          ],
        },
        {
          id: 'product-card-3',
          type: 'Card',
          children: [
            {
              id: 'product-header-3',
              type: 'CardHeader',
              children: [
                { id: 'product-title-3', type: 'CardTitle', children: ['Product 3'] },
                { id: 'product-desc-3', type: 'CardDescription', children: ['Limited edition'] },
              ],
            },
            {
              id: 'product-footer-3',
              type: 'CardFooter',
              props: { className: 'flex flex-col gap-3' },
              children: [
                { id: 'product-price-3', type: 'span', props: { className: 'text-2xl font-bold' }, children: ['$199'] },
                { id: 'product-btn-3', type: 'Button', props: { className: 'w-full' }, children: ['Add to Cart'] },
              ],
            },
          ],
        },
      ],
    }),
  },
  {
    pattern: /\/api\/generate-ui\/nested/,
    handler: () => ({
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
                  props: { className: 'grid w-full grid-cols-2' },
                  children: [
                    { id: 'tab-trigger-1', type: 'TabsTrigger', props: { value: 'overview' }, children: ['Overview'] },
                    { id: 'tab-trigger-2', type: 'TabsTrigger', props: { value: 'analytics' }, children: ['Analytics'] },
                  ],
                },
                {
                  id: 'tab-content-overview',
                  type: 'TabsContent',
                  props: { value: 'overview', className: 'space-y-4' },
                  children: [
                    {
                      id: 'overview-card-0',
                      type: 'Card',
                      children: [
                        {
                          id: 'overview-card-header-0',
                          type: 'CardHeader',
                          children: [
                            {
                              id: 'overview-card-title-0',
                              type: 'CardTitle',
                              props: { className: 'text-lg' },
                              children: ['Total Users'],
                            },
                            {
                              id: 'overview-card-desc-0',
                              type: 'CardDescription',
                              children: ['Active users in the system'],
                            },
                          ],
                        },
                        {
                          id: 'overview-card-content-0',
                          type: 'CardContent',
                          children: [
                            {
                              id: 'overview-stat-0',
                              type: 'div',
                              props: { className: 'text-3xl font-bold' },
                              children: ['10,482'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'tab-content-analytics',
                  type: 'TabsContent',
                  props: { value: 'analytics' },
                  children: [
                    {
                      id: 'analytics-card',
                      type: 'Card',
                      children: [
                        {
                          id: 'analytics-header',
                          type: 'CardHeader',
                          children: [
                            { id: 'analytics-title', type: 'CardTitle', children: ['Page Views'] },
                          ],
                        },
                        {
                          id: 'analytics-content',
                          type: 'CardContent',
                          children: [
                            {
                              id: 'analytics-stat',
                              type: 'div',
                              props: { className: 'text-3xl font-bold' },
                              children: ['1,234,567'],
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
        },
      ],
    }),
  },
  {
    // Default fallback
    pattern: /\/api\/generate-ui/,
    handler: () => ({
      id: 'default-card',
      type: 'Card',
      children: [
        {
          id: 'default-header',
          type: 'CardHeader',
          children: [
            { id: 'default-title', type: 'CardTitle', children: ['Welcome'] },
            { id: 'default-desc', type: 'CardDescription', children: ['Demo UI generated successfully'] },
          ],
        },
        {
          id: 'default-content',
          type: 'CardContent',
          children: [
            { id: 'default-text', type: 'p', children: ['This is a dynamically generated UI component.'] },
          ],
        },
      ],
    }),
  },
];

/**
 * Convert UINode to DSL string
 */
function convertToDSL(node: UINode, indent = 0): string {
  const spaces = '  '.repeat(indent);
  let result = '';

  // Component type
  result += `${spaces}${node.type}`;

  // Inline text (children is single string)
  if (node.children?.length === 1 && typeof node.children[0] === 'string') {
    result += `: ${node.children[0]}\n`;

    // Add id
    if (node.id) {
      result += `${spaces}  @id: ${node.id}\n`;
    }

    // Add props
    if (node.props) {
      for (const [key, value] of Object.entries(node.props)) {
        result += `${spaces}  @${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}\n`;
      }
    }
    return result;
  }

  result += '\n';

  // Add ID
  if (node.id) {
    result += `${spaces}  @id: ${node.id}\n`;
  }

  // Add props
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      result += `${spaces}  @${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}\n`;
    }
  }

  // Add actions
  if (node.actions) {
    for (const [eventName, action] of Object.entries(node.actions)) {
      const actionType = typeof action === 'object' && action !== null && 'type' in action ? action.type : 'action';
      result += `${spaces}  @${eventName}: ${actionType}\n`;
    }
  }

  // Add children
  if (node.children) {
    for (const child of node.children) {
      if (typeof child === 'string') {
        result += `${spaces}  "${child}"\n`;
      } else {
        result += convertToDSL(child, indent + 1);
      }
    }
  }

  return result;
}

/**
 * Mock streaming API response generator
 */
export async function* mockStreamingAPI(
  url: string,
  options: MockStreamOptions
): AsyncGenerator<string, void, unknown> {
  // Find matching route
  const route = mockAPIRoutes.find(r => r.pattern.test(url));

  if (!route) {
    throw new Error(`No mock route found for URL: ${url}`);
  }

  // Get UI schema
  const schema = route.handler();

  // Convert to appropriate format
  const dataString = options.format === 'dsl'
    ? convertToDSL(schema)
    : JSON.stringify(schema, null, 2);

  // Split into lines for progressive streaming
  const lines = dataString.split('\n').filter(line => line.trim());
  const chunkSize = options.chunkSize || Math.max(2, Math.floor(lines.length / 15));
  const delay = options.delay || 80;

  // For realistic streaming demo, we'll progressively build the component tree
  // by adding children incrementally
  const totalChunks = Math.ceil(lines.length / chunkSize);

  // Helper function to create a partial node with limited depth
  function createPartialNode(fullNode: any, depthLimit: number): any {
    if (depthLimit <= 0 || !fullNode || typeof fullNode !== 'object') {
      return fullNode;
    }

    const partial: any = {
      id: fullNode.id,
      type: fullNode.type,
    };

    if (fullNode.props) {
      partial.props = fullNode.props;
    }

    if (fullNode.actions) {
      partial.actions = fullNode.actions;
    }

    if (fullNode.children && depthLimit > 0) {
      const childrenLimit = Math.max(1, Math.floor(fullNode.children.length * depthLimit / totalChunks));
      partial.children = fullNode.children.slice(0, childrenLimit).map((child: any) =>
        typeof child === 'string' ? child : createPartialNode(child, depthLimit - 1)
      );
    }

    return partial;
  }

  for (let i = 1; i <= totalChunks; i++) {
    // Progressively increase the depth/completeness of the tree
    const partialNode = createPartialNode(schema, i);

    // Create StreamAction
    const action = {
      action: 'create' as const,
      component: partialNode
    };

    // Encode based on transport type
    let encoded: string;
    if (options.transport === 'jsonl') {
      encoded = JSON.stringify(action) + '\n';
    } else if (options.transport === 'sse') {
      encoded = `data: ${JSON.stringify(action)}\n\n`;
    } else {
      encoded = JSON.stringify(action);
    }

    yield encoded;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

/**
 * Simple mock fetch that simulates streaming
 */
export async function mockFetch(
  url: string,
  onChunk: (chunk: string) => void,
  options: MockStreamOptions
): Promise<void> {
  try {
    for await (const chunk of mockStreamingAPI(url, options)) {
      onChunk(chunk);
    }
  } catch (error) {
    throw error;
  }
}
