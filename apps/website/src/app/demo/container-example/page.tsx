'use client';

import React from 'react';
import Link from 'next/link';
import { Screen } from '@sdui/react';
import { AppBar } from '@sdui/react';
import { VStack, HStack } from '@sdui/react';
import { Container } from '@sdui/react';
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

// Complete Page Schema
const completePageSchema: UINode = {
  id: 'container-demo-page',
  type: 'Screen',
  props: {
    backgroundColor: '#f9fafb',
    scrollable: true
  },
  children: [
    {
      id: 'app-bar',
      type: 'AppBar',
      props: {
        title: 'Container 컴포넌트 데모',
        position: 'sticky',
        elevation: 1
      }
    },
    {
      id: 'main-container',
      type: 'Container',
      props: {
        maxWidth: 'xl',
        padding: 6
      },
      children: [
        {
          id: 'content-vstack',
          type: 'VStack',
          props: { spacing: 8 },
          children: [
            {
              id: 'vstack-hstack-card',
              type: 'Card',
              children: [
                {
                  id: 'vstack-header',
                  type: 'CardHeader',
                  children: [
                    { id: 'vstack-title', type: 'CardTitle', children: ['VStack & HStack 예제'] },
                    { id: 'vstack-desc', type: 'CardDescription', children: ['자식을 세로/가로로 배치하는 스택'] }
                  ]
                },
                {
                  id: 'vstack-content',
                  type: 'CardContent',
                  children: [
                    {
                      id: 'demo-vstack',
                      type: 'VStack',
                      props: { spacing: 4 },
                      children: [
                        {
                          id: 'hstack-row1',
                          type: 'HStack',
                          props: { spacing: 3, justify: 'space-between', className: 'w-full' },
                          children: [
                            { id: 'btn1', type: 'Button', children: ['버튼 1'] },
                            { id: 'btn2', type: 'Button', children: ['버튼 2'] },
                            { id: 'btn3', type: 'Button', children: ['버튼 3'] }
                          ]
                        },
                        {
                          id: 'hstack-row2',
                          type: 'HStack',
                          props: { spacing: 3, alignment: 'center' },
                          children: [
                            { id: 'input1', type: 'Input', props: { placeholder: '텍스트를 입력하세요...', className: 'flex-1' } },
                            { id: 'submit-btn', type: 'Button', children: ['제출'] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'grid-card',
              type: 'Card',
              children: [
                {
                  id: 'grid-header',
                  type: 'CardHeader',
                  children: [
                    { id: 'grid-title', type: 'CardTitle', children: ['Grid 예제'] },
                    { id: 'grid-desc', type: 'CardDescription', children: ['반응형 그리드 레이아웃'] }
                  ]
                },
                {
                  id: 'grid-content',
                  type: 'CardContent',
                  children: [
                    {
                      id: 'demo-grid',
                      type: 'Grid',
                      props: {
                        columns: 3,
                        gap: 4,
                        responsive: {
                          sm: { columns: 1 },
                          md: { columns: 2 },
                          lg: { columns: 3 }
                        }
                      },
                      children: [
                        { id: 'grid-card-1', type: 'Card', children: [{ id: 'gc1-header', type: 'CardHeader', children: [{ id: 'gc1-title', type: 'CardTitle', children: ['카드 1'] }] }] },
                        { id: 'grid-card-2', type: 'Card', children: [{ id: 'gc2-header', type: 'CardHeader', children: [{ id: 'gc2-title', type: 'CardTitle', children: ['카드 2'] }] }] },
                        { id: 'grid-card-3', type: 'Card', children: [{ id: 'gc3-header', type: 'CardHeader', children: [{ id: 'gc3-title', type: 'CardTitle', children: ['카드 3'] }] }] },
                        { id: 'grid-card-4', type: 'Card', children: [{ id: 'gc4-header', type: 'CardHeader', children: [{ id: 'gc4-title', type: 'CardTitle', children: ['카드 4'] }] }] },
                        { id: 'grid-card-5', type: 'Card', children: [{ id: 'gc5-header', type: 'CardHeader', children: [{ id: 'gc5-title', type: 'CardTitle', children: ['카드 5'] }] }] },
                        { id: 'grid-card-6', type: 'Card', children: [{ id: 'gc6-header', type: 'CardHeader', children: [{ id: 'gc6-title', type: 'CardTitle', children: ['카드 6'] }] }] }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'scrollview-card',
              type: 'Card',
              children: [
                {
                  id: 'scroll-header',
                  type: 'CardHeader',
                  children: [
                    { id: 'scroll-title', type: 'CardTitle', children: ['ScrollView 예제'] },
                    { id: 'scroll-desc', type: 'CardDescription', children: ['수평 스크롤 가능한 영역'] }
                  ]
                },
                {
                  id: 'scroll-content',
                  type: 'CardContent',
                  children: [
                    {
                      id: 'demo-scrollview',
                      type: 'ScrollView',
                      props: { direction: 'horizontal', className: 'h-48' },
                      children: [
                        {
                          id: 'scroll-hstack',
                          type: 'HStack',
                          props: { spacing: 4, className: 'pr-4' },
                          children: [
                            { id: 'scroll-item-1', type: 'Card', props: { className: 'min-w-[250px]' }, children: [{ id: 'si1-header', type: 'CardHeader', children: [{ id: 'si1-title', type: 'CardTitle', children: ['항목 1'] }] }] },
                            { id: 'scroll-item-2', type: 'Card', props: { className: 'min-w-[250px]' }, children: [{ id: 'si2-header', type: 'CardHeader', children: [{ id: 'si2-title', type: 'CardTitle', children: ['항목 2'] }] }] },
                            { id: 'scroll-item-3', type: 'Card', props: { className: 'min-w-[250px]' }, children: [{ id: 'si3-header', type: 'CardHeader', children: [{ id: 'si3-title', type: 'CardTitle', children: ['항목 3'] }] }] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'nested-card',
              type: 'Card',
              children: [
                {
                  id: 'nested-header',
                  type: 'CardHeader',
                  children: [
                    { id: 'nested-title', type: 'CardTitle', children: ['중첩된 Container 예제'] },
                    { id: 'nested-desc', type: 'CardDescription', children: ['컨테이너 안에 다양한 컴포넌트 조합'] }
                  ]
                },
                {
                  id: 'nested-content',
                  type: 'CardContent',
                  children: [
                    {
                      id: 'nested-vstack',
                      type: 'VStack',
                      props: { spacing: 6 },
                      children: [
                        {
                          id: 'form-container',
                          type: 'div',
                          props: { className: 'border rounded-lg p-4' },
                          children: [
                            {
                              id: 'form-vstack',
                              type: 'VStack',
                              props: { spacing: 3 },
                              children: [
                                {
                                  id: 'name-hstack',
                                  type: 'HStack',
                                  props: { spacing: 2, className: 'w-full' },
                                  children: [
                                    { id: 'firstname-input', type: 'Input', props: { placeholder: '이름', className: 'flex-1' } },
                                    { id: 'lastname-input', type: 'Input', props: { placeholder: '성', className: 'flex-1' } }
                                  ]
                                },
                                { id: 'email-input', type: 'Input', props: { placeholder: '이메일', className: 'w-full' } },
                                {
                                  id: 'actions-hstack',
                                  type: 'HStack',
                                  props: { spacing: 2, justify: 'end', className: 'w-full' },
                                  children: [
                                    { id: 'cancel-btn', type: 'Button', props: { variant: 'outline' }, children: ['취소'] },
                                    { id: 'save-btn', type: 'Button', children: ['저장'] }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

/**
 * Container 컴포넌트 데모 페이지
 * 실제 사용 예시를 보여줍니다
 */
export default function ContainerExamplePage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Screen backgroundColor="#f9fafb" scrollable>
        {/* AppBar */}
        <AppBar
          title="Container 컴포넌트 데모"
          leading={
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                ← 홈
              </Button>
            </Link>
          }
          actions={
            <div className="flex gap-1 md:gap-2">
              <Link href="/demo">
                <Button variant="ghost" size="sm" className="text-xs md:text-sm px-2 md:px-3">
                  데모
                </Button>
              </Link>
              <Button variant="default" size="sm" className="text-xs md:text-sm px-2 md:px-3">로그인</Button>
            </div>
          }
          position="sticky"
          elevation={1}
          className="[&>div]:h-16 [&>div]:items-center"
        />

        {/* Main Content */}
        <Container maxWidth="xl" padding={4} className="md:p-6 w-full">
          <VStack spacing={6} className="md:space-y-8">
            {/* Section 1: VStack & HStack 예제 */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>VStack & HStack 예제</CardTitle>
                <CardDescription>자식을 세로/가로로 배치하는 스택</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack spacing={4}>
                  <HStack spacing={2} justify="space-between" className="w-full flex-wrap md:flex-nowrap md:gap-3">
                    <Button size="sm" className="flex-1 md:flex-none min-w-0">버튼 1</Button>
                    <Button size="sm" className="flex-1 md:flex-none min-w-0">버튼 2</Button>
                    <Button size="sm" className="flex-1 md:flex-none min-w-0">버튼 3</Button>
                  </HStack>
                  <HStack spacing={2} alignment="center" className="md:gap-3 w-full">
                    <Input placeholder="텍스트를 입력하세요..." className="flex-1 text-sm min-w-0" />
                    <Button size="sm" className="whitespace-nowrap">제출</Button>
                  </HStack>
                </VStack>
              </CardContent>
            </Card>

            {/* Section 2: Grid 예제 */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Grid 예제</CardTitle>
                <CardDescription>반응형 그리드 레이아웃</CardDescription>
              </CardHeader>
              <CardContent>
                <Grid
                  columns={3}
                  gap={4}
                  responsive={{
                    sm: { columns: 1 },
                    md: { columns: 2 },
                    lg: { columns: 3 },
                  }}
                  className="w-full"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <Card key={num} className="min-w-0">
                      <CardHeader>
                        <CardTitle>카드 {num}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          그리드의 {num}번째 카드입니다.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Section 3: ScrollView 예제 */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>ScrollView 예제</CardTitle>
                <CardDescription>수평 스크롤 가능한 영역</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollView direction="horizontal" className="h-48 w-full">
                  <HStack spacing={4} className="pr-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <Card key={num} className="min-w-[200px] md:min-w-[250px]">
                        <CardHeader>
                          <CardTitle>항목 {num}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">수평 스크롤 항목</p>
                        </CardContent>
                      </Card>
                    ))}
                  </HStack>
                </ScrollView>
              </CardContent>
            </Card>

            {/* Section 4: Nested Containers 예제 */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>중첩된 Container 예제</CardTitle>
                <CardDescription>컨테이너 안에 다양한 컴포넌트 조합</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack spacing={6}>
                  {/* Container in Primitive */}
                  <div className="border rounded-lg p-4 w-full">
                    <h4 className="font-semibold mb-3 text-sm md:text-base">HStack을 사용한 폼 레이아웃</h4>
                    <VStack spacing={3}>
                      <HStack spacing={2} className="w-full">
                        <Input placeholder="이름" className="flex-1 min-w-0 text-sm" />
                        <Input placeholder="성" className="flex-1 min-w-0 text-sm" />
                      </HStack>
                      <Input placeholder="이메일" className="w-full text-sm" />
                      <HStack spacing={2} justify="end" className="w-full">
                        <Button variant="outline" size="sm">취소</Button>
                        <Button size="sm">저장</Button>
                      </HStack>
                    </VStack>
                  </div>

                  {/* Grid in VStack */}
                  <div className="border rounded-lg p-4 w-full">
                    <h4 className="font-semibold mb-3 text-sm md:text-base">VStack 내부의 Grid</h4>
                    <Grid columns={2} gap={3} className="w-full">
                      <Button variant="outline" size="sm" className="min-w-0">옵션 1</Button>
                      <Button variant="outline" size="sm" className="min-w-0">옵션 2</Button>
                      <Button variant="outline" size="sm" className="min-w-0">옵션 3</Button>
                      <Button variant="outline" size="sm" className="min-w-0">옵션 4</Button>
                    </Grid>
                  </div>
                </VStack>
              </CardContent>
            </Card>


            {/* Complete Page Schema Section */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">전체 페이지 스키마</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  이 데모 페이지 전체를 Server-Driven UI로 표현한 스키마
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
                  <p>아래 스키마는 위에서 보이는 모든 Container 예제들의 전체 구조입니다.</p>
                  <p className="mt-1">Screen → AppBar → Container → VStack → Cards 형태로 중첩되어 있습니다.</p>
                  <p className="mt-2 font-medium text-foreground">
                    💡 JSON과 DSL을 비교해보세요! DSL이 얼마나 간결한지 확인할 수 있습니다.
                  </p>
                </div>

                <Tabs defaultValue="dsl" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-auto">
                    <TabsTrigger value="dsl" className="text-xs md:text-sm py-2">
                      🆕 DSL <span className="ml-1 md:ml-2 text-[10px] md:text-xs bg-green-100 text-green-800 px-1.5 md:px-2 py-0.5 rounded">80% 절감</span>
                    </TabsTrigger>
                    <TabsTrigger value="json" className="text-xs md:text-sm py-2">📦 JSON</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dsl">
                    <pre className="bg-muted p-2 md:p-4 rounded-md overflow-x-auto text-[10px] sm:text-xs max-h-[400px] md:max-h-[600px] overflow-y-auto w-full">
                      <code className="block whitespace-pre">{convertToDSL(completePageSchema)}</code>
                    </pre>
                  </TabsContent>

                  <TabsContent value="json">
                    <pre className="bg-muted p-2 md:p-4 rounded-md overflow-x-auto text-[10px] sm:text-xs max-h-[400px] md:max-h-[600px] overflow-y-auto w-full">
                      <code className="block whitespace-pre">{JSON.stringify(completePageSchema, null, 2)}</code>
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </VStack>
        </Container>
      </Screen>
    </div>
  );
}
