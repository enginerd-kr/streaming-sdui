'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getComponentsByCategory } from '@sdui/core';
import { Home, ArrowRight } from 'lucide-react';

export default function ComponentsPage() {
  const containerComponents = getComponentsByCategory('container');
  const primitiveComponents = getComponentsByCategory('primitive');
  const htmlComponents = getComponentsByCategory('html');

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 max-w-5xl">
      {/* Back to Home Button */}
      <div className="mb-4 md:mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 md:mb-12 space-y-3 md:space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">컴포넌트</h1>
        <p className="text-sm md:text-base lg:text-xl text-muted-foreground max-w-3xl">
          Server-Driven UI를 위한 아름답게 디자인된 컴포넌트입니다.
          앱에 복사하여 붙여넣으세요. 완전히 커스터마이징 가능하며 오픈소스입니다.
        </p>
      </div>

      {/* Container Components */}
      <section className="mb-8 md:mb-12">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Container 컴포넌트</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            레이아웃 및 구조 컴포넌트입니다. 화면 구성의 기초가 됩니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
      <section className="mb-8 md:mb-12">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Primitive 컴포넌트</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            shadcn/ui 기반 UI 요소입니다. 버튼, 입력, 카드 등이 포함됩니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
      <section className="mb-8 md:mb-12">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">HTML 컴포넌트</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            기본 HTML 요소입니다. div, h1-h6, p, a, img 등이 포함됩니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
