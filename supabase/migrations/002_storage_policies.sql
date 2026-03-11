-- Storage policies for gallery and downloads buckets

-- Gallery: public read
CREATE POLICY "Public read gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

-- Gallery: authenticated upload/delete
CREATE POLICY "Auth manage gallery" ON storage.objects
  FOR ALL USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Downloads: public read
CREATE POLICY "Public read downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'downloads');

-- Downloads: authenticated upload/delete
CREATE POLICY "Auth manage downloads" ON storage.objects
  FOR ALL USING (bucket_id = 'downloads' AND auth.role() = 'authenticated');
