'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      // localStorage indisponível — apenas o estado em memória persiste
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title="Alternar tema"
      aria-label={isLight ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
      className="flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-[10px] bg-surface-alt text-text-soft transition-colors hover:text-accent active:scale-90"
    >
      <span key={isLight ? 'sun' : 'moon'} className="motion-safe:animate-icon-pop">
        {isLight ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
}
