'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import Toast from '@/components/admin/Toast';
import type { Download } from '@/lib/types';

export default function AdminDownloadsPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [editing, setEditing] = useState<Partial<Download> | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data } = await supabase.from('downloads').select('*').order('sort_order');
    setDownloads(data || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function handleUpload(file: File | null) {
    if (!file || !editing) return;
    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name}`;
    await supabase.storage.from('downloads').upload(fileName, file);
    const { data: { publicUrl } } = supabase.storage.from('downloads').getPublicUrl(fileName);
    setEditing({ ...editing, file_url: publicUrl });
    setToast('Datei hochgeladen!');
  }

  async function save() {
    if (!editing) return;
    const supabase = createClient();
    if (editing.id) {
      await supabase.from('downloads').update(editing).eq('id', editing.id);
    } else {
      await supabase.from('downloads').insert({ ...editing, sort_order: downloads.length });
    }
    setEditing(null);
    setToast('Download gespeichert!');
    load();
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from('downloads').delete().eq('id', id);
    setToast('Download gelöscht!');
    load();
  }

  if (loading) return <AdminShell><div className="admin-header"><h1>Laden...</h1></div></AdminShell>;

  if (editing) {
    return (
      <AdminShell>
        <div className="admin-header">
          <h1>{editing.id ? 'Download bearbeiten' : 'Neuer Download'}</h1>
          <div className="admin-header-actions">
            <button className="btn btn-ghost" onClick={() => setEditing(null)}>Abbrechen</button>
            <button className="btn btn-primary" onClick={save}>Speichern →</button>
          </div>
        </div>
        <div className="admin-form">
          <div className="admin-form-group">
            <label>Titel</label>
            <input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="z.B. Vereinssatzung" />
          </div>
          <div className="admin-form-group">
            <label>Beschreibung</label>
            <input value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Datei URL</label>
            <input value={editing.file_url || ''} onChange={e => setEditing({ ...editing, file_url: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Oder PDF hochladen</label>
            <input ref={fileRef} type="file" accept=".pdf" onChange={e => handleUpload(e.target.files?.[0] || null)} style={{ background: 'transparent', border: 'none', color: 'var(--white)' }} />
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Downloads ({downloads.length})</h1>
        <button className="btn btn-primary" onClick={() => setEditing({ title: '', description: '', file_url: '' })}>+ Neuer Download</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Beschreibung</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {downloads.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: 'var(--s8)' }}>Noch keine Downloads angelegt.</td></tr>
            ) : downloads.map(dl => (
              <tr key={dl.id}>
                <td style={{ color: 'var(--white)', fontWeight: 600 }}>{dl.title}</td>
                <td>{dl.description || '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--s2)' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setEditing(dl)}>Bearbeiten</button>
                    <button className="btn btn-outline btn-sm" style={{ color: 'var(--coral)', borderColor: 'var(--coral)' }} onClick={() => remove(dl.id)}>Löschen</button>
                  </div>
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
