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
        </VStack>
      </Container>
    </Screen>
  );
}
