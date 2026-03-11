export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  date_start: string | null;
  date_end: string | null;
  description: string | null;
  hero_image: string | null;
  poster_image: string | null;
  location_name: string | null;
  location_address: string | null;
  pretix_organizer: string | null;
  pretix_event_slug: string | null;
  countdown_target: string | null;
  is_featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventTimeline {
  id: string;
  event_id: string;
  day_label: string;
  title: string;
  description: string | null;
  time_info: string | null;
  sort_order: number;
}

export interface BoardMember {
  id: string;
  role: string;
  name: string;
  initials: string;
  photo_url: string | null;
  elected_since: string | null;
  sort_order: number;
  active: boolean;
}

export interface GalleryPhoto {
  id: string;
  image_url: string;
  alt_text: string | null;
  year: number | null;
  category: string | null;
  sort_order: number;
  created_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  hero_image: string | null;
  content: string;
  updated_at: string;
}

export interface Download {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  sort_order: number;
}

export interface HomepageContent {
  id: string;
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  callout_badge: string;
  callout_title: string;
  callout_text: string;
  callout_link: string;
  updated_at: string;
}
