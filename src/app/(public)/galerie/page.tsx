import type { Metadata } from 'next';
import GalleryGrid from '@/components/ui/GalleryGrid';

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Fotos und Impressionen von vergangenen Kerben und Events.',
};

const photos = [
  { src: '/assets/images/pic01.jpg', alt: 'Kerbfreitag 2024', year: 2024 },
  { src: '/assets/images/pic02.jpg', alt: 'Kerbsamstag 2024', year: 2024 },
  { src: '/assets/images/pic03.jpg', alt: 'Kerbsonntag 2024', year: 2024 },
  { src: '/assets/images/pic04.jpg', alt: 'Kerb 2023', year: 2023 },
  { src: '/assets/images/pic05.jpg', alt: 'Fest 2023', year: 2023 },
  { src: '/assets/images/pic07.jpg', alt: 'Gemeinschaftsarbeit 2022', year: 2022 },
  { src: '/assets/images/pic08.jpg', alt: 'Kerb 2022', year: 2022 },
  { src: '/assets/images/pic09.jpg', alt: 'Events 2021', year: 2021 },
];

const years = [2024, 2023, 2022, 2021];

export default function GaleriePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: "url('/assets/images/pic03.jpg')" }}>
        <div className="hero-content">
          <h1>Galerie</h1>
          <p>Impressionen aus über 17 Jahren Kerbborsche</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Fotos</span>
            <h2>Unsere besten Momente</h2>
          </div>
          <GalleryGrid photos={photos} years={years} />
        </div>
      </section>
    </>
  );
}
