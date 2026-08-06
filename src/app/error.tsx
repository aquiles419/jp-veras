'use client';

import { RefreshCw, TriangleAlert } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center text-text">
      <div className="animate-rise flex max-w-md flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-discount-bg text-discount-text">
          <TriangleAlert size={26} strokeWidth={2.2} />
        </div>

        <h1 className="mt-5 font-display text-xl font-extrabold leading-tight text-text md:text-2xl">
          As ofertas não carregaram
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-text-soft">
          Tivemos um problema para buscar as promoções agora. Tente novamente em alguns
          segundos.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-7 flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-body text-sm font-bold text-black transition hover:opacity-90"
        >
          <RefreshCw size={16} strokeWidth={2.4} />
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
