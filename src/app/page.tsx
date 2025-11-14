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
              <CardTitle>⚡ TypeScript 지원</CardTitle>
              <CardDescription>
                완전한 타입 안정성
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                강력한 타입 시스템으로 안전하게 개발할 수 있습니다.
                IDE 자동완성과 오류 검사를 지원합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎭 애니메이션</CardTitle>
              <CardDescription>
                Framer Motion 기반 부드러운 전환
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                컴포넌트가 나타날 때 자연스러운 애니메이션이 적용되어
                사용자 경험을 향상시킵니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/demo">
            <Button size="lg" className="text-lg">
              데모 보기
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
          </CardHeader>
          <CardContent>
            <pre className="bg-background p-4 rounded-md overflow-x-auto text-sm">
              <code>{`import { useStreamingUI } from '@/lib/sdui/hooks/useStreamingUI';
import { StreamingUIRenderer } from '@/components/sdui/StreamingUIRenderer';

function App() {
  const { uiTree, start } = useStreamingUI();

  return (
    <>
      <button onClick={() => start('/api/generate-ui', { prompt: 'dashboard' })}>
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
