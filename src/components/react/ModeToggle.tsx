import { useEffect, useState } from 'react';
import { ComputerIcon, MoonIcon, SunIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const [theme, setThemeState] = useState<'theme-light' | 'dark' | 'system'>('theme-light');

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setThemeState(isDarkMode ? 'dark' : 'theme-light');
  }, []);

  useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <HugeiconsIcon
            icon={SunIcon}
            strokeWidth={2}
            className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
          <HugeiconsIcon
            icon={MoonIcon}
            strokeWidth={2}
            className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeState('theme-light')}>
          <HugeiconsIcon icon={SunIcon} strokeWidth={2} />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('dark')}>
          <HugeiconsIcon icon={MoonIcon} strokeWidth={2} />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('system')}>
          <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
