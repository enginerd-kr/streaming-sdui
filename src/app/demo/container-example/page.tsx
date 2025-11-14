'use client';

import React from 'react';
import { Screen } from '@/components/sdui/containers/Screen';
import { AppBar } from '@/components/sdui/containers/AppBar';
import { VStack, HStack } from '@/components/sdui/containers/Stack';
import { Container } from '@/components/sdui/containers/Container';
import { Grid } from '@/components/sdui/containers/Grid';
import { ScrollView } from '@/components/sdui/containers/ScrollView';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

/**
 * Container 컴포넌트 데모 페이지
 * 실제 사용 예시를 보여줍니다
 */
export default function ContainerExamplePage() {
  return (
    <Screen backgroundColor="#f9fafb" scrollable>
      {/* AppBar */}
      <AppBar
        title="Container Components Demo"
        leading={
          <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
            ← Home
          </Button>
        }
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/demo'}>
              Demo
            </Button>
            <Button variant="default" size="sm">Login</Button>
          </>
        }
        position="sticky"
        elevation={1}
      />

      {/* Main Content */}
      <Container maxWidth="xl" padding={6}>
        <VStack spacing={8}>
          {/* Section 1: VStack & HStack 예제 */}
          <Card>
            <CardHeader>
              <CardTitle>VStack & HStack Example</CardTitle>
              <CardDescription>자식을 세로/가로로 배치하는 스택</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack spacing={4}>
                <HStack spacing={3} justify="space-between" className="w-full">
                  <Button>Button 1</Button>
                  <Button>Button 2</Button>
                  <Button>Button 3</Button>
                </HStack>
                <HStack spacing={3} alignment="center">
                  <Input placeholder="Enter text..." className="flex-1" />
                  <Button>Submit</Button>
                </HStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Section 2: Grid 예제 */}
          <Card>
            <CardHeader>
              <CardTitle>Grid Example</CardTitle>
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
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Card key={num}>
                    <CardHeader>
                      <CardTitle>Card {num}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This is card number {num} in the grid.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Section 3: ScrollView 예제 */}
          <Card>
            <CardHeader>
              <CardTitle>ScrollView Example</CardTitle>
              <CardDescription>수평 스크롤 가능한 영역</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollView direction="horizontal" className="h-48">
                <HStack spacing={4} className="pr-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Card key={num} className="min-w-[250px]">
                      <CardHeader>
                        <CardTitle>Item {num}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Horizontal scroll item</p>
                      </CardContent>
                    </Card>
                  ))}
                </HStack>
              </ScrollView>
            </CardContent>
          </Card>

          {/* Section 4: Nested Containers 예제 */}
          <Card>
            <CardHeader>
              <CardTitle>Nested Containers Example</CardTitle>
              <CardDescription>컨테이너 안에 다양한 컴포넌트 조합</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack spacing={6}>
                {/* Container in Primitive */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Form Layout with HStack</h4>
                  <VStack spacing={3}>
                    <HStack spacing={2} className="w-full">
                      <Input placeholder="First Name" className="flex-1" />
                      <Input placeholder="Last Name" className="flex-1" />
                    </HStack>
                    <Input placeholder="Email" className="w-full" />
                    <HStack spacing={2} justify="end" className="w-full">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save</Button>
                    </HStack>
                  </VStack>
                </div>

                {/* Grid in VStack */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Grid in VStack</h4>
                  <Grid columns={2} gap={3}>
                    <Button variant="outline">Option 1</Button>
                    <Button variant="outline">Option 2</Button>
                    <Button variant="outline">Option 3</Button>
                    <Button variant="outline">Option 4</Button>
                  </Grid>
                </div>
              </VStack>
            </CardContent>
          </Card>


          {/* JSON Schema Section */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Page Schema</CardTitle>
              <CardDescription>
                이 데모 페이지 전체를 Server-Driven UI JSON으로 표현한 스키마
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-muted-foreground">
                <p>아래 JSON은 위에서 보이는 모든 Container 예제들의 전체 구조입니다.</p>
                <p className="mt-1">Screen → AppBar → Container → VStack → Cards 형태로 중첩되어 있습니다.</p>
              </div>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs max-h-[600px] overflow-y-auto">
                <code>{JSON.stringify({
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
                        title: 'Container Components Demo',
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
                                    { id: 'vstack-title', type: 'CardTitle', children: ['VStack & HStack Example'] },
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
                                            { id: 'btn1', type: 'Button', children: ['Button 1'] },
                                            { id: 'btn2', type: 'Button', children: ['Button 2'] },
                                            { id: 'btn3', type: 'Button', children: ['Button 3'] }
                                          ]
                                        },
                                        {
                                          id: 'hstack-row2',
                                          type: 'HStack',
                                          props: { spacing: 3, alignment: 'center' },
                                          children: [
                                            { id: 'input1', type: 'Input', props: { placeholder: 'Enter text...', className: 'flex-1' } },
                                            { id: 'submit-btn', type: 'Button', children: ['Submit'] }
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
                                    { id: 'grid-title', type: 'CardTitle', children: ['Grid Example'] },
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
                                        { id: 'grid-card-1', type: 'Card', children: [{ id: 'gc1-header', type: 'CardHeader', children: [{ id: 'gc1-title', type: 'CardTitle', children: ['Card 1'] }] }] },
                                        { id: 'grid-card-2', type: 'Card', children: [{ id: 'gc2-header', type: 'CardHeader', children: [{ id: 'gc2-title', type: 'CardTitle', children: ['Card 2'] }] }] },
                                        { id: 'grid-card-3', type: 'Card', children: [{ id: 'gc3-header', type: 'CardHeader', children: [{ id: 'gc3-title', type: 'CardTitle', children: ['Card 3'] }] }] },
                                        { id: 'grid-card-4', type: 'Card', children: [{ id: 'gc4-header', type: 'CardHeader', children: [{ id: 'gc4-title', type: 'CardTitle', children: ['Card 4'] }] }] },
                                        { id: 'grid-card-5', type: 'Card', children: [{ id: 'gc5-header', type: 'CardHeader', children: [{ id: 'gc5-title', type: 'CardTitle', children: ['Card 5'] }] }] },
                                        { id: 'grid-card-6', type: 'Card', children: [{ id: 'gc6-header', type: 'CardHeader', children: [{ id: 'gc6-title', type: 'CardTitle', children: ['Card 6'] }] }] }
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
                                    { id: 'scroll-title', type: 'CardTitle', children: ['ScrollView Example'] },
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
                                            { id: 'scroll-item-1', type: 'Card', props: { className: 'min-w-[250px]' }, children: [{ id: 'si1-header', type: 'CardHeader', children: [{ id: 'si1-title', type: 'CardTitle', children: ['Item 1'] }] }] },
                                            { id: 'scroll-item-2', type: 'Card', props: { className: 'min-w-[250px]' }, children: [{ id: 'si2-header', type: 'CardHeader', children: [{ id: 'si2-title', type: 'CardTitle', children: ['Item 2'] }] }] },
                                            { id: 'scroll-item-3', type: 'Card', props: { className: 'min-w-[250px]' }, children: [{ id: 'si3-header', type: 'CardHeader', children: [{ id: 'si3-title', type: 'CardTitle', children: ['Item 3'] }] }] }
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
                                    { id: 'nested-title', type: 'CardTitle', children: ['Nested Containers Example'] },
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
                                                    { id: 'firstname-input', type: 'Input', props: { placeholder: 'First Name', className: 'flex-1' } },
                                                    { id: 'lastname-input', type: 'Input', props: { placeholder: 'Last Name', className: 'flex-1' } }
                                                  ]
                                                },
                                                { id: 'email-input', type: 'Input', props: { placeholder: 'Email', className: 'w-full' } },
                                                {
                                                  id: 'actions-hstack',
                                                  type: 'HStack',
                                                  props: { spacing: 2, justify: 'end', className: 'w-full' },
                                                  children: [
                                                    { id: 'cancel-btn', type: 'Button', props: { variant: 'outline' }, children: ['Cancel'] },
                                                    { id: 'save-btn', type: 'Button', children: ['Save'] }
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
                }, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        </VStack>
      </Container>
    </Screen>
  );
}
