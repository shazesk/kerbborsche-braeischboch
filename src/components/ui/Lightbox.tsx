'use client';

import { useState, useEffect, useCallback } from 'react';

interface LightboxProps {
  images: { src: string; alt: string }[];
  visibleIndices?: number[];
}

export default function Lightbox({ images, visibleIndices }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeImages = visibleIndices
    ? visibleIndices.map(i => images[i])
    : images;

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback((dir: number) => {
    setCurrentIndex(prev => (prev + dir + activeImages.length) % activeImages.length);
  }, [activeImages.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, close, navigate]);

  // Expose open function globally for gallery items
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__lightboxOpen = open;
    return () => { delete (window as unknown as Record<string, unknown>).__lightboxOpen; };
  }, [open]);

  if (!isOpen) return null;

  return (
    <div className="lightbox open" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <button className="lightbox-close" aria-label="Schließen" onClick={close}>&times;</button>
      <button className="lightbox-nav lightbox-prev" aria-label="Vorheriges Bild" onClick={() => navigate(-1)}>&#8249;</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={activeImages[currentIndex]?.src} alt={activeImages[currentIndex]?.alt || 'Galerie-Bild'} />
      <button className="lightbox-nav lightbox-next" aria-label="Nächstes Bild" onClick={() => navigate(1)}>&#8250;</button>
    </div>
  );
}
