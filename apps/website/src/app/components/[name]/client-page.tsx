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
    return <div className="container mx-auto py-10 px-4">Loading...</div>;
  }

  if (!metadata) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <Link href="/components">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Component Not Found</CardTitle>
            <CardDescription>
              The component &quot;{name}&quot; does not exist.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/components">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight">{metadata.name}</h1>
          <Badge variant="secondary" className="capitalize">
            {metadata.category}
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground">{metadata.description}</p>
      </div>

      <Separator className="my-8" />

      {/* Props Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Default</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {metadata.props.map((prop, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {prop.name}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {prop.description}
                      </td>
                      <td className="px-4 py-3">
                        {prop.default && (
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {prop.default}
                          </code>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {prop.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
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

      <Separator className="my-8" />

      {/* Examples Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>
        <div className="space-y-8">
          {metadata.examples.map((example, exampleIndex) => (
            <Card key={exampleIndex}>
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="dsl">DSL</TabsTrigger>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                  </TabsList>

                  {/* Preview Tab */}
                  <TabsContent value="preview" className="mt-6">
                    <div className="border rounded-lg p-6 bg-background">
                      <StreamingUIRenderer node={example.json} />
                    </div>
                  </TabsContent>

                  {/* DSL Tab */}
                  <TabsContent value="dsl" className="mt-6">
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => copyToClipboard(example.dsl, 'dsl', exampleIndex)}
                      >
                        {copiedDSL === exampleIndex ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm font-mono">{example.dsl}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  {/* JSON Tab */}
                  <TabsContent value="json" className="mt-6">
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
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
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm font-mono">
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
