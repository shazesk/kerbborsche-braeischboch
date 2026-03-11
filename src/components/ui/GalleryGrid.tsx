'use client';

import { useState } from 'react';
import Lightbox from './Lightbox';

interface GalleryPhoto {
  src: string;
  alt: string;
  year: number | null;
}

interface GalleryGridProps {
  photos: GalleryPhoto[];
  years: number[];
}

export default function GalleryGrid({ photos, years }: GalleryGridProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const filtered = activeYear
    ? photos.filter(p => p.year === activeYear)
    : photos;

  return (
    <>
      <div className="gallery-filters">
        <button
          className={`gallery-filter${!activeYear ? ' active' : ''}`}
          onClick={() => setActiveYear(null)}
        >
          Alle
        </button>
        {years.map(year => (
          <button
            key={year}
            className={`gallery-filter${activeYear === year ? ' active' : ''}`}
            onClick={() => setActiveYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filtered.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="gallery-item"
            onClick={() => {
              const open = (window as unknown as Record<string, unknown>).__lightboxOpen as ((i: number) => void) | undefined;
              if (open) open(i);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
        ))}
      </div>

      <Lightbox images={filtered.map(p => ({ src: p.src, alt: p.alt }))} />
    </>
  );
}
