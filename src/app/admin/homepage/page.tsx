'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import Toast from '@/components/admin/Toast';
import type { HomepageContent } from '@/lib/types';

export default function AdminHomepagePage() {
  const router = useRouter();
  const [content, setContent] = useState<Partial<HomepageContent>>({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data } = await supabase.from('homepage').select('*').limit(1).single();
    if (data) setContent(data);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    const supabase = createClient();
    if (content.id) {
      await supabase.from('homepage').update(content).eq('id', content.id);
    } else {
      await supabase.from('homepage').insert(content);
    }
    setToast('Startseite gespeichert!');
    load();
  }

  if (loading) return <AdminShell><div className="admin-header"><h1>Laden...</h1></div></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Startseite bearbeiten</h1>
        <button className="btn btn-primary" onClick={save}>Speichern →</button>
      </div>

      <div className="admin-form">
        <h3 style={{ color: 'var(--white)', marginBottom: 'var(--s5)' }}>Hero-Bereich</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Badge-Text</label>
            <input value={content.hero_badge || ''} onChange={e => setContent({ ...content, hero_badge: e.target.value })} placeholder="Seit 2007 in Brensbach" />
          </div>
          <div className="admin-form-group">
            <label>Hero-Bild URL</label>
            <input value={content.hero_image || ''} onChange={e => setContent({ ...content, hero_image: e.target.value })} />
          </div>
        </div>
        <div className="admin-form-group">
          <label>Überschrift</label>
          <input value={content.hero_title || ''} onChange={e => setContent({ ...content, hero_title: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Untertitel</label>
          <input value={content.hero_subtitle || ''} onChange={e => setContent({ ...content, hero_subtitle: e.target.value })} />
        </div>

        <h3 style={{ color: 'var(--white)', margin: 'var(--s7) 0 var(--s5)' }}>Callout-Bereich</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Callout Badge</label>
            <input value={content.callout_badge || ''} onChange={e => setContent({ ...content, callout_badge: e.target.value })} placeholder="Save the Date" />
          </div>
          <div className="admin-form-group">
            <label>Callout Link</label>
            <input value={content.callout_link || ''} onChange={e => setContent({ ...content, callout_link: e.target.value })} placeholder="/kerb" />
          </div>
        </div>
        <div className="admin-form-group">
          <label>Callout Titel</label>
          <input value={content.callout_title || ''} onChange={e => setContent({ ...content, callout_title: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Callout Text</label>
          <textarea value={content.callout_text || ''} onChange={e => setContent({ ...content, callout_text: e.target.value })} />
        </div>
      </div>

      <Toast message={toast} show={!!toast} onHide={() => setToast('')} />
    </AdminShell>
  );
}
