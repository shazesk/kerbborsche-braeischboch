'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import Toast from '@/components/admin/Toast';
import type { Event, EventTimeline } from '@/lib/types';

const emptyEvent: Partial<Event> = {
  slug: '', title: '', subtitle: '', date_start: '', date_end: '',
  description: '', hero_image: '', poster_image: '',
  location_name: '', location_address: '',
  pretix_organizer: '', pretix_event_slug: '', countdown_target: '',
  is_featured: false, published: false,
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Partial<Event> | null>(null);
  const [timeline, setTimeline] = useState<Partial<EventTimeline>[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setEvents(data || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function loadTimeline(eventId: string) {
    const supabase = createClient();
    const { data } = await supabase.from('event_timeline').select('*').eq('event_id', eventId).order('sort_order');
    setTimeline(data || []);
  }

  async function save() {
    const supabase = createClient();
    if (editing?.id) {
      await supabase.from('events').update(editing).eq('id', editing.id);
      // Save timeline
      await supabase.from('event_timeline').delete().eq('event_id', editing.id);
      if (timeline.length > 0) {
        await supabase.from('event_timeline').insert(
          timeline.map((t, i) => ({ ...t, event_id: editing.id, sort_order: i }))
        );
      }
    } else {
      const { data } = await supabase.from('events').insert(editing!).select().single();
      if (data && timeline.length > 0) {
        await supabase.from('event_timeline').insert(
          timeline.map((t, i) => ({ ...t, event_id: data.id, sort_order: i }))
        );
      }
    }
    setEditing(null);
    setTimeline([]);
    setToast('Event gespeichert!');
    load();
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from('event_timeline').delete().eq('event_id', id);
    await supabase.from('events').delete().eq('id', id);
    setToast('Event gelöscht!');
    load();
  }

  if (loading) return <AdminShell><div className="admin-header"><h1>Laden...</h1></div></AdminShell>;

  if (editing) {
    return (
      <AdminShell>
        <div className="admin-header">
          <h1>{editing.id ? 'Event bearbeiten' : 'Neues Event'}</h1>
          <div className="admin-header-actions">
            <button className="btn btn-ghost" onClick={() => { setEditing(null); setTimeline([]); }}>Abbrechen</button>
            <button className="btn btn-primary" onClick={save}>Speichern →</button>
          </div>
        </div>
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Titel</label>
              <input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Slug (URL)</label>
              <input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="z.B. kerb-2025" />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Untertitel</label>
            <input value={editing.subtitle || ''} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Startdatum</label>
              <input type="date" value={editing.date_start || ''} onChange={e => setEditing({ ...editing, date_start: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Enddatum</label>
              <input type="date" value={editing.date_end || ''} onChange={e => setEditing({ ...editing, date_end: e.target.value })} />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Beschreibung</label>
            <textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Ort</label>
              <input value={editing.location_name || ''} onChange={e => setEditing({ ...editing, location_name: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Adresse</label>
              <input value={editing.location_address || ''} onChange={e => setEditing({ ...editing, location_address: e.target.value })} />
            </div>
          </div>

          <h3 style={{ color: 'var(--white)', margin: 'var(--s6) 0 var(--s4)' }}>Pretix Ticketing</h3>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Pretix Organizer</label>
              <input value={editing.pretix_organizer || ''} onChange={e => setEditing({ ...editing, pretix_organizer: e.target.value })} placeholder="z.B. kerbborsche" />
            </div>
            <div className="admin-form-group">
              <label>Pretix Event Slug</label>
              <input value={editing.pretix_event_slug || ''} onChange={e => setEditing({ ...editing, pretix_event_slug: e.target.value })} placeholder="z.B. kerb2025" />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Hero-Bild URL</label>
              <input value={editing.hero_image || ''} onChange={e => setEditing({ ...editing, hero_image: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Poster-Bild URL</label>
              <input value={editing.poster_image || ''} onChange={e => setEditing({ ...editing, poster_image: e.target.value })} />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Countdown-Ziel (ISO Datum)</label>
            <input type="datetime-local" value={editing.countdown_target?.slice(0, 16) || ''} onChange={e => setEditing({ ...editing, countdown_target: e.target.value })} />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
                <input type="checkbox" checked={editing.is_featured || false} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} style={{ width: 'auto' }} />
                Auf Startseite anzeigen
              </label>
            </div>
            <div className="admin-form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
                <input type="checkbox" checked={editing.published || false} onChange={e => setEditing({ ...editing, published: e.target.checked })} style={{ width: 'auto' }} />
                Veröffentlicht
              </label>
            </div>
          </div>

          {/* Timeline */}
          <h3 style={{ color: 'var(--white)', margin: 'var(--s6) 0 var(--s4)' }}>Programm / Timeline</h3>
          {timeline.map((item, i) => (
            <div key={i} style={{ background: 'var(--dark-3)', padding: 'var(--s4)', borderRadius: 'var(--radius)', marginBottom: 'var(--s3)' }}>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Tag</label>
                  <input value={item.day_label || ''} onChange={e => { const t = [...timeline]; t[i] = { ...t[i], day_label: e.target.value }; setTimeline(t); }} placeholder="z.B. Freitag 29. Aug" />
                </div>
                <div className="admin-form-group">
                  <label>Titel</label>
                  <input value={item.title || ''} onChange={e => { const t = [...timeline]; t[i] = { ...t[i], title: e.target.value }; setTimeline(t); }} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Beschreibung</label>
                  <input value={item.description || ''} onChange={e => { const t = [...timeline]; t[i] = { ...t[i], description: e.target.value }; setTimeline(t); }} />
                </div>
                <div className="admin-form-group">
                  <label>Zeit-Info</label>
                  <input value={item.time_info || ''} onChange={e => { const t = [...timeline]; t[i] = { ...t[i], time_info: e.target.value }; setTimeline(t); }} placeholder="Einlass: 21:30 Uhr" />
                </div>
              </div>
              <button className="btn btn-outline btn-sm" style={{ color: 'var(--coral)', borderColor: 'var(--coral)' }} onClick={() => setTimeline(timeline.filter((_, j) => j !== i))}>Entfernen</button>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={() => setTimeline([...timeline, { day_label: '', title: '', description: '', time_info: '' }])}>
            + Programmpunkt hinzufügen
          </button>
        </div>

        <Toast message={toast} show={!!toast} onHide={() => setToast('')} />
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Events</h1>
        <button className="btn btn-primary" onClick={() => { setEditing({ ...emptyEvent }); setTimeline([]); }}>
          + Neues Event
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Datum</th>
              <th>Pretix</th>
              <th>Status</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--s8)' }}>Noch keine Events angelegt.</td></tr>
            ) : events.map(event => (
              <tr key={event.id}>
                <td style={{ color: 'var(--white)', fontWeight: 600 }}>{event.title}</td>
                <td>{event.date_start || '—'}</td>
                <td>{event.pretix_event_slug || '—'}</td>
                <td>
                  <span className={`admin-badge ${event.published ? 'published' : 'draft'}`}>
                    {event.published ? 'Live' : 'Entwurf'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--s2)' }}>
                    <button className="btn btn-outline btn-sm" onClick={async () => { setEditing(event); await loadTimeline(event.id); }}>Bearbeiten</button>
                    <button className="btn btn-outline btn-sm" style={{ color: 'var(--coral)', borderColor: 'var(--coral)' }} onClick={() => remove(event.id)}>Löschen</button>
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
