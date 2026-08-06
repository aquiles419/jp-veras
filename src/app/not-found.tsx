import { ArrowLeft, Frown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center text-text">
      <div className="animate-rise flex max-w-md flex-col items-center">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-surface bg-surface-alt">
          <Image
            src="/jpverastech-logo.jpg"
            alt="JP Veras Tech"
            width={654}
            height={640}
            className="h-full w-full rounded-full object-cover opacity-40 grayscale"
          />
          <div className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg bg-discount-bg text-discount-text">
            <Frown size={16} strokeWidth={2.4} />
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-faint">Erro 404</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight text-text md:text-3xl">
          Essa oferta já saiu do estoque
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-text-soft">
          Ela pode ter expirado, o link mudou, ou a promoção acabou. Mas a vitrine tem ofertas
          novas todos os dias.
        </p>

        <Link
          href="/"
          className="mt-7 flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-body text-sm font-bold text-black transition hover:opacity-90"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
          Voltar para a vitrine
        </Link>
      </div>
    </main>
  );
}
