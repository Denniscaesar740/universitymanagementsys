import React, { useMemo, useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Moon, ShieldCheck, Sparkles, Sun } from 'lucide-react';
import { useAums } from '../../context/AumsContext';
import { useTheme } from '../../context/ThemeContext';
import { DEMO_PASSWORD } from '../../data/moduleBindings';

export const LoginPage: React.FC = () => {
  const { personas, login } = useAums();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState(personas[1]?.email || '');
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const featured = useMemo(
    () =>
      personas.filter((p) =>
        ['Student', 'Lecturer', 'Registrar', 'Finance Officer / Bursar', 'System Administrator'].includes(p.role)
      ),
    [personas]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    const result = login(email.trim(), password);
    setBusy(false);
    if (!result.success) setError(result.message);
  };

  return (
    <div className="login-shell">
      <button className="icon-btn login-theme" onClick={toggleTheme} aria-label="Toggle theme" type="button">
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <section className="login-brand">
        <div className="login-brand-inner">
          <div className="login-crest">
            <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" fill="#0B3D2E" stroke="#D4AF37" strokeWidth="4" />
              <path d="M50 16 L76 34 L76 68 L50 84 L24 68 L24 34 Z" fill="#ffffff" stroke="#D4AF37" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="10" fill="#D4AF37" />
            </svg>
          </div>
          <p className="eyebrow">University of Mines and Technology</p>
          <h1>AIMS</h1>
          <p className="login-lede">
            One academic workspace. Admissions, teaching, registry, bursary and ICT run as connected modules — not separate systems.
          </p>
          <ul className="login-points">
            <li>
              <ShieldCheck size={16} /> Single campus identity · SSO-ready
            </li>
            <li>
              <Sparkles size={16} /> 40 modules live inside your role
            </li>
            <li>
              <Lock size={16} /> Role-based access · audit on every action
            </li>
          </ul>
        </div>
      </section>

      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <p className="eyebrow">Secure sign-in</p>
          <h2>Enter your campus account</h2>
          <p className="login-copy">Use your UMaT email. Demo passphrase is the same for every showcase role.</p>

          <label className="login-field">
            <span>Institutional email</span>
            <div className="login-input">
              <Mail size={16} />
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="k.mensah@st.alpha.edu.gh"
                required
              />
            </div>
          </label>

          <label className="login-field">
            <span>Passphrase</span>
            <div className="login-input">
              <Lock size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                required
              />
              <button type="button" className="text-btn" onClick={() => setShowPassword((v) => !v)} aria-label="Show password">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error && <div className="login-error">{error}</div>}

          <button className="btn btn-primary login-submit" type="submit" disabled={busy}>
            Continue to AIMS
            <ArrowRight size={16} />
          </button>

          <p className="login-hint">
            Demo passphrase <kbd>{DEMO_PASSWORD}</kbd>
          </p>
        </form>

        <div className="login-roles">
          <div className="login-roles-label">Enter as a campus role</div>
          {featured.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`login-role ${email === p.email ? 'active' : ''}`}
              onClick={() => {
                setEmail(p.email);
                setPassword(DEMO_PASSWORD);
                setError(null);
              }}
            >
              <img src={p.avatarUrl} alt="" />
              <span>
                <strong>{p.name}</strong>
                <small>{p.role}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
