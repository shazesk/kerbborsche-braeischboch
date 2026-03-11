'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import Toast from '@/components/admin/Toast';
import type { BoardMember } from '@/lib/types';

const emptyMember: Partial<BoardMember> = {
  role: '', name: '', initials: '', photo_url: '', elected_since: '', sort_order: 0, active: true,
};

export default function AdminBoardPage() {
  const router = useRouter();
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [editing, setEditing] = useState<Partial<BoardMember> | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data } = await supabase.from('board_members').select('*').order('sort_order');
    setMembers(data || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    const supabase = createClient();
    if (editing?.id) {
      await supabase.from('board_members').update(editing).eq('id', editing.id);
    } else {
      await supabase.from('board_members').insert({ ...editing, sort_order: members.length });
    }
    setEditing(null);
    setToast('Mitglied gespeichert!');
    load();
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from('board_members').delete().eq('id', id);
    setToast('Mitglied gelöscht!');
    load();
  }

  if (loading) return <AdminShell><div className="admin-header"><h1>Laden...</h1></div></AdminShell>;

  if (editing) {
    return (
      <AdminShell>
        <div className="admin-header">
          <h1>{editing.id ? 'Mitglied bearbeiten' : 'Neues Mitglied'}</h1>
          <div className="admin-header-actions">
            <button className="btn btn-ghost" onClick={() => setEditing(null)}>Abbrechen</button>
            <button className="btn btn-primary" onClick={save}>Speichern →</button>
          </div>
        </div>
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Name</label>
              <input value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Initialen</label>
              <input value={editing.initials || ''} onChange={e => setEditing({ ...editing, initials: e.target.value })} placeholder="z.B. TN" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Rolle / Amt</label>
              <input value={editing.role || ''} onChange={e => setEditing({ ...editing, role: e.target.value })} placeholder="z.B. 1. Vorsitzender" />
            </div>
            <div className="admin-form-group">
              <label>Gewählt seit</label>
              <input value={editing.elected_since || ''} onChange={e => setEditing({ ...editing, elected_since: e.target.value })} placeholder="z.B. Gewählt seit 08.02.2025" />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Foto URL (optional)</label>
            <input value={editing.photo_url || ''} onChange={e => setEditing({ ...editing, photo_url: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
              <input type="checkbox" checked={editing.active !== false} onChange={e => setEditing({ ...editing, active: e.target.checked })} style={{ width: 'auto' }} />
              Aktives Mitglied
            </label>
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Vorstand ({members.length})</h1>
        <button className="btn btn-primary" onClick={() => setEditing({ ...emptyMember })}>+ Neues Mitglied</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Initialen</th>
              <th>Name</th>
              <th>Rolle</th>
              <th>Status</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--s8)' }}>Noch keine Vorstandsmitglieder angelegt.</td></tr>
            ) : members.map(m => (
              <tr key={m.id}>
                <td>
                  <div className="board-avatar" style={{ width: 36, height: 36, fontSize: '0.75rem', margin: 0 }}>{m.initials}</div>
                </td>
                <td style={{ color: 'var(--white)', fontWeight: 600 }}>{m.name}</td>
                <td>{m.role}</td>
                <td><span className={`admin-badge ${m.active ? 'published' : 'draft'}`}>{m.active ? 'Aktiv' : 'Inaktiv'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--s2)' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setEditing(m)}>Bearbeiten</button>
                    <button className="btn btn-outline btn-sm" style={{ color: 'var(--coral)', borderColor: 'var(--coral)' }} onClick={() => remove(m.id)}>Löschen</button>
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
