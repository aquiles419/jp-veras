'use client';

import { X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ImageLightboxProps = {
  src: string;
  alt: string;
};

export function ImageLightbox({ src, alt }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    setZoomed(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ampliar imagem do produto"
        className="group relative h-full w-full touch-manipulation cursor-zoom-in select-none [-webkit-touch-callout:none]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          draggable={false}
          sizes="(max-width:1024px) 100vw, 50vw"
          className="pointer-events-none select-none object-contain p-6 transition-transform duration-300 [-webkit-touch-callout:none] [-webkit-user-drag:none] group-hover:scale-105"
          unoptimized
        />
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/75 px-2.5 py-1.5 text-[11px] font-bold text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <ZoomIn size={13} strokeWidth={2.4} />
          Ampliar
        </span>
      </button>

      {open && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="animate-lightbox-fade fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} strokeWidth={2.2} />
          </button>

          <div
            className="animate-lightbox-scale relative max-h-[88vh] max-w-[92vw] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              draggable={false}
              onClick={() => setZoomed((z) => !z)}
              className={`max-h-[88vh] max-w-[92vw] touch-manipulation select-none object-contain transition-transform duration-300 ease-out [-webkit-touch-callout:none] [-webkit-user-drag:none] ${
                zoomed ? 'scale-[1.9] cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
            />
          </div>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11.5px] font-medium text-white/50">
            Toque na imagem para {zoomed ? 'reduzir' : 'ampliar'} mais
          </span>
        </div>
      )}
    </>
  );
}
