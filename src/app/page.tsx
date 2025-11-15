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
            shadcn/ui 컴포넌트를 활용한 스트리밍 서버드리븐 UI 라이브러리
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

          <Card className="md:col-span-2 border shadow-none">
            <CardHeader>
              <CardTitle>🆕 DSL</CardTitle>
              <CardDescription>
                80% 토큰 절감! LLM 친화적인 간결한 문법
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                간결한 문법으로 UI를 정의합니다.
                LLM이 훨씬 적은 토큰으로 UI를 생성할 수 있어 비용과 속도 면에서 유리합니다.
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                <div className="text-blue-600">Card</div>
                <div className="ml-4 text-purple-600">@className: w-full</div>
                <div className="ml-4 text-blue-600">CardHeader</div>
                <div className="ml-8 text-blue-600">CardTitle: Hello World</div>
                <div className="ml-4 text-blue-600">CardContent</div>
                <div className="ml-8 text-muted-foreground">&quot;Card content here&quot;</div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border shadow-none">
            <CardHeader>
              <CardTitle>📦 JSON 포맷</CardTitle>
              <CardDescription>
                검증된 표준 데이터 형식
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                전통적인 JSON 형식도 완벽하게 지원합니다.
                표준 도구와의 호환성이 뛰어나며, 디버깅과 검증이 용이합니다.
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                <div className="text-purple-600">{`{`}</div>
                <div className="ml-4 text-green-600">&quot;type&quot;: &quot;Card&quot;,</div>
                <div className="ml-4 text-green-600">&quot;props&quot;: {`{`} &quot;className&quot;: &quot;w-full&quot; {`}`},</div>
                <div className="ml-4 text-green-600">&quot;children&quot;: [</div>
                <div className="ml-8 text-blue-600">{`{ "type": "CardHeader", ... }`},</div>
                <div className="ml-8 text-blue-600">{`{ "type": "CardContent", ... }`}</div>
                <div className="ml-4 text-green-600">]</div>
                <div className="text-purple-600">{`}`}</div>
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
              <code>{`import { useStreamingUI } from '@/lib/sdui/hooks/useStreamingUI';
import { StreamingUIRenderer } from '@/components/sdui/StreamingUIRenderer';

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
