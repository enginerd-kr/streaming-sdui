import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8 overflow-x-hidden">
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Server-Driven UI
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground px-4">
            스트리밍 기반 서버드리븐 UI를 80% 토큰 절감으로
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 overflow-x-hidden">
          <Card>
            <CardHeader>
              <CardTitle>🚀 실시간 스트리밍</CardTitle>
              <CardDescription>
                LLM이 생성하는 UI를 실시간으로 렌더링
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                JSON을 스트리밍으로 받아 부드럽게 UI를 구축합니다.
                ChatGPT처럼 UI가 점진적으로 나타납니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 커스텀 컴포넌트</CardTitle>
              <CardDescription>
                자신만의 디자인 시스템 사용 가능
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Material-UI, Ant Design 등 원하는 디자인 시스템을
                자유롭게 등록하고 DSL/스트리밍과 함께 사용하세요.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>✨ DSL</CardTitle>
              <CardDescription>
                80% 토큰 절감
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                간결한 문법으로 LLM이 훨씬 적은 토큰으로
                UI를 생성할 수 있어 비용과 속도 면에서 유리합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📡 다양한 전송 프로토콜</CardTitle>
              <CardDescription>
                JSONL, SSE, Streaming JSON 지원
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                여러 스트리밍 프로토콜을 지원하여 다양한 환경에서
                유연하게 UI를 전송할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>✨ 커스텀 DSL vs JSON - 토큰 사용량 비교</CardTitle>
              <CardDescription>
                동일한 UI를 표현하는데 80% 적은 토큰으로 비용과 속도를 절감
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-hidden">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {/* DSL */}
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs md:text-sm font-semibold text-green-600">DSL 형식 ✓</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">~50 토큰</span>
                  </div>
                  <div className="bg-muted p-2 md:p-3 rounded-md text-xs font-mono leading-relaxed overflow-x-auto">
                    <div className="text-blue-600 whitespace-nowrap">Card#card-1</div>
                    <div className="ml-3 text-purple-600 whitespace-nowrap">@className: w-full</div>
                    <div className="ml-3 text-blue-600 whitespace-nowrap">CardHeader#header-1</div>
                    <div className="ml-6 text-blue-600 whitespace-nowrap">CardTitle#title-1: Dashboard</div>
                    <div className="ml-6 text-blue-600 whitespace-nowrap">CardDescription#desc-1:</div>
                    <div className="ml-9 text-muted-foreground whitespace-nowrap">&quot;View metrics&quot;</div>
                    <div className="ml-3 text-blue-600 whitespace-nowrap">CardContent#content-1</div>
                    <div className="ml-6 text-muted-foreground whitespace-nowrap">&quot;Total: 1,234&quot;</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    • 간결한 문법<br/>
                    • LLM이 이해하기 쉬움<br/>
                    • 토큰 80% 절감
                  </p>
                </div>

                {/* JSON */}
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs md:text-sm font-semibold text-orange-600">JSON 형식</h3>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">~250 토큰</span>
                  </div>
                  <div className="bg-muted p-2 md:p-3 rounded-md text-xs font-mono leading-relaxed overflow-x-auto">
                    <div className="text-purple-600 whitespace-nowrap">{`{`}</div>
                    <div className="ml-3 text-green-600 whitespace-nowrap">&quot;id&quot;: &quot;card-1&quot;,</div>
                    <div className="ml-3 text-green-600 whitespace-nowrap">&quot;type&quot;: &quot;Card&quot;,</div>
                    <div className="ml-3 text-green-600 whitespace-nowrap">&quot;props&quot;: {`{`}</div>
                    <div className="ml-6 text-green-600 whitespace-nowrap">&quot;className&quot;: &quot;w-full&quot;</div>
                    <div className="ml-3 text-green-600 whitespace-nowrap">{`}`},</div>
                    <div className="ml-3 text-green-600 whitespace-nowrap">&quot;children&quot;: [</div>
                    <div className="ml-6 text-blue-600 whitespace-nowrap">{`{ "id": "header-1", ... }`},</div>
                    <div className="ml-6 text-blue-600 whitespace-nowrap">{`{ "id": "content-1", ... }`}</div>
                    <div className="ml-3 text-green-600 whitespace-nowrap">]</div>
                    <div className="text-purple-600 whitespace-nowrap">{`}`}</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    • 표준 형식<br/>
                    • 도구 호환성 우수<br/>
                    • 디버깅 용이
                  </p>
                </div>
              </div>
              <div className="mt-3 md:mt-4 p-2 md:p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-xs md:text-sm text-blue-900 dark:text-blue-100">
                  💡 <strong>두 형식 모두 지원:</strong> DSL로 비용 절감 + JSON으로 표준 호환성 확보
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>🎨 커스텀 컴포넌트 등록</CardTitle>
              <CardDescription>
                자신만의 디자인 시스템을 SDUI와 함께 사용하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-hidden">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  DSL과 스트리밍은 그대로 사용하면서, Material-UI, Ant Design 등 원하는 컴포넌트만 등록할 수 있습니다.
                </p>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-3 min-w-0">
                    <h3 className="text-base font-semibold text-blue-600">방법 1: extendRegistry</h3>
                    <div className="bg-muted p-3 md:p-4 rounded-md text-sm font-mono leading-relaxed overflow-x-auto">
                      <div className="text-purple-600">extendRegistry({`{`}</div>
                      <div className="ml-4 text-green-600">MyButton,</div>
                      <div className="ml-4 text-green-600">MyCard,</div>
                      <div className="text-purple-600">{`})`}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      기본 컴포넌트에 커스텀 컴포넌트 추가
                    </p>
                  </div>

                  <div className="space-y-3 min-w-0">
                    <h3 className="text-base font-semibold text-purple-600">방법 2: createComponentRegistry</h3>
                    <div className="bg-muted p-3 md:p-4 rounded-md text-sm font-mono leading-relaxed overflow-x-auto">
                      <div className="text-purple-600">createComponentRegistry({`{`}</div>
                      <div className="ml-4 text-green-600">Button: MyBtn,</div>
                      <div className="ml-4 text-green-600">Card: MyCard,</div>
                      <div className="text-purple-600">{`})`}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      완전히 새로운 레지스트리 생성
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-muted p-3 md:p-4 rounded-md overflow-x-auto">
                    <pre className="text-xs md:text-sm">
                      <code className="block text-muted-foreground whitespace-pre">{`import { extendRegistry } from '@sdui/react';
import { Button, Card } from './my-design-system';

const registry = extendRegistry({ Button, Card });

<StreamingUIRenderer
  node={uiTree}
  context={{ registry }}
/>`}</code>
                    </pre>
                  </div>

                  <div className="bg-muted p-3 md:p-4 rounded-md overflow-x-auto">
                    <pre className="text-xs md:text-sm">
                      <code className="block text-muted-foreground whitespace-pre">{`import {
  createComponentRegistry,
  containerComponents,  // Screen, AppBar, VStack 등
  htmlComponents        // div, span, p 등
} from '@sdui/react';

const registry = createComponentRegistry({
  ...containerComponents,  // Container 컴포넌트 전체
  ...htmlComponents,       // HTML 요소 전체
  Button: MyButton,        // 커스텀 컴포넌트
});

<StreamingUIRenderer
  node={uiTree}
  context={{ registry }}
/>`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <Link href="/demo">
            <Button size="default" className="text-sm md:text-base lg:text-lg bg-gradient-to-r from-blue-600 to-purple-600 md:px-6 lg:px-8">
              스트리밍 데모
            </Button>
          </Link>
          <Link href="/components">
            <Button size="default" variant="default" className="text-sm md:text-base lg:text-lg md:px-6 lg:px-8">
              컴포넌트 문서
            </Button>
          </Link>
          <Link href="/demo/container-example">
            <Button size="default" variant="outline" className="text-sm md:text-base lg:text-lg md:px-6 lg:px-8">
              Container 예제
            </Button>
          </Link>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="default" variant="outline" className="text-sm md:text-base lg:text-lg md:px-6 lg:px-8">
              shadcn/ui 문서
            </Button>
          </a>
        </div>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>빠른 시작</CardTitle>
            <CardDescription>
              DSL 포맷으로 80% 토큰 절감! 🚀
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto max-w-full">
            <pre className="bg-background p-3 md:p-4 rounded-md text-xs md:text-sm">
              <code className="block whitespace-pre">{`import { useStreamingUI } from '@sdui/core';
import { StreamingUIRenderer } from '@sdui/react';

function App() {
  const { uiTree, start } = useStreamingUI({
    format: 'dsl', // JSON 대비 80% 토큰 절감!
  });

  return (
    <>
      <button onClick={() => start('/api/generate-ui', {
        prompt: 'Create a dashboard'
      })}>
        Generate UI
      </button>
      <StreamingUIRenderer node={uiTree} />
    </>
  );
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
