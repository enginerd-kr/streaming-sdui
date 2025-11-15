'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-3 top-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2.5 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto border">
        <code className={`text-sm font-mono language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
