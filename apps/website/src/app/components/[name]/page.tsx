import { componentNames } from '@/lib/component-metadata-server';
import ComponentDetailClient from './client-page';

// Generate static params for all components
export function generateStaticParams() {
  return componentNames.map((name) => ({
    name: name.toLowerCase(),
  }));
}

export default function ComponentDetailPage({ params }: { params: Promise<{ name: string }> }) {
  return <ComponentDetailClient params={params} />;
}
