"use client"
import { useEffect, useRef, useState } from 'react';

interface Shown {
  src: string;
  alt: string;
  caption?: string;
}

// opens any image inside .zoomable fullscreen on click, so the markdown needs no changes
const ImageLightbox = () => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [ shown, setShown ] = useState<Shown | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest('.zoomable img');
      // images wrapped in links (e.g. README badges) keep their link
      if (!(img instanceof HTMLImageElement) || img.closest('a')) {
        return;
      }
      setShown({
        src: img.currentSrc || img.src,
        alt: img.alt,
        caption: img.closest('figure')?.querySelector('figcaption')?.textContent ?? undefined,
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (shown && !dialog.current?.open) {
      dialog.current?.showModal();
      document.documentElement.classList.add('lightbox-open');
    }
  }, [shown]);

  const close = () => dialog.current?.close();

  return (
    <dialog ref={dialog} className="lightbox" onClick={close}
      onClose={() => {
        setShown(null);
        document.documentElement.classList.remove('lightbox-open');
      }}>
      {shown && <>
        <img src={shown.src} alt={shown.alt} />
        {shown.caption && <p>{shown.caption}</p>}
      </>}
    </dialog>
  );
}

export default ImageLightbox;
