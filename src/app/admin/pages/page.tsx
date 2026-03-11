'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import Toast from '@/components/admin/Toast';
import type { Page } from '@/lib/types';

export default function AdminPagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data } = await supabase.from('pages').select('*').order('slug');
    setPages(data || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!editing) return;
    const supabase = createClient();
    await supabase.from('pages').update({
      title: editing.title,
      subtitle: editing.subtitle,
      hero_image: editing.hero_image,
      content: editing.content,
    }).eq('id', editing.id);
    setEditing(null);
    setToast('Seite gespeichert!');
    load();
  }

  if (loading) return <AdminShell><div className="admin-header"><h1>Laden...</h1></div></AdminShell>;

  if (editing) {
    return (
      <AdminShell>
        <div className="admin-header">
          <h1>Seite bearbeiten: {editing.slug}</h1>
          <div className="admin-header-actions">
            <button className="btn btn-ghost" onClick={() => setEditing(null)}>Abbrechen</button>
            <button className="btn btn-primary" onClick={save}>Speichern →</button>
          </div>
        </div>
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Titel</label>
              <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Untertitel</label>
              <input value={editing.subtitle || ''} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Hero-Bild URL</label>
            <input value={editing.hero_image || ''} onChange={e => setEditing({ ...editing, hero_image: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Inhalt (HTML / Markdown)</label>
            <textarea
              value={editing.content}
              onChange={e => setEditing({ ...editing, content: e.target.value })}
              style={{ minHeight: 300, fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Seiten</h1>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Slug</th>
              <th>Titel</th>
              <th>Zuletzt bearbeitet</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 'var(--s8)' }}>Keine editierbaren Seiten vorhanden.</td></tr>
            ) : pages.map(page => (
              <tr key={page.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>/{page.slug}</td>
                <td style={{ color: 'var(--white)', fontWeight: 600 }}>{page.title}</td>
                <td>{new Date(page.updated_at).toLocaleDateString('de-DE')}</td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => setEditing(page)}>Bearbeiten</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toast message={toast} show={!!toast} onHide={() => setToast('')} />
    </AdminShell>
  );
}
