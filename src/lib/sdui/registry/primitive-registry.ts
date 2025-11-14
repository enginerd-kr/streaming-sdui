/**
 * Primitive 컴포넌트 레지스트리
 * shadcn/ui 기반의 UI 요소들
 */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

import type { ComponentRegistry } from '../types';

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
