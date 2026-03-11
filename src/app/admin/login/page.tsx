'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Ungültige Anmeldedaten. Bitte versuche es erneut.');
      setLoading(false);
      return;
    }

    router.push('/admin');
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <Image
          src="/assets/images/logo.png"
          alt="Kerbborsche Wappen"
          width={60}
          height={60}
          style={{ margin: '0 auto var(--s5)', filter: 'brightness(0) invert(1)', opacity: 0.8 }}
        />
        <h1>Admin Login</h1>
        <p>Kerbborsche Bräischboch e.V.</p>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="login-email">E-Mail</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="login-password">Passwort</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--s4)' }}
            disabled={loading}
          >
            {loading ? 'Anmelden...' : 'Anmelden →'}
          </button>
        </form>
      </div>
    </div>
  );
}
