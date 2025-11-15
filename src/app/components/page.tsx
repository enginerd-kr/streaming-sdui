import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { componentMetadata, getComponentsByCategory } from '@/lib/sdui/component-metadata';
import { ArrowRight, Home } from 'lucide-react';

export default function ComponentsPage() {
  const containerComponents = getComponentsByCategory('container');
  const primitiveComponents = getComponentsByCategory('primitive');
  const htmlComponents = getComponentsByCategory('html');

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Back to Home Button */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Components</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Beautifully designed components for your server-driven UI.
          Copy and paste into your apps. Fully customizable. Open Source.
        </p>
      </div>

      {/* Container Components */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Container Components</h2>
          <p className="text-muted-foreground">
            Layout and structure components. The foundation of your screen composition.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {containerComponents.map((component) => (
            <Link key={component.key} href={`/components/${component.key.toLowerCase()}`}>
              <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {component.name}
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {component.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Primitive Components */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Primitive Components</h2>
          <p className="text-muted-foreground">
            shadcn/ui based UI elements. Buttons, inputs, cards and more.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {primitiveComponents.map((component) => (
            <Link key={component.key} href={`/components/${component.key.toLowerCase()}`}>
              <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {component.name}
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {component.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* HTML Components */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">HTML Components</h2>
          <p className="text-muted-foreground">
            Basic HTML elements. div, h1-h6, p, a, img and more.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {htmlComponents.map((component) => (
            <Link key={component.key} href={`/components/${component.key.toLowerCase()}`}>
              <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {component.name}
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {component.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
