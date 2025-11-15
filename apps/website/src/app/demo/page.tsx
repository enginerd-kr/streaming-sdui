'use client';

import { useState } from 'react';
import { useStreamingUI } from '@sdui/core';
import { StreamingUIRenderer } from '@sdui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import type { UINode } from '@sdui/core';

// 데이터 포맷 (무엇을)
type DataFormat = 'json' | 'dsl';

// 전송 방식 (어떻게) - ParserFormat과 호환
type TransportType = 'jsonl' | 'sse' | 'json';

// 모드
type RenderMode = 'streaming' | 'normal';

export default function DemoPage() {
  const [prompt, setPrompt] = useState('');
  const [dataFormat, setDataFormat] = useState<DataFormat>('dsl');
  const [transportType, setTransportType] = useState<TransportType>('jsonl');
  const [renderMode, setRenderMode] = useState<RenderMode>('streaming');
  const [staticUITree, setStaticUITree] = useState<any>(null);
  const [isLoadingStatic, setIsLoadingStatic] = useState(false);
  const [staticError, setStaticError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('dashboard');

  // 실제 파서 포맷 결정
  // 데모 API는 항상 JSON StreamAction을 반환
  // 데이터 포맷과 관계없이 전송 프로토콜 사용
  const actualFormat = transportType;

  const { uiTree, isStreaming, error, start, reset } = useStreamingUI({
    format: actualFormat,
    onStart: () => console.log('Streaming started'),
    onComplete: () => console.log('Streaming completed'),
    onError: (err) => console.error('Streaming error:', err),
  });

  // Action handler for interactive components
  const handleAction = async (actionType: string, payload?: Record<string, any>) => {
    console.log('Action executed:', { actionType, payload });

    // Show alert for demonstration
    if (payload?.message) {
      alert(payload.message);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    if (renderMode === 'streaming') {
      // 스트리밍 모드
      setStaticUITree(null);
      setStaticError(null);
      await start('/api/generate-ui', {
        prompt,
        format: dataFormat,
        transport: transportType
      });
    } else {
      // 일반 모드 (한 번에)
      setIsLoadingStatic(true);
      setStaticError(null);
      reset(); // 스트리밍 상태 초기화

      try {
        const response = await fetch('/api/generate-ui-static', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            format: dataFormat
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate UI');
        }

        const data = await response.json();
        setStaticUITree(data.uiTree);
      } catch (err) {
        setStaticError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoadingStatic(false);
      }
    }
  };

  const handleReset = () => {
    reset();
    setStaticUITree(null);
    setStaticError(null);
  };

  // UINode를 DSL 문자열로 변환
  const convertToDSL = (node: UINode, indent = 0): string => {
    const spaces = '  '.repeat(indent);
    let result = '';

    // 컴포넌트 타입
    result += `${spaces}${node.type}`;

    // 인라인 텍스트가 있는 경우 (children이 단일 문자열)
    if (node.children?.length === 1 && typeof node.children[0] === 'string') {
      result += `: ${node.children[0]}\n`;

      // id 추가
      if (node.id) {
        result += `${spaces}  @id: ${node.id}\n`;
      }

      // props 추가
      if (node.props) {
        for (const [key, value] of Object.entries(node.props)) {
          result += `${spaces}  @${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}\n`;
        }
      }
      return result;
    }

    result += '\n';

    // ID 추가
    if (node.id) {
      result += `${spaces}  @id: ${node.id}\n`;
    }

    // Props 추가
    if (node.props) {
      for (const [key, value] of Object.entries(node.props)) {
        result += `${spaces}  @${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}\n`;
      }
    }

    // Actions 추가 (간소화)
    if (node.actions) {
      for (const [eventName, action] of Object.entries(node.actions)) {
        const actionType = typeof action === 'object' && action !== null && 'type' in action ? action.type : 'action';
        result += `${spaces}  @${eventName}: ${actionType}\n`;
      }
    }

    // Children 추가
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
  };

  const presetPrompts = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      value: 'Create a dashboard with statistics cards',
      schema: {
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
      },
    },
    {
      id: 'form',
      label: 'Form',
      value: 'Create a user registration form',
      schema: {
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
      },
    },
    {
      id: 'cards',
      label: 'Cards',
      value: 'Create a product card grid',
      schema: {
        id: 'product-grid',
        type: 'div',
        props: { className: 'grid grid-cols-3 gap-4' },
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
                props: { className: 'flex justify-between items-center' },
                children: [
                  { id: 'product-price-1', type: 'span', props: { className: 'text-2xl font-bold' }, children: ['$99'] },
                  { id: 'product-btn-1', type: 'Button', children: ['Add to Cart'] },
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
                props: { className: 'flex justify-between items-center' },
                children: [
                  { id: 'product-price-2', type: 'span', props: { className: 'text-2xl font-bold' }, children: ['$149'] },
                  { id: 'product-btn-2', type: 'Button', children: ['Add to Cart'] },
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
                props: { className: 'flex justify-between items-center' },
                children: [
                  { id: 'product-price-3', type: 'span', props: { className: 'text-2xl font-bold' }, children: ['$199'] },
                  { id: 'product-btn-3', type: 'Button', children: ['Add to Cart'] },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'nested',
      label: 'Nested',
      value: 'Create a nested multi-level UI structure',
      schema: {
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
                    props: { className: 'grid w-full grid-cols-3' },
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
      },
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Server-Driven UI Demo</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              ← Home
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/demo/container-example'}>
              Container Examples
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          shadcn/ui 컴포넌트를 활용한 스트리밍 서버드리븐 UI 라이브러리
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 입력 영역 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>UI 생성</CardTitle>
              <CardDescription>
                프롬프트를 입력하여 동적으로 UI를 생성하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="원하는 UI를 설명하세요... (예: Create a dashboard)"
                  disabled={isStreaming}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleGenerate}
                  disabled={isStreaming || isLoadingStatic || !prompt.trim()}
                  className="flex-1"
                >
                  {isStreaming || isLoadingStatic ? 'UI 생성 중...' : 'UI 생성'}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={!uiTree && !staticUITree && !isStreaming && !isLoadingStatic}
                >
                  초기화
                </Button>
              </div>

              {/* 프리셋 버튼 */}
              <div className="space-y-2">
                <p className="text-sm font-medium">프리셋:</p>
                <div className="flex flex-wrap gap-2">
                  {presetPrompts.map((preset) => (
                    <Button
                      key={preset.label}
                      onClick={() => {
                        setPrompt(preset.value);
                        setSelectedPreset(preset.id);
                      }}
                      variant="secondary"
                      size="sm"
                      disabled={isStreaming}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 에러 표시 */}
              {(error || staticError) && (
                <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error?.message || staticError}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 설정 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>설정</CardTitle>
              <CardDescription>
                렌더링 모드와 스트리밍 포맷을 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1. 데이터 포맷 선택 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">1. 데이터 포맷</Label>
                <RadioGroup value={dataFormat} onValueChange={(v) => setDataFormat(v as DataFormat)} disabled={isStreaming || isLoadingStatic}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dsl" id="format-dsl" />
                    <Label htmlFor="format-dsl" className="font-normal cursor-pointer">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          🆕 DSL
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">80% 절감</span>
                        </div>
                        <div className="text-xs text-muted-foreground">간결한 LLM 친화적 문법</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="json" id="format-json" />
                    <Label htmlFor="format-json" className="font-normal cursor-pointer">
                      <div>
                        <div className="font-medium">JSON</div>
                        <div className="text-xs text-muted-foreground">전통적인 JSON 형식</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 2. 전송 모드 선택 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">2. 전송 모드</Label>
                <RadioGroup value={renderMode} onValueChange={(v) => setRenderMode(v as RenderMode)} disabled={isStreaming || isLoadingStatic}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="streaming" id="mode-streaming" />
                    <Label htmlFor="mode-streaming" className="font-normal cursor-pointer">
                      <div>
                        <div className="font-medium">스트리밍</div>
                        <div className="text-xs text-muted-foreground">UI를 점진적으로 생성 (ChatGPT 스타일)</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="mode-normal" />
                    <Label htmlFor="mode-normal" className="font-normal cursor-pointer">
                      <div>
                        <div className="font-medium">일반</div>
                        <div className="text-xs text-muted-foreground">완성된 UI를 한 번에 표시</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 3. 전송 방식 선택 (스트리밍 모드일 때만) */}
              {renderMode === 'streaming' && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">3. 전송 프로토콜 (스트리밍)</Label>
                  <RadioGroup value={transportType} onValueChange={(v) => setTransportType(v as TransportType)} disabled={isStreaming}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="jsonl" id="transport-jsonl" />
                      <Label htmlFor="transport-jsonl" className="font-normal cursor-pointer">
                        <div>
                          <div className="font-medium">JSONL (추천)</div>
                          <div className="text-xs text-muted-foreground">JSON Lines - 한 줄씩 파싱</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sse" id="transport-sse" />
                      <Label htmlFor="transport-sse" className="font-normal cursor-pointer">
                        <div>
                          <div className="font-medium">SSE</div>
                          <div className="text-xs text-muted-foreground">Server-Sent Events</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="json" id="transport-json" />
                      <Label htmlFor="transport-json" className="font-normal cursor-pointer">
                        <div>
                          <div className="font-medium">Streaming JSON</div>
                          <div className="text-xs text-muted-foreground">부분 JSON 파싱</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 미리보기 영역 */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>미리보기</CardTitle>
              <CardDescription>
                생성된 UI가 여기에 표시됩니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uiTree && !staticUITree && !isStreaming && !isLoadingStatic && (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  프롬프트를 입력하고 &quot;UI 생성&quot; 버튼을 클릭하세요
                </div>
              )}

              {(isStreaming || isLoadingStatic) && !uiTree && !staticUITree && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {isLoadingStatic ? '완성된 UI 생성 중...' : 'UI 생성 중...'}
                    </p>
                  </div>
                </div>
              )}

              <div className="min-h-64">
                <StreamingUIRenderer
                  node={renderMode === 'streaming' ? uiTree : staticUITree}
                  context={{ executeAction: handleAction }}
                />
              </div>

              {isStreaming && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="animate-pulse">●</div>
                  <span>스트리밍 중...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 예제 코드 */}
      <div className="mt-8">
        <Tabs defaultValue="usage">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">사용법</TabsTrigger>
            <TabsTrigger value="schema">스키마</TabsTrigger>
            <TabsTrigger value="features">기능</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>기본 사용법</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`import { useStreamingUI } from '@sdui/core';
import { StreamingUIRenderer } from '@sdui/react';

function MyComponent() {
  const { uiTree, isStreaming, start } = useStreamingUI();

  const handleGenerate = () => {
    start('/api/generate-ui', { prompt: 'Create a dashboard' });
  };

  return (
    <div>
      <button onClick={handleGenerate}>Generate UI</button>
      <StreamingUIRenderer node={uiTree} />
    </div>
  );
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {presetPrompts.find(p => p.id === selectedPreset)?.label} 예제{' '}
                  {dataFormat === 'dsl' ? 'DSL' : 'JSON'} 스키마
                </CardTitle>
                <CardDescription>
                  선택한 프리셋의 {dataFormat === 'dsl' ? 'DSL' : 'JSON'} 형식
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>
                    {dataFormat === 'dsl'
                      ? convertToDSL(presetPrompts.find(p => p.id === selectedPreset)?.schema as UINode)
                      : JSON.stringify(
                          presetPrompts.find(p => p.id === selectedPreset)?.schema,
                          null,
                          2
                        )}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>주요 기능</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>✅ 실시간 스트리밍 렌더링</div>
                  <div>✅ shadcn/ui 컴포넌트 지원</div>
                  <div>✅ 부드러운 애니메이션</div>
                  <div>✅ 에러 핸들링</div>
                  <div>✅ TypeScript 타입 안정성</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>지원 형식</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>🆕 DSL (80% 토큰 절감)</div>
                  <div>📦 JSON Lines (JSONL)</div>
                  <div>📦 Server-Sent Events (SSE)</div>
                  <div>📦 Streaming JSON</div>
                  <div>📦 Custom parsers</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
