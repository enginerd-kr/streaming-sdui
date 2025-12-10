import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap, Palette, Code2, Radio } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="px-4 pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Zap className="w-4 h-4" />
            <span>80% 토큰 절감</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Server-Driven UI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            스트리밍 기반 서버드리븐 UI로 LLM이 생성하는 인터페이스를 실시간으로 렌더링하세요
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/demo">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                스트리밍 데모 <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/components">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                컴포넌트 문서
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            주요 기능
          </h2>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">실시간 스트리밍</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  LLM이 생성하는 UI를 실시간으로 렌더링. ChatGPT처럼 점진적으로 나타나는 부드러운 UX
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">커스텀 컴포넌트</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Material-UI, Ant Design 등 원하는 디자인 시스템을 자유롭게 등록하고 사용
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">DSL 포맷</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  간결한 DSL 문법으로 JSON 대비 80% 토큰 절감. 비용과 속도 면에서 압도적으로 유리
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">다양한 프로토콜</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  JSONL, SSE, Streaming JSON 지원. 다양한 환경에서 유연하게 UI 전송
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DSL Comparison */}
      <section className="px-4 py-10 md:py-14 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              왜 DSL인가?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              동일한 UI를 표현하는데 80% 적은 토큰으로 비용과 속도를 동시에 절감
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DSL */}
            <Card className="border-2 border-green-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    DSL 형식
                  </CardTitle>
                  <span className="text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full">
                    ~50 토큰
                  </span>
                </div>
                <CardDescription>간결하고 효율적</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-blue-600">Card#card-1</div>
                  <div className="ml-4 text-purple-600">@className: w-full</div>
                  <div className="ml-4 text-blue-600">CardHeader#header</div>
                  <div className="ml-8 text-blue-600">CardTitle#title:</div>
                  <div className="ml-12 text-foreground">&quot;Dashboard&quot;</div>
                  <div className="ml-8 text-blue-600">CardDescription:</div>
                  <div className="ml-12 text-muted-foreground">&quot;View metrics&quot;</div>
                  <div className="ml-4 text-blue-600">CardContent:</div>
                  <div className="ml-8 text-foreground">&quot;Total: 1,234&quot;</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>간결한 문법</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>LLM이 이해하기 쉬움</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-semibold">토큰 80% 절감</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* JSON */}
            <Card className="border-2 border-orange-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-orange-600 flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    JSON 형식
                  </CardTitle>
                  <span className="text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 rounded-full">
                    ~250 토큰
                  </span>
                </div>
                <CardDescription>표준 포맷</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-purple-600">{`{`}</div>
                  <div className="ml-4 text-green-600">&quot;id&quot;: &quot;card-1&quot;,</div>
                  <div className="ml-4 text-green-600">&quot;type&quot;: &quot;Card&quot;,</div>
                  <div className="ml-4 text-green-600">&quot;props&quot;: {`{`}</div>
                  <div className="ml-8 text-green-600">&quot;className&quot;: &quot;w-full&quot;</div>
                  <div className="ml-4 text-green-600">{`}`},</div>
                  <div className="ml-4 text-green-600">&quot;children&quot;: [</div>
                  <div className="ml-8 text-blue-600">{`{ "id": "header", ... }`},</div>
                  <div className="ml-8 text-blue-600">{`{ "id": "content", ... }`}</div>
                  <div className="ml-4 text-green-600">]</div>
                  <div className="text-purple-600">{`}`}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>표준 형식</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>도구 호환성 우수</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>디버깅 용이</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 md:p-5 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
            <p className="text-center text-sm md:text-base text-blue-900 dark:text-blue-100">
              💡 <strong>두 형식 모두 지원:</strong> DSL로 비용 절감 + JSON으로 표준 호환성 확보
            </p>
          </div>
        </div>
      </section>

      {/* Custom Components */}
      <section className="px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              커스텀 컴포넌트 등록
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              자신만의 디자인 시스템을 SDUI와 함께 사용하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">extendRegistry</CardTitle>
                <CardDescription>기본 컴포넌트에 추가</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm overflow-x-auto">
                  <div className="text-purple-600">extendRegistry({`{`}</div>
                  <div className="ml-4 text-green-600">MyButton,</div>
                  <div className="ml-4 text-green-600">MyCard,</div>
                  <div className="text-purple-600">{`})`}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">createComponentRegistry</CardTitle>
                <CardDescription>새로운 레지스트리 생성</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm overflow-x-auto">
                  <div className="text-purple-600">createComponentRegistry({`{`}</div>
                  <div className="ml-4 text-green-600">Button: MyBtn,</div>
                  <div className="ml-4 text-green-600">Card: MyCard,</div>
                  <div className="text-purple-600">{`})`}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">사용 예제</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-3 md:p-4 overflow-x-auto">
                <pre className="text-xs md:text-sm leading-relaxed font-mono">
                  <code className="block text-slate-100">
                    <span className="text-purple-400">import</span> {`{ `}<span className="text-cyan-300">extendRegistry</span> {`} `}<span className="text-purple-400">from</span> <span className="text-emerald-400">'@sdui/react'</span>;{'\n'}
                    <span className="text-purple-400">import</span> {`{ `}<span className="text-cyan-300">Button</span>, <span className="text-cyan-300">Card</span> {`} `}<span className="text-purple-400">from</span> <span className="text-emerald-400">'./my-design-system'</span>;{'\n'}
                    {'\n'}
                    <span className="text-purple-400">const</span> <span className="text-blue-300">registry</span> <span className="text-slate-400">=</span> <span className="text-yellow-300">extendRegistry</span>({`({ `}<span className="text-cyan-300">Button</span>, <span className="text-cyan-300">Card</span> {`})`});{'\n'}
                    {'\n'}
                    <span className="text-slate-400">&lt;</span><span className="text-pink-400">StreamingUIRenderer</span>{'\n'}
                    {'  '}<span className="text-sky-300">node</span>=<span className="text-yellow-300">{`{`}</span>uiTree<span className="text-yellow-300">{`}`}</span>{'\n'}
                    {'  '}<span className="text-sky-300">context</span>=<span className="text-yellow-300">{`{{`}</span> registry <span className="text-yellow-300">{`}}`}</span>{'\n'}
                    <span className="text-slate-400">/&gt;</span>
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Start */}
      <section className="px-4 py-10 md:py-14 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">빠른 시작</CardTitle>
              <CardDescription>
                DSL 포맷으로 80% 토큰 절감! 🚀
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-3 md:p-4 overflow-x-auto">
                <pre className="text-xs md:text-sm leading-relaxed font-mono">
                  <code className="block text-slate-100">
                    <span className="text-purple-400">import</span> {`{ `}<span className="text-cyan-300">useStreamingUI</span> {`} `}<span className="text-purple-400">from</span> <span className="text-emerald-400">'@sdui/core'</span>;{'\n'}
                    <span className="text-purple-400">import</span> {`{ `}<span className="text-cyan-300">StreamingUIRenderer</span> {`} `}<span className="text-purple-400">from</span> <span className="text-emerald-400">'@sdui/react'</span>;{'\n'}
                    {'\n'}
                    <span className="text-purple-400">function</span> <span className="text-yellow-300">App</span>() {`{`}{'\n'}
                    {'  '}<span className="text-purple-400">const</span> {`{ `}<span className="text-blue-300">uiTree</span>, <span className="text-blue-300">start</span> {`} `}<span className="text-slate-400">=</span> <span className="text-yellow-300">useStreamingUI</span>({`({`}{'\n'}
                    {'    '}<span className="text-sky-300">format</span>: <span className="text-emerald-400">'dsl'</span>, <span className="text-slate-500">// JSON 대비 80% 토큰 절감!</span>{'\n'}
                    {'  '}{`});`}{'\n'}
                    {'\n'}
                    {'  '}<span className="text-purple-400">return</span> ({'\n'}
                    {'    '}<span className="text-slate-400">&lt;&gt;</span>{'\n'}
                    {'      '}<span className="text-slate-400">&lt;</span><span className="text-pink-400">button</span> <span className="text-sky-300">onClick</span>=<span className="text-yellow-300">{`{`}</span>() <span className="text-slate-400">=&gt;</span> <span className="text-yellow-300">start</span>(<span className="text-emerald-400">'/api/generate-ui'</span>, {`{`}{'\n'}
                    {'        '}<span className="text-sky-300">prompt</span>: <span className="text-emerald-400">'Create a dashboard'</span>{'\n'}
                    {'      '}{`})`}<span className="text-yellow-300">{`}`}</span><span className="text-slate-400">&gt;</span>{'\n'}
                    {'        '}Generate UI{'\n'}
                    {'      '}<span className="text-slate-400">&lt;/</span><span className="text-pink-400">button</span><span className="text-slate-400">&gt;</span>{'\n'}
                    {'      '}<span className="text-slate-400">&lt;</span><span className="text-pink-400">StreamingUIRenderer</span> <span className="text-sky-300">node</span>=<span className="text-yellow-300">{`{`}</span>uiTree<span className="text-yellow-300">{`}`}</span> <span className="text-slate-400">/&gt;</span>{'\n'}
                    {'    '}<span className="text-slate-400">&lt;/&gt;</span>{'\n'}
                    {'  '});{'\n'}
                    {`}`}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            지금 바로 시작하세요
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link href="/demo">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                스트리밍 데모 <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/components">
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                컴포넌트 문서
              </Button>
            </Link>
            <Link href="/demo/container-example">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Container 예제
              </Button>
            </Link>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                shadcn/ui 문서
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
