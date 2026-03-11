'use client';

import { useEffect, useRef } from 'react';

interface PretixWidgetProps {
  organizer: string;
  eventSlug: string;
}

export default function PretixWidget({ organizer, eventSlug }: PretixWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!organizer || !eventSlug || !containerRef.current) return;

    // Load Pretix widget CSS
    if (!document.querySelector('link[href*="pretix.eu/widget"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://pretix.eu/widget/v1.css';
      document.head.appendChild(link);
    }

    // Create the widget element
    const widget = document.createElement('pretix-widget');
    widget.setAttribute('event', `https://pretix.eu/${organizer}/${eventSlug}/`);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(widget);

    // Load Pretix widget JS
    if (!document.querySelector('script[src*="pretix.eu/widget"]')) {
      const script = document.createElement('script');
      script.src = 'https://pretix.eu/widget/v1.en.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [organizer, eventSlug]);

  if (!organizer || !eventSlug) {
    return (
      <div className="ticket-embed">
        <p>Ticket-Verkauf wird bald verfügbar sein.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="ticket-embed"
      style={{ border: 'none', background: 'transparent', padding: 0 }}
    />
  );
}
