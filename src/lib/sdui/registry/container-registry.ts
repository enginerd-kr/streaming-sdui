/**
 * Container 컴포넌트 레지스트리
 * 레이아웃과 구조를 담당하는 컴포넌트들
 */

import { Screen } from '@/components/sdui/containers/Screen';
import { AppBar } from '@/components/sdui/containers/AppBar';
import { VStack, HStack, ZStack } from '@/components/sdui/containers/Stack';
import { ScrollView } from '@/components/sdui/containers/ScrollView';
import { Grid } from '@/components/sdui/containers/Grid';
import { Container } from '@/components/sdui/containers/Container';
import { SafeArea } from '@/components/sdui/containers/SafeArea';

import type { ComponentRegistry } from '../types';

/**
 * Container 컴포넌트 레지스트리
 */
export const containerRegistry: ComponentRegistry = {
  Screen,
  AppBar,
  VStack,
  HStack,
  ZStack,
  ScrollView,
  Grid,
  Container,
  SafeArea,
};
