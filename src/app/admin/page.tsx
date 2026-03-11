'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ events: 0, gallery: 0, board: 0, pages: 0 });

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }

      // Fetch stats
      const [eventsRes, galleryRes, boardRes, pagesRes] = await Promise.all([
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_photos').select('id', { count: 'exact', head: true }),
        supabase.from('board_members').select('id', { count: 'exact', head: true }),
        supabase.from('pages').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        events: eventsRes.count || 0,
        gallery: galleryRes.count || 0,
        board: boardRes.count || 0,
        pages: pagesRes.count || 0,
      });
      setLoading(false);
    }
    init();
  }, [router]);

  if (loading) {
    return (
      <AdminShell>
        <div className="admin-header"><h1>Laden...</h1></div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Events</div>
          <div className="admin-stat-value coral">{stats.events}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Galerie-Fotos</div>
          <div className="admin-stat-value accent">{stats.gallery}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Vorstandsmitglieder</div>
          <div className="admin-stat-value">{stats.board}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Seiten</div>
          <div className="admin-stat-value">{stats.pages}</div>
        </div>
      </div>

      <div className="admin-quick-actions">
        <Link href="/admin/events" className="admin-quick-action">
          <span className="admin-quick-action-icon">◈</span>
          <span>Events verwalten</span>
        </Link>
        <Link href="/admin/gallery" className="admin-quick-action">
          <span className="admin-quick-action-icon">▦</span>
          <span>Fotos hochladen</span>
        </Link>
        <Link href="/admin/board" className="admin-quick-action">
          <span className="admin-quick-action-icon">◉</span>
          <span>Vorstand bearbeiten</span>
        </Link>
      </div>
    </AdminShell>
  );
}
