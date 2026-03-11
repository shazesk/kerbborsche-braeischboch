'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import Toast from '@/components/admin/Toast';

interface Setting {
  key: string;
  value: string;
  label: string;
  placeholder: string;
}

const settingsDef: Setting[] = [
  { key: 'facebook_url', value: '', label: 'Facebook URL', placeholder: 'https://www.facebook.com/gurregsoat/' },
  { key: 'instagram_url', value: '', label: 'Instagram URL', placeholder: 'https://www.instagram.com/kerbborsche_braeischboch' },
  { key: 'youtube_url', value: '', label: 'YouTube URL', placeholder: 'https://www.youtube.com/@kerbborschebraischboche.v.4891' },
  { key: 'spotify_playlist', value: '', label: 'Spotify Playlist URL', placeholder: 'https://open.spotify.com/playlist/...' },
  { key: 'spotify_embed', value: '', label: 'Spotify Embed URL', placeholder: 'https://open.spotify.com/embed/playlist/...' },
  { key: 'formspree_id', value: '', label: 'Formspree ID', placeholder: 'z.B. xyzabcde' },
  { key: 'contact_email', value: '', label: 'Kontakt E-Mail', placeholder: 'kontakt@kerbborsche-braeischboch.de' },
];

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Setting[]>(settingsDef);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data } = await supabase.from('settings').select('*');
    if (data) {
      setSettings(prev => prev.map(s => {
        const found = data.find((d: { key: string; value: string }) => d.key === s.key);
        return found ? { ...s, value: found.value } : s;
      }));
    }
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    const supabase = createClient();
    for (const setting of settings) {
      await supabase.from('settings').upsert(
        { key: setting.key, value: setting.value, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      );
    }
    setToast('Einstellungen gespeichert!');
  }

  if (loading) return <AdminShell><div className="admin-header"><h1>Laden...</h1></div></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Einstellungen</h1>
        <button className="btn btn-primary" onClick={save}>Speichern →</button>
      </div>

      <div className="admin-form">
        <h3 style={{ color: 'var(--white)', marginBottom: 'var(--s5)' }}>Social Media</h3>
        {settings.filter(s => ['facebook_url', 'instagram_url', 'youtube_url', 'spotify_playlist', 'spotify_embed'].includes(s.key)).map((s, i) => (
          <div className="admin-form-group" key={s.key}>
            <label>{s.label}</label>
            <input
              value={s.value}
              placeholder={s.placeholder}
              onChange={e => {
                const updated = [...settings];
                const idx = updated.findIndex(u => u.key === s.key);
                updated[idx] = { ...updated[idx], value: e.target.value };
                setSettings(updated);
              }}
            />
          </div>
        ))}

        <h3 style={{ color: 'var(--white)', margin: 'var(--s7) 0 var(--s5)' }}>Kontakt & Formulare</h3>
        {settings.filter(s => ['formspree_id', 'contact_email'].includes(s.key)).map((s) => (
          <div className="admin-form-group" key={s.key}>
            <label>{s.label}</label>
            <input
              value={s.value}
              placeholder={s.placeholder}
              onChange={e => {
                const updated = [...settings];
                const idx = updated.findIndex(u => u.key === s.key);
                updated[idx] = { ...updated[idx], value: e.target.value };
                setSettings(updated);
              }}
            />
          </div>
        ))}
      </div>

      <Toast message={toast} show={!!toast} onHide={() => setToast('')} />
    </AdminShell>
  );
}
