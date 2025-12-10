'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { componentMetadata, type ComponentMetadata } from '@sdui/core';
import { StreamingUIRenderer } from '@sdui/react';

export default function ComponentDetailClient({ params }: { params: Promise<{ name: string }> }) {
  const [name, setName] = useState<string>('');
  const [metadata, setMetadata] = useState<ComponentMetadata | null>(null);
  const [copiedDSL, setCopiedDSL] = useState<number | null>(null);
  const [copiedJSON, setCopiedJSON] = useState<number | null>(null);

  useEffect(() => {
    params.then(p => {
      // Find the component name by case-insensitive match
      const urlParam = p.name.toLowerCase();
      const componentName = Object.keys(componentMetadata).find(
        key => key.toLowerCase() === urlParam
      );

      if (componentName) {
        setName(componentName);
        setMetadata(componentMetadata[componentName]);
      } else {
        setName(p.name);
        setMetadata(null);
      }
    });
  }, [params]);

  const copyToClipboard = async (text: string, type: 'dsl' | 'json', index: number) => {
    await navigator.clipboard.writeText(text);
    if (type === 'dsl') {
      setCopiedDSL(index);
      setTimeout(() => setCopiedDSL(null), 2000);
    } else {
      setCopiedJSON(index);
      setTimeout(() => setCopiedJSON(null), 2000);
    }
  };

  if (!name) {
    return <div className="container mx-auto py-10 px-4">로딩 중...</div>;
  }

  if (!metadata) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <Link href="/components">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            컴포넌트 목록으로
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>컴포넌트를 찾을 수 없습니다</CardTitle>
            <CardDescription>
              &quot;{name}&quot; 컴포넌트가 존재하지 않습니다.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 max-w-5xl">
      {/* Back Button */}
      <div className="mb-4 md:mb-6">
        <Link href="/components">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            컴포넌트 목록으로
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{metadata.name}</h1>
          <Badge variant="secondary" className="capitalize w-fit">
            {metadata.category}
          </Badge>
        </div>
        <p className="text-sm md:text-base lg:text-xl text-muted-foreground">{metadata.description}</p>
      </div>

      <Separator className="my-6 md:my-8" />

      {/* Props Section */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Props</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">이름</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">타입</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden md:table-cell">설명</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden lg:table-cell">기본값</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">필수</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {metadata.props.map((prop, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <code className="text-xs md:text-sm font-mono bg-muted px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                          {prop.name}
                        </code>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <code className="text-xs md:text-sm font-mono text-blue-600 dark:text-blue-400">
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-muted-foreground hidden md:table-cell">
                        {prop.description}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden lg:table-cell">
                        {prop.default && (
                          <code className="text-xs md:text-sm font-mono bg-muted px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                            {prop.default}
                          </code>
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        {prop.required && (
                          <Badge variant="destructive" className="text-xs">
                            필수
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-6 md:my-8" />

      {/* Examples Section */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">예제</h2>
        <div className="space-y-6 md:space-y-8">
          {metadata.examples.map((example, exampleIndex) => (
            <Card key={exampleIndex}>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">{example.title}</CardTitle>
                <CardDescription className="text-sm">{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-auto">
                    <TabsTrigger value="preview" className="text-xs md:text-sm">미리보기</TabsTrigger>
                    <TabsTrigger value="dsl" className="text-xs md:text-sm">DSL</TabsTrigger>
                    <TabsTrigger value="json" className="text-xs md:text-sm">JSON</TabsTrigger>
                  </TabsList>

                  {/* Preview Tab */}
                  <TabsContent value="preview" className="mt-4 md:mt-6">
                    <div className="border rounded-lg p-3 md:p-6 bg-background">
                      <StreamingUIRenderer node={example.json} />
                    </div>
                  </TabsContent>

                  {/* DSL Tab */}
                  <TabsContent value="dsl" className="mt-4 md:mt-6">
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 z-10 text-xs"
                        onClick={() => copyToClipboard(example.dsl, 'dsl', exampleIndex)}
                      >
                        {copiedDSL === exampleIndex ? (
                          <>
                            <Check className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                            <span className="hidden md:inline">복사됨!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                            <span className="hidden md:inline">복사</span>
                          </>
                        )}
                      </Button>
                      <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto max-h-[400px] md:max-h-[600px] overflow-y-auto">
                        <code className="text-xs md:text-sm font-mono">{example.dsl}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  {/* JSON Tab */}
                  <TabsContent value="json" className="mt-4 md:mt-6">
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 z-10 text-xs"
                        onClick={() =>
                          copyToClipboard(
                            JSON.stringify(example.json, null, 2),
                            'json',
                            exampleIndex
                          )
                        }
                      >
                        {copiedJSON === exampleIndex ? (
                          <>
                            <Check className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                            <span className="hidden md:inline">복사됨!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                            <span className="hidden md:inline">복사</span>
                          </>
                        )}
                      </Button>
                      <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto max-h-[400px] md:max-h-[600px] overflow-y-auto">
                        <code className="text-xs md:text-sm font-mono">
                          {JSON.stringify(example.json, null, 2)}
                        </code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
