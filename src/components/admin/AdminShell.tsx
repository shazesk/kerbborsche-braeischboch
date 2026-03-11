'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◻' },
  { href: '/admin/homepage', label: 'Startseite', icon: '⌂' },
  { href: '/admin/events', label: 'Events', icon: '◈' },
  { href: '/admin/gallery', label: 'Galerie', icon: '▦' },
  { href: '/admin/board', label: 'Vorstand', icon: '◉' },
  { href: '/admin/pages', label: 'Seiten', icon: '▤' },
  { href: '/admin/downloads', label: 'Downloads', icon: '↓' },
  { href: '/admin/settings', label: 'Einstellungen', icon: '⚙' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar-brand">
          <Image src="/assets/images/logo.png" alt="Wappen" width={32} height={32} />
          <span>Admin</span>
        </Link>

        <div className="admin-sidebar-label">Inhalt</div>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              <span className="admin-sidebar-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-label" style={{ marginTop: 'auto' }}>Konto</div>
        <nav>
          <Link href="/" target="_blank">
            <span className="admin-sidebar-icon">↗</span>
            Website ansehen
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--s3)',
              padding: 'var(--s3) var(--s5)', color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
              background: 'none', border: 'none', cursor: 'pointer', width: '100%',
              borderLeft: '3px solid transparent', transition: 'all var(--transition)',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--coral)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
          >
            <span className="admin-sidebar-icon">⏻</span>
            Abmelden
          </button>
        </nav>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
