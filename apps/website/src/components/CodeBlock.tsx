'use client';

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className = '' }: CodeBlockProps) {
  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      // Keywords
      .replace(/(import|from|const|function|return|export|default)/g, '<span class="token-keyword">$1</span>')
      // Strings
      .replace(/(['"`])(.*?)\1/g, '<span class="token-string">$1$2$1</span>')
      // Comments
      .replace(/(\/\/.*$)/gm, '<span class="token-comment">$1</span>')
      // Component names (PascalCase)
      .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="token-component">$1</span>')
      // Function names
      .replace(/\b([a-z][a-zA-Z0-9]*)\s*\(/g, '<span class="token-function">$1</span>(')
      // Variables (camelCase after const/let)
      .replace(/(const|let)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, '$1 <span class="token-variable">$2</span>');
  };

  return (
    <div className={`code-block rounded-lg p-3 md:p-4 overflow-x-auto ${className}`}>
      <pre className="text-xs md:text-sm leading-relaxed">
        <code
          className="block text-slate-50"
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    </div>
  );
}
