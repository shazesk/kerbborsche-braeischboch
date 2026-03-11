import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kerbborsche Bräischboch e.V. — Gurre g\'soat!',
    template: '%s — Kerbborsche Bräischboch e.V.',
  },
  description: 'Kerbborsche Bräischboch e.V. — Kerbtraditionen, Events, Jugendförderung und mehr seit 2007 in Brensbach.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
