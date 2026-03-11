-- Kerbborsche Bräischboch e.V. — Database Schema

-- Site-wide settings
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  date_start date,
  date_end date,
  description text,
  hero_image text,
  poster_image text,
  location_name text,
  location_address text,
  pretix_organizer text,
  pretix_event_slug text,
  countdown_target timestamptz,
  is_featured boolean DEFAULT false,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event timeline items
CREATE TABLE IF NOT EXISTS event_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  day_label text NOT NULL,
  title text NOT NULL,
  description text,
  time_info text,
  sort_order int DEFAULT 0
);

-- Board members
CREATE TABLE IF NOT EXISTS board_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  name text NOT NULL,
  initials text NOT NULL,
  photo_url text,
  elected_since text,
  sort_order int DEFAULT 0,
  active boolean DEFAULT true
);

-- Gallery photos
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text,
  year int,
  category text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- CMS-editable pages (events, jugendfoerderung, gemeinschaftsarbeit)
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  hero_image text,
  content text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Downloads / PDFs
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  sort_order int DEFAULT 0
);

-- Homepage content
CREATE TABLE IF NOT EXISTS homepage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_badge text DEFAULT 'Seit 2007 in Brensbach',
  hero_title text DEFAULT 'Gurre g''soat zur Bräischbocher Kerb.',
  hero_subtitle text DEFAULT 'Kerbtraditionen, Events, Jugendförderung und mehr — für unser Dorf.',
  hero_image text DEFAULT '/assets/images/pic02.jpg',
  callout_badge text DEFAULT 'Save the Date',
  callout_title text DEFAULT 'Bräischbocher Kerb 2025',
  callout_text text DEFAULT '29. August – 2. September 2025. Feiert mit uns die Bräischbocher Kerb!',
  callout_link text DEFAULT '/kerb',
  updated_at timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read event_timeline" ON event_timeline FOR SELECT USING (true);
CREATE POLICY "Public read board_members" ON board_members FOR SELECT USING (true);
CREATE POLICY "Public read gallery_photos" ON gallery_photos FOR SELECT USING (true);
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Public read downloads" ON downloads FOR SELECT USING (true);
CREATE POLICY "Public read homepage" ON homepage FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Admin write settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write event_timeline" ON event_timeline FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write board_members" ON board_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write gallery_photos" ON gallery_photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write downloads" ON downloads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write homepage" ON homepage FOR ALL USING (auth.role() = 'authenticated');

-- Seed data: default settings
INSERT INTO settings (key, value) VALUES
  ('facebook_url', 'https://www.facebook.com/gurregsoat/'),
  ('instagram_url', 'https://www.instagram.com/kerbborsche_braeischboch'),
  ('youtube_url', 'https://www.youtube.com/@kerbborschebraischboche.v.4891'),
  ('spotify_playlist', 'https://open.spotify.com/playlist/5pDSWXd1vFvZVyAqCkBYAi'),
  ('spotify_embed', 'https://open.spotify.com/embed/playlist/5pDSWXd1vFvZVyAqCkBYAi?utm_source=generator&theme=0'),
  ('formspree_id', 'DEINE-ID'),
  ('contact_email', 'kontakt@kerbborsche-braeischboch.de')
ON CONFLICT (key) DO NOTHING;

-- Seed data: homepage
INSERT INTO homepage (hero_badge, hero_title, hero_subtitle, hero_image, callout_badge, callout_title, callout_text, callout_link)
VALUES (
  'Seit 2007 in Brensbach',
  'Gurre g''soat zur Bräischbocher Kerb.',
  'Kerbtraditionen, Events, Jugendförderung und mehr — für unser Dorf.',
  '/assets/images/pic02.jpg',
  'Save the Date',
  'Bräischbocher Kerb 2025',
  '29. August – 2. September 2025. Feiert mit uns die Bräischbocher Kerb!',
  '/kerb'
);

-- Seed data: board members
INSERT INTO board_members (role, name, initials, sort_order) VALUES
  ('1. Vorsitzender', 'Till Nürnberger', 'TN', 0),
  ('2. Vorsitzende', 'Lara Hammer', 'LH', 1),
  ('Rechner', 'Nick Friedrich', 'NF', 2),
  ('Schriftführerin', 'Nina Buxmann', 'NB', 3),
  ('Beisitzer: Vereinsheim', 'Nico Piccione', 'NP', 4),
  ('Beisitzer: Kassenprüfung', 'Jonas Wolf', 'JW', 5);

-- Seed data: CMS pages
INSERT INTO pages (slug, title, subtitle, hero_image, content) VALUES
  ('events', 'Events', 'Feste, Partys und mehr — wir bringen Brensbach zusammen.', '/assets/images/pic09.jpg',
   '<p>Neben der jährlichen Kerb organisieren wir regelmäßig Veranstaltungen für die ganze Gemeinde. Von Public Viewings über Sommerfeste bis hin zu Themenpartys — bei uns ist immer was los.</p><h3>Was wir veranstalten</h3><ul><li>Sommerfeste und Grillabende</li><li>Public Viewings bei großen Sportereignissen</li><li>Themenpartys und Clubnights</li><li>Gemeinschaftliche Dorffeste</li></ul><h3>Nächste Veranstaltungen</h3><p>Aktuelle Termine findet ihr auf unseren Social-Media-Kanälen.</p>'),
  ('jugendfoerderung', 'Jugendförderung', 'Wir geben jungen Menschen eine Plattform.', '/assets/images/pic08.jpg',
   '<p>Als Kerbverein liegt uns die Jugend besonders am Herzen. Wir bieten jungen Menschen aus Brensbach und Umgebung die Möglichkeit, sich aktiv in die Dorfgemeinschaft einzubringen und Verantwortung zu übernehmen.</p><h3>Was wir bieten</h3><ul><li>Einbindung in die Organisation der Kerb und anderer Events</li><li>Gemeinschaftliche Aktivitäten und Ausflüge</li><li>Übernahme von Verantwortung im Vereinsleben</li><li>Teil einer gewachsenen Gemeinschaft werden</li></ul>'),
  ('gemeinschaftsarbeit', 'Gemeinschaftsarbeit', 'Gemeinsam anpacken — für Brensbach und unsere Gemeinschaft.', '/assets/images/pic07.jpg',
   '<p>Als Verein übernehmen wir Verantwortung für unseren Ort. Ob Arbeitseinsätze, Pflege des Vereinsheims oder Unterstützung bei Dorffesten — wir packen gemeinsam an.</p><h3>Unsere Einsätze</h3><ul><li>Pflege und Instandhaltung des Vereinsheims</li><li>Aufbau und Abbau bei Veranstaltungen</li><li>Unterstützung bei Dorffesten und Gemeindeaktionen</li><li>Gemeinschaftliche Arbeitseinsätze</li></ul>');

-- Seed data: Kerb 2025 event
INSERT INTO events (slug, title, subtitle, date_start, date_end, description, hero_image, poster_image, location_name, location_address, is_featured, published) VALUES
  ('kerb-2025', 'Bräischbocher Kerb 2025', '29. Aug – 2. Sep 2025', '2025-08-29', '2025-09-02',
   'Feiert mit uns die Bräischbocher Kerb — Musik, Essen und gute Laune in Brensbach.',
   '/assets/images/pic02.jpg', '/assets/images/pic06.jpg',
   'Ehemaliger Schützenverein-Hof', 'Waldstraße 83, 64395 Brensbach',
   true, true);

-- Seed timeline for Kerb 2025
INSERT INTO event_timeline (event_id, day_label, title, description, time_info, sort_order)
SELECT id, 'Freitag 29. Aug', 'Clubnight mit DJ Jey Aux Platines', 'Techno & elektronische Beats. Ein Heppenheimer, seit über einem Jahrzehnt in der Szene aktiv.', 'Einlass: 21:30 Uhr', 0
FROM events WHERE slug = 'kerb-2025';

INSERT INTO event_timeline (event_id, day_label, title, description, time_info, sort_order)
SELECT id, 'Samstag 30. Aug', 'Party Night mit DJ Da Silva', 'Einer der bekanntesten DJs im Raum Frankfurt-Darmstadt seit 1993. Mix aus Schlagern, 90er-2000er Hits und Partymusik.', 'Einlass: 20:00 Uhr', 1
FROM events WHERE slug = 'kerb-2025';

INSERT INTO event_timeline (event_id, day_label, title, description, time_info, sort_order)
SELECT id, 'Essen', 'Häbbschjemacherei', 'Zum ersten Mal dabei: eine lokale Essensstation direkt am Veranstaltungsort.', NULL, 2
FROM events WHERE slug = 'kerb-2025';
