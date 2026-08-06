'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type CouponButtonProps = {
  code: string;
};

export function CouponButton({ code }: CouponButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`flex w-full items-center justify-between rounded-[9px] border-[1.5px] border-dashed px-3 py-2.5 transition-colors ${
        copied ? 'border-price bg-price/10' : 'border-accent/50 bg-surface hover:border-accent'
      }`}
    >
      <span className="font-display text-[13.5px] font-extrabold tracking-[0.03em] text-text">
        {code}
      </span>
      <span
        className={`flex items-center gap-1 text-xs font-bold ${copied ? 'text-price' : 'text-accent'}`}
      >
        {copied ? (
          <>
            <Check size={13} strokeWidth={2.6} />
            Copiado!
          </>
        ) : (
          <>
            <Copy size={13} strokeWidth={2.2} />
            Copiar
          </>
        )}
      </span>
    </button>
  );
}
