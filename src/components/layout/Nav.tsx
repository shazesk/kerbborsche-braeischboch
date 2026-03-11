'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Gurre' },
  { href: '/kerb', label: 'Kerb 2025' },
  { href: '/jubilaeum', label: '20 Jahre' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/vorstand', label: 'Vorstand' },
  { href: '/galerie', label: 'Galerie' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <Image src="/assets/images/logo.png" alt="Wappen" width={38} height={38} />
          <span>Kerbborsche</span>
        </Link>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={`nav-toggle${menuOpen ? ' open' : ''}`}
          aria-label="Menü"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
