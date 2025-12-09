'use client';

import React from 'react';
import Link from 'next/link';
import { VStack, HStack } from '@sdui/react';
import { Grid } from '@sdui/react';
import { ScrollView } from '@sdui/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { UINode } from '@sdui/core';

// UINode를 DSL 문자열로 변환
const convertToDSL = (node: UINode, indent = 0): string => {
  const spaces = '  '.repeat(indent);
  let result = '';

  // 컴포넌트 타입
  result += `${spaces}${node.type}`;

  // 인라인 텍스트가 있는 경우 (children이 단일 문자열)
  if (node.children?.length === 1 && typeof node.children[0] === 'string') {
    result += `: ${node.children[0]}\n`;

    // id 추가
    if (node.id) {
      result += `${spaces}  @id: ${node.id}\n`;
    }

    // props 추가
    if (node.props) {
      for (const [key, value] of Object.entries(node.props)) {
        result += `${spaces}  @${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}\n`;
      }
    }
    return result;
  }

  result += '\n';

  // ID 추가
  if (node.id) {
    result += `${spaces}  @id: ${node.id}\n`;
  }

  // Props 추가
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      result += `${spaces}  @${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}\n`;
    }
  }

  // Actions 추가 (간소화)
  if (node.actions) {
    for (const [eventName, action] of Object.entries(node.actions)) {
      const actionType = typeof action === 'object' && action !== null && 'type' in action ? action.type : 'action';
      result += `${spaces}  @${eventName}: ${actionType}\n`;
    }
  }

  // Children 추가
  if (node.children) {
    for (const child of node.children) {
      if (typeof child === 'string') {
        result += `${spaces}  "${child}"\n`;
      } else {
        result += convertToDSL(child, indent + 1);
      }
    }
  }

  return result;
};

/**
 * Container 컴포넌트 데모 페이지
 * 실제 사용 예시를 보여줍니다
 */
export default function ContainerExamplePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl overflow-x-hidden">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Container Components Demo</h1>
          <div className="flex flex-wrap gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                ← Home
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="sm">
                Demo
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">
          Explore VStack, HStack, Grid, ScrollView and nested container layouts
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6 md:space-y-8">
          {/* Section 1: VStack & HStack 예제 */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">VStack & HStack Example</CardTitle>
              <CardDescription className="text-sm">자식을 세로/가로로 배치하는 스택</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack spacing={4}>
                <HStack spacing={2} justify="space-between" className="w-full flex-wrap md:flex-nowrap md:gap-3">
                  <Button size="sm" className="flex-1 md:flex-none text-xs md:text-sm h-8 md:h-9">Button 1</Button>
                  <Button size="sm" className="flex-1 md:flex-none text-xs md:text-sm h-8 md:h-9">Button 2</Button>
                  <Button size="sm" className="flex-1 md:flex-none text-xs md:text-sm h-8 md:h-9">Button 3</Button>
                </HStack>
                <HStack spacing={2} alignment="center" className="md:gap-3">
                  <Input placeholder="Enter text..." className="flex-1 text-sm h-8 md:h-10" />
                  <Button size="sm" className="text-xs md:text-sm h-8 md:h-10">Submit</Button>
                </HStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Section 2: Grid 예제 */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Grid Example</CardTitle>
              <CardDescription className="text-sm">반응형 그리드 레이아웃</CardDescription>
            </CardHeader>
            <CardContent>
              <Grid
                columns={3}
                gap={3}
                responsive={{
                  sm: { columns: 1 },
                  md: { columns: 2 },
                  lg: { columns: 3 },
                }}
                className="md:gap-4"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Card key={num} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base md:text-lg">Card {num}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        This is card number {num} in the grid.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Section 3: ScrollView 예제 */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">ScrollView Example</CardTitle>
              <CardDescription className="text-sm">수평 스크롤 가능한 영역</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollView direction="horizontal" className="h-40 md:h-48">
                <HStack spacing={3} className="pr-4 md:gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Card key={num} className="min-w-[200px] md:min-w-[250px] border-2 hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base md:text-lg">Item {num}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs md:text-sm text-muted-foreground">Horizontal scroll item</p>
                      </CardContent>
                    </Card>
                  ))}
                </HStack>
              </ScrollView>
            </CardContent>
          </Card>

          {/* Section 4: Nested Containers 예제 */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Nested Containers Example</CardTitle>
              <CardDescription className="text-sm">컨테이너 안에 다양한 컴포넌트 조합</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack spacing={5} className="md:space-y-6">
                {/* Container in Primitive */}
                <div className="border-2 rounded-lg p-3 md:p-5 bg-muted/30">
                  <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Form Layout with HStack</h4>
                  <VStack spacing={3}>
                    <HStack spacing={2} className="w-full flex-col md:flex-row md:gap-3">
                      <Input placeholder="First Name" className="flex-1 text-sm h-9 md:h-10" />
                      <Input placeholder="Last Name" className="flex-1 text-sm h-9 md:h-10" />
                    </HStack>
                    <Input placeholder="Email" className="w-full text-sm h-9 md:h-10" />
                    <HStack spacing={2} justify="end" className="w-full md:gap-3">
                      <Button variant="outline" className="text-xs md:text-sm h-8 md:h-9">Cancel</Button>
                      <Button className="text-xs md:text-sm h-8 md:h-9">Save</Button>
                    </HStack>
                  </VStack>
                </div>

                {/* Grid in VStack */}
                <div className="border-2 rounded-lg p-3 md:p-5 bg-muted/30">
                  <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Grid in VStack</h4>
                  <Grid columns={2} gap={2} className="md:gap-3">
                    <Button variant="outline" className="text-xs md:text-sm h-9 md:h-10">Option 1</Button>
                    <Button variant="outline" className="text-xs md:text-sm h-9 md:h-10">Option 2</Button>
                    <Button variant="outline" className="text-xs md:text-sm h-9 md:h-10">Option 3</Button>
                    <Button variant="outline" className="text-xs md:text-sm h-9 md:h-10">Option 4</Button>
                  </Grid>
                </div>
              </VStack>
            </CardContent>
          </Card>


          {/* Schema Example Section */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Container Schema Examples</CardTitle>
              <CardDescription className="text-sm">
                Learn how to define container components with JSON and DSL syntax
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 md:mb-5 space-y-2 text-xs md:text-sm text-muted-foreground">
                <p>Container components can be defined using either JSON or DSL format.</p>
                <p>VStack, HStack, Grid, and ScrollView all support nested children and responsive layouts.</p>
                <p className="mt-3 font-medium text-foreground bg-blue-50 dark:bg-blue-950 p-2 md:p-3 rounded-md">
                  💡 DSL is 80% more concise than JSON - perfect for LLM-generated UIs!
                </p>
              </div>

              <Tabs defaultValue="vstack" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto">
                  <TabsTrigger value="vstack" className="text-[10px] md:text-sm py-2 md:py-2.5">VStack</TabsTrigger>
                  <TabsTrigger value="hstack" className="text-[10px] md:text-sm py-2 md:py-2.5">HStack</TabsTrigger>
                  <TabsTrigger value="grid" className="text-[10px] md:text-sm py-2 md:py-2.5">Grid</TabsTrigger>
                  <TabsTrigger value="scroll" className="text-[10px] md:text-sm py-2 md:py-2.5">Scroll</TabsTrigger>
                </TabsList>

                <TabsContent value="vstack" className="mt-3 md:mt-4 space-y-3">
                  <h4 className="text-sm font-semibold">DSL Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{`VStack
  @spacing: 4
  Button: Click Me
  Button: Another Button
  Button: One More`}</code>
                  </pre>
                  <h4 className="text-sm font-semibold mt-3">JSON Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{JSON.stringify({
                      type: 'VStack',
                      props: { spacing: 4 },
                      children: [
                        { type: 'Button', children: ['Click Me'] },
                        { type: 'Button', children: ['Another Button'] },
                        { type: 'Button', children: ['One More'] }
                      ]
                    }, null, 2)}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="hstack" className="mt-3 md:mt-4 space-y-3">
                  <h4 className="text-sm font-semibold">DSL Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{`HStack
  @spacing: 3
  @justify: space-between
  Button: Save
  Button: Cancel`}</code>
                  </pre>
                  <h4 className="text-sm font-semibold mt-3">JSON Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{JSON.stringify({
                      type: 'HStack',
                      props: { spacing: 3, justify: 'space-between' },
                      children: [
                        { type: 'Button', children: ['Save'] },
                        { type: 'Button', children: ['Cancel'] }
                      ]
                    }, null, 2)}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="grid" className="mt-3 md:mt-4 space-y-3">
                  <h4 className="text-sm font-semibold">DSL Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{`Grid
  @columns: 3
  @gap: 4
  @responsive: {"sm":{"columns":1},"md":{"columns":2}}
  Card
    CardTitle: Item 1
  Card
    CardTitle: Item 2`}</code>
                  </pre>
                  <h4 className="text-sm font-semibold mt-3">JSON Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{JSON.stringify({
                      type: 'Grid',
                      props: {
                        columns: 3,
                        gap: 4,
                        responsive: { sm: { columns: 1 }, md: { columns: 2 } }
                      },
                      children: [
                        { type: 'Card', children: [{ type: 'CardTitle', children: ['Item 1'] }] },
                        { type: 'Card', children: [{ type: 'CardTitle', children: ['Item 2'] }] }
                      ]
                    }, null, 2)}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="scroll" className="mt-3 md:mt-4 space-y-3">
                  <h4 className="text-sm font-semibold">DSL Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{`ScrollView
  @direction: horizontal
  HStack
    @spacing: 4
    Card
      CardTitle: Item 1
    Card
      CardTitle: Item 2`}</code>
                  </pre>
                  <h4 className="text-sm font-semibold mt-3">JSON Format</h4>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-x-auto text-[10px] md:text-xs border">
                    <code className="block leading-relaxed">{JSON.stringify({
                      type: 'ScrollView',
                      props: { direction: 'horizontal' },
                      children: [{
                        type: 'HStack',
                        props: { spacing: 4 },
                        children: [
                          { type: 'Card', children: [{ type: 'CardTitle', children: ['Item 1'] }] },
                          { type: 'Card', children: [{ type: 'CardTitle', children: ['Item 2'] }] }
                        ]
                      }]
                    }, null, 2)}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
