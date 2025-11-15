/**
 * Container 컴포넌트 레지스트리
 * 레이아웃과 구조를 담당하는 컴포넌트들
 */

import { Screen } from './containers/Screen';
import { AppBar } from './containers/AppBar';
import { VStack, HStack, ZStack } from './containers/Stack';
import { ScrollView } from './containers/ScrollView';
import { Grid } from './containers/Grid';
import { Container } from './containers/Container';
import { SafeArea } from './containers/SafeArea';

import type { ComponentRegistry } from '@sdui/core';

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
