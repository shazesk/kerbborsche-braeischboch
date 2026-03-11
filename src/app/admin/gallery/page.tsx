'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import Toast from '@/components/admin/Toast';
import type { GalleryPhoto } from '@/lib/types';

export default function AdminGalleryPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [editPhoto, setEditPhoto] = useState<GalleryPhoto | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data } = await supabase.from('gallery_photos').select('*').order('sort_order');
    setPhotos(data || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('gallery').upload(fileName, file);
      if (uploadError) { console.error(uploadError); continue; }

      const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName);
      await supabase.from('gallery_photos').insert({
        image_url: publicUrl,
        alt_text: file.name.replace(/\.[^/.]+$/, ''),
        year: new Date().getFullYear(),
        sort_order: photos.length,
      });
    }

    setUploading(false);
    setToast(`${files.length} Foto(s) hochgeladen!`);
    load();
  }

  async function updatePhoto() {
    if (!editPhoto) return;
    const supabase = createClient();
    await supabase.from('gallery_photos').update({
      alt_text: editPhoto.alt_text,
      year: editPhoto.year,
      category: editPhoto.category,
    }).eq('id', editPhoto.id);
    setEditPhoto(null);
    setToast('Foto aktualisiert!');
    load();
  }

  async function removePhoto(id: string) {
    const supabase = createClient();
    await supabase.from('gallery_photos').delete().eq('id', id);
    setToast('Foto gelöscht!');
    load();
  }

  if (loading) return <AdminShell><div className="admin-header"><h1>Laden...</h1></div></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Galerie ({photos.length} Fotos)</h1>
        <button className="btn btn-primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? 'Hochladen...' : '+ Fotos hochladen'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Upload area */}
      <div
        className="admin-upload"
        style={{ marginBottom: 'var(--s6)' }}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--coral)'; }}
        onDragLeave={(e) => { e.currentTarget.style.borderColor = ''; }}
        onDrop={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = ''; handleUpload(e.dataTransfer.files); }}
      >
        <p>{uploading ? 'Fotos werden hochgeladen...' : 'Fotos hierher ziehen oder klicken zum Hochladen'}</p>
      </div>

      {/* Edit modal */}
      {editPhoto && (
        <div className="admin-form" style={{ marginBottom: 'var(--s6)' }}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Alt-Text</label>
              <input value={editPhoto.alt_text || ''} onChange={e => setEditPhoto({ ...editPhoto, alt_text: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Jahr</label>
              <input type="number" value={editPhoto.year || ''} onChange={e => setEditPhoto({ ...editPhoto, year: parseInt(e.target.value) || null })} />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Kategorie</label>
            <input value={editPhoto.category || ''} onChange={e => setEditPhoto({ ...editPhoto, category: e.target.value })} placeholder="z.B. kerb, events, gemeinschaft" />
          </div>
          <div className="admin-form-actions">
            <button className="btn btn-ghost" onClick={() => setEditPhoto(null)}>Abbrechen</button>
            <button className="btn btn-primary" onClick={updatePhoto}>Speichern</button>
          </div>
        </div>
      )}

      {/* Photo grid */}
      <div className="admin-gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="admin-gallery-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.image_url} alt={photo.alt_text || ''} />
            <div className="admin-gallery-item-overlay">
              <div style={{ display: 'flex', gap: 'var(--s2)' }}>
                <button className="btn btn-white btn-sm" onClick={() => setEditPhoto(photo)}>Bearb.</button>
                <button className="btn btn-primary btn-sm" onClick={() => removePhoto(photo.id)}>×</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 'var(--s8)' }}>
          Noch keine Fotos hochgeladen.
        </p>
      )}

      <Toast message={toast} show={!!toast} onHide={() => setToast('')} />
    </AdminShell>
  );
}
