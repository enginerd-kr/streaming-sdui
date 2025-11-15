import { notFound } from 'next/navigation';
import Link from 'next/link';
import { componentMetadata } from '@/lib/sdui/component-metadata';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StreamingUIRenderer } from '@/components/sdui/StreamingUIRenderer';
import { Copy, Check, ChevronLeft } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ComponentPageProps {
  params: {
    name: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(componentMetadata).map((key) => ({
    name: key.toLowerCase(),
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { name } = await params;

  // Find component by case-insensitive name match
  const componentKey = Object.keys(componentMetadata).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  );

  if (!componentKey) {
    notFound();
  }

  const metadata = componentMetadata[componentKey];

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Back Button */}
      <Link href="/components" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to components
      </Link>

      {/* Header */}
      <div className="mb-8 pb-8 border-b">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">{metadata.name}</h1>
          <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium capitalize">
            {metadata.category}
          </span>
        </div>
        <p className="text-xl text-muted-foreground">{metadata.description}</p>
      </div>

      {/* Examples Section */}
      {metadata.examples.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Examples</h2>
          <div className="space-y-8">
            {metadata.examples.map((example, idx) => (
              <div key={idx} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{example.title}</h3>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </div>

                {/* Preview */}
                <Card className="p-6 bg-muted/30">
                  <StreamingUIRenderer node={example.json} />
                </Card>

                {/* Code Tabs */}
                <Tabs defaultValue="dsl" className="w-full">
                  <TabsList>
                    <TabsTrigger value="dsl">DSL</TabsTrigger>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dsl" className="mt-4">
                    <CodeBlock code={example.dsl} language="dsl" />
                  </TabsContent>

                  <TabsContent value="json" className="mt-4">
                    <CodeBlock code={JSON.stringify(example.json, null, 2)} language="json" />
                  </TabsContent>
                </Tabs>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Props Section */}
      {metadata.props.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Props</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="text-left px-4 py-3 font-semibold text-sm">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-sm">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-sm">Default</th>
                  <th className="text-left px-4 py-3 font-semibold text-sm">Description</th>
                </tr>
              </thead>
              <tbody>
                {metadata.props.map((prop, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
                        {prop.name}
                        {prop.required && <span className="text-red-500 ml-1">*</span>}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-muted-foreground">{prop.type}</code>
                    </td>
                    <td className="px-4 py-3">
                      {prop.default ? (
                        <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
