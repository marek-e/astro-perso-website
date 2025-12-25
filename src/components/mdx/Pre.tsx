import { useState, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../react/Icon';
import { Check, Copy01Icon } from '@hugeicons/core-free-icons';

interface PreProps {
  children: ReactNode;
  className?: string;
  'data-language'?: string;
}

export function Pre({ children, className, 'data-language': language, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const code = preRef.current?.textContent ?? '';
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group border-border relative my-6 overflow-hidden rounded-lg border">
      {language && (
        <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre
          ref={preRef}
          className={cn('overflow-x-auto p-4 text-sm leading-relaxed', className)}
          {...props}
        >
          {children}
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            'border-border bg-background/80 text-muted-foreground absolute top-3 right-3 z-10 cursor-pointer rounded-md border p-2 backdrop-blur-sm',
            'opacity-0 group-hover:opacity-100 motion-safe:transition-opacity',
            'hover:bg-muted hover:text-foreground',
            'focus:ring-ring focus:opacity-100 focus:ring-2 focus:outline-none'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Icon icon={Check} strokeWidth={2} className="size-4" />
          ) : (
            <Icon icon={Copy01Icon} strokeWidth={2} className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
