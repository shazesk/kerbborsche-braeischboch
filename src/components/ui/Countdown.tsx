'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    function update() {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) {
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (expired) {
    return <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--coral)' }}>Das Jubiläum hat begonnen!</p>;
  }

  return (
    <div className="countdown">
      <div className="countdown-item"><span className="countdown-number">{timeLeft.days}</span><span className="countdown-label">Tage</span></div>
      <div className="countdown-item"><span className="countdown-number">{timeLeft.hours}</span><span className="countdown-label">Stunden</span></div>
      <div className="countdown-item"><span className="countdown-number">{timeLeft.minutes}</span><span className="countdown-label">Minuten</span></div>
      <div className="countdown-item"><span className="countdown-number">{timeLeft.seconds}</span><span className="countdown-label">Sekunden</span></div>
    </div>
  );
}
