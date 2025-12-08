import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Server-Driven UI
          </h1>
          <p className="text-xl text-muted-foreground">
            스트리밍 기반 서버드리븐 UI를 80% 토큰 절감으로
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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
              <CardTitle>🎨 shadcn/ui 통합</CardTitle>
              <CardDescription>
                아름다운 컴포넌트를 동적으로 렌더링
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Button, Card, Input 등 shadcn/ui의 모든 컴포넌트를
                서버에서 동적으로 조합할 수 있습니다.
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
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {/* DSL */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-green-600">DSL 형식 ✓</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">~50 토큰</span>
                  </div>
                  <div className="bg-muted p-3 rounded-md text-xs font-mono leading-relaxed">
                    <div className="text-blue-600">Card#card-1</div>
                    <div className="ml-3 text-purple-600">@className: w-full</div>
                    <div className="ml-3 text-blue-600">CardHeader#header-1</div>
                    <div className="ml-6 text-blue-600">CardTitle#title-1: Dashboard</div>
                    <div className="ml-6 text-blue-600">CardDescription#desc-1:</div>
                    <div className="ml-9 text-muted-foreground">&quot;View metrics&quot;</div>
                    <div className="ml-3 text-blue-600">CardContent#content-1</div>
                    <div className="ml-6 text-muted-foreground">&quot;Total: 1,234&quot;</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    • 간결한 문법<br/>
                    • LLM이 이해하기 쉬움<br/>
                    • 토큰 80% 절감
                  </p>
                </div>

                {/* JSON */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-orange-600">JSON 형식</h3>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">~250 토큰</span>
                  </div>
                  <div className="bg-muted p-3 rounded-md text-xs font-mono leading-relaxed">
                    <div className="text-purple-600">{`{`}</div>
                    <div className="ml-3 text-green-600">&quot;id&quot;: &quot;card-1&quot;,</div>
                    <div className="ml-3 text-green-600">&quot;type&quot;: &quot;Card&quot;,</div>
                    <div className="ml-3 text-green-600">&quot;props&quot;: {`{`}</div>
                    <div className="ml-6 text-green-600">&quot;className&quot;: &quot;w-full&quot;</div>
                    <div className="ml-3 text-green-600">{`}`},</div>
                    <div className="ml-3 text-green-600">&quot;children&quot;: [</div>
                    <div className="ml-6 text-blue-600">{`{ "id": "header-1", ... }`},</div>
                    <div className="ml-6 text-blue-600">{`{ "id": "content-1", ... }`}</div>
                    <div className="ml-3 text-green-600">]</div>
                    <div className="text-purple-600">{`}`}</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    • 표준 형식<br/>
                    • 도구 호환성 우수<br/>
                    • 디버깅 용이
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  💡 <strong>두 형식 모두 지원:</strong> DSL로 비용 절감 + JSON으로 표준 호환성 확보
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/demo">
            <Button size="lg" className="text-lg bg-gradient-to-r from-blue-600 to-purple-600">
              스트리밍 데모
            </Button>
          </Link>
          <Link href="/components">
            <Button size="lg" variant="default" className="text-lg">
              컴포넌트 문서
            </Button>
          </Link>
          <Link href="/demo/container-example">
            <Button size="lg" variant="outline" className="text-lg">
              Container 예제
            </Button>
          </Link>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="text-lg">
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
          <CardContent>
            <pre className="bg-background p-4 rounded-md overflow-x-auto text-sm">
              <code>{`import { useStreamingUI } from '@sdui/core';
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
