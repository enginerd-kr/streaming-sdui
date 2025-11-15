/**
 * Primitive 컴포넌트 레지스트리
 * shadcn/ui 기반의 UI 요소들
 */

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Skeleton } from './ui/skeleton';

import type { ComponentRegistry } from '@sdui/core';

/**
 * Primitive 컴포넌트 레지스트리
 */
export const primitiveRegistry: ComponentRegistry = {
  // Form Components
  Button,
  Input,
  Label,

  // Card Components
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

  // Tab Components
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,

  // Feedback Components
  Skeleton,
};
