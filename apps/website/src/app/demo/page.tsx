'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createParser, type UINode, type ParserFormat } from '@sdui/core';
import { mockFetch } from '@/lib/mock-streaming-api';
import { StreamingUIRenderer } from '@sdui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// 데이터 포맷 (무엇을)
type DataFormat = 'json' | 'dsl';

// 전송 방식 (어떻게) - ParserFormat과 호환
type TransportType = 'jsonl' | 'sse' | 'json';

// 모드
type RenderMode = 'streaming' | 'normal';

export default function DemoPage() {
  const [prompt, setPrompt] = useState('Create a dashboard with statistics cards');
  const [dataFormat, setDataFormat] = useState<DataFormat>('dsl');
  const [transportType, setTransportType] = useState<TransportType>('jsonl');
  const [renderMode, setRenderMode] = useState<RenderMode>('streaming');
  const [uiTree, setUITree] = useState<UINode | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('dashboard');
  const [streamingProgress, setStreamingProgress] = useState(0);
  const [renderKey, setRenderKey] = useState(0);

  // Action handler for interactive components
  const handleAction = async (actionType: string, payload?: Record<string, any>) => {
    console.log('Action executed:', { actionType, payload });

    // Show alert for demonstration
    if (payload?.message) {
      alert(payload.message);
    }
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

  // Mock API를 사용한 스트리밍 시뮬레이션
  const start = async (url: string) => {
    setIsStreaming(true);
    setError(null);
    setUITree(null);
    setStreamingProgress(0);

    // 파서 초기화
    const parser = createParser(transportType as ParserFormat);
    parser.reset();

    let chunkCount = 0;
    const estimatedTotalChunks = 15; // Approximate number of chunks

    try {
      // Mock API 호출
      await mockFetch(
        url,
        (chunk) => {
          chunkCount++;
          setStreamingProgress(Math.min((chunkCount / estimatedTotalChunks) * 100, 95));

          // 청크를 파서에 전달
          const parsedActions = parser.append(chunk);

          for (const act of parsedActions) {
            // StreamAction 처리
            if ('action' in act) {
              if (act.action === 'create' && 'component' in act) {
                setUITree(act.component as UINode);
                setRenderKey(prev => prev + 1);
              }
            }
          }
        },
        {
          format: dataFormat,
          transport: transportType as ParserFormat,
          chunkSize: 2,
          delay: 80,
        }
      );
      setStreamingProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setTimeout(() => {
        setIsStreaming(false);
        setStreamingProgress(0);
      }, 300);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // 프리셋 찾기 - selectedPreset을 우선 사용
    let matchedPreset = presetPrompts.find(p => p.id === selectedPreset);

    // selectedPreset이 없으면 프롬프트 텍스트로 매칭
    if (!matchedPreset) {
      matchedPreset = presetPrompts.find(p =>
        prompt.toLowerCase().includes(p.id) ||
        prompt.toLowerCase().includes(p.label.toLowerCase()) ||
        p.value.toLowerCase().includes(prompt.toLowerCase().split(' ').slice(0, 2).join(' '))
      );
    }

    if (!matchedPreset) {
      setError('No matching preset found. Please use one of the preset buttons.');
      return;
    }

    // API URL 생성
    const apiUrl = `/api/generate-ui/${matchedPreset.id}`;

    if (renderMode === 'streaming') {
      // 스트리밍 모드 (Mock API 사용)
      await start(apiUrl);
    } else {
      // 일반 모드 (한 번에)
      setIsStreaming(true);
      setError(null);
      setUITree(null); // Reset first

      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        setUITree(matchedPreset.schema as UINode);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsStreaming(false);
      }
    }
  };

  const handleReset = () => {
    setUITree(null);
    setError(null);
    setStreamingProgress(0);
    setRenderKey(0);
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
      label: 'Product Grid',
      value: 'Create a product card grid',
      schema: {
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
      },
    },
    {
      id: 'nested',
      label: 'Nested Tabs',
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
      },
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Server-Driven UI 데모</h1>
            <div className="flex flex-wrap gap-2">
              <Link href="/">
                <Button variant="outline" size="sm" className="text-xs md:text-sm">
                  ← 홈
                </Button>
              </Link>
              <Link href="/demo/container-example">
                <Button variant="outline" size="sm" className="text-xs md:text-sm whitespace-nowrap">
                  Container 예제
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            스트리밍을 지원하는 동적 UI 렌더링 데모
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
        {/* 입력 영역 */}
        <div className="space-y-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle>UI 생성기</CardTitle>
              <CardDescription>
                프리셋을 선택하거나 설명을 입력하여 UI를 생성하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="설명을 입력하거나 프리셋을 선택하세요..."
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
                  disabled={isStreaming || !prompt.trim()}
                  className="flex-1"
                >
                  {isStreaming ? 'UI 생성 중...' : 'UI 생성'}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={!uiTree && !isStreaming}
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
                      variant={selectedPreset === preset.id ? "default" : "secondary"}
                      size="sm"
                      disabled={isStreaming}
                      className="text-xs md:text-sm whitespace-nowrap"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 에러 표시 */}
              {error && (
                <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
                  <p className="font-semibold">오류</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

        {/* 미리보기 영역 */}
        <Card className="w-full">
            <CardHeader>
              <CardTitle>미리보기</CardTitle>
              <CardDescription>
                생성된 UI가 여기에 표시됩니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uiTree && !isStreaming && (
                <div className="flex items-center justify-center h-32 md:h-48 text-muted-foreground text-sm md:text-base text-center px-4">
                  프리셋을 선택하고 &quot;UI 생성&quot;을 클릭하여 시작하세요
                </div>
              )}

              {isStreaming && !uiTree && (
                <div className="flex items-center justify-center h-32 md:h-48">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary mx-auto mb-3 md:mb-4"></div>
                    <p className="text-muted-foreground text-sm md:text-base">UI 생성 중...</p>
                  </div>
                </div>
              )}

              <div className={uiTree ? "min-h-32" : ""}>
                <StreamingUIRenderer
                  key={renderKey}
                  node={uiTree}
                  context={{ executeAction: handleAction }}
                />
              </div>

              {isStreaming && (
                <div className="mt-4 space-y-2">
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300 ease-out"
                      style={{ width: `${streamingProgress}%` }}
                    />
                  </div>
                  {/* Status text */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="animate-pulse">●</div>
                    <span>
                      {renderMode === 'streaming'
                        ? `UI 스트리밍 중... ${Math.round(streamingProgress)}%`
                        : 'UI 생성 중...'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
        </Card>

          {/* 설정 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>설정</CardTitle>
              <CardDescription>
                렌더링 모드 및 스트리밍 형식 설정
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1. 데이터 포맷 선택 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">1. 데이터 형식</Label>
                <RadioGroup value={dataFormat} onValueChange={(v) => setDataFormat(v as DataFormat)} disabled={isStreaming}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dsl" id="format-dsl" />
                    <Label htmlFor="format-dsl" className="font-normal cursor-pointer">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          🆕 DSL
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">80% 절감</span>
                        </div>
                        <div className="text-xs text-muted-foreground">간결한 LLM 친화적 구문</div>
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
                <Label className="text-sm font-medium">2. 렌더링 모드</Label>
                <RadioGroup value={renderMode} onValueChange={(v) => setRenderMode(v as RenderMode)} disabled={isStreaming}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="streaming" id="mode-streaming" />
                    <Label htmlFor="mode-streaming" className="font-normal cursor-pointer">
                      <div>
                        <div className="font-medium">스트리밍</div>
                        <div className="text-xs text-muted-foreground">점진적 UI 생성 (ChatGPT 스타일)</div>
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
                  <Label className="text-sm font-medium">3. 전송 프로토콜</Label>
                  <RadioGroup value={transportType} onValueChange={(v) => setTransportType(v as TransportType)} disabled={isStreaming}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="jsonl" id="transport-jsonl" />
                      <Label htmlFor="transport-jsonl" className="font-normal cursor-pointer">
                        <div>
                          <div className="font-medium">JSONL (권장)</div>
                          <div className="text-xs text-muted-foreground">JSON Lines - 줄 단위로 파싱</div>
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

        {/* 예제 코드 */}
        <div className="mt-8 space-y-4 w-full">
        {/* Usage Section */}
        <Card>
          <CardHeader>
            <CardTitle>기본 사용법</CardTitle>
            <CardDescription>
              애플리케이션에서 스트리밍 UI 렌더러를 사용하는 방법
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-3 md:p-4 rounded-md overflow-x-auto text-[10px] sm:text-xs md:text-sm w-full">
              <code className="block whitespace-pre-wrap break-all md:whitespace-pre md:break-normal">{`import { useStreamingUI } from '@sdui/core';
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

        {/* Schema Examples */}
        <Tabs defaultValue="dsl">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="dsl" className="text-xs md:text-sm">DSL 스키마</TabsTrigger>
            <TabsTrigger value="json" className="text-xs md:text-sm">JSON 스키마</TabsTrigger>
          </TabsList>

          <TabsContent value="dsl" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {presetPrompts.find(p => p.id === selectedPreset)?.label} 예제 - DSL
                </CardTitle>
                <CardDescription>
                  간결한 LLM 친화적 구문 (80% 절감)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-3 md:p-4 rounded-md overflow-x-auto text-[10px] sm:text-xs md:text-sm max-h-96 overflow-y-auto w-full">
                  <code className="block whitespace-pre">
                    {convertToDSL(presetPrompts.find(p => p.id === selectedPreset)?.schema as UINode)}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="json" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {presetPrompts.find(p => p.id === selectedPreset)?.label} 예제 - JSON
                </CardTitle>
                <CardDescription>
                  전통적인 JSON 형식
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-3 md:p-4 rounded-md overflow-x-auto text-[10px] sm:text-xs md:text-sm max-h-96 overflow-y-auto w-full">
                  <code className="block whitespace-pre">
                    {JSON.stringify(
                      presetPrompts.find(p => p.id === selectedPreset)?.schema,
                      null,
                      2
                    )}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
        </div>
      </div>
    </div>
  );
}
