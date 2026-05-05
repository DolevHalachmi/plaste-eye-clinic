import { useEffect, useState } from 'react';

const initialForm = {
  username: '',
  password: '',
};

// Reads JSON safely even when the backend responds with no content.
async function readJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

// Handles the admin login screen and keeps the clinic session alive after refresh.
export default function Clinic() {
  const [form, setForm] = useState(initialForm);
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: '', message: '' });

  // Restores an existing admin session when the page first opens.
  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch('/api/admin/auth/session', {
          credentials: 'include',
        });
        const data = await readJson(response);

        if (response.ok) {
          setAdmin(data.admin);
          setStatus({ loading: false, error: '', message: data.message ?? '' });
          return;
        }

        setAdmin(null);
        setStatus({ loading: false, error: '', message: '' });
      } catch {
        setStatus({
          loading: false,
          error: 'לא ניתן להתחבר כרגע לשרת הניהול. ודאו שהשרת פועל ונסו שוב.',
          message: '',
        });
      }
    };

    loadSession();
  }, []);

  // Updates the login form state as the admin types.
  const handleChange = ({ target }) => {
    setForm((current) => ({
      ...current,
      [target.name]: target.value,
    }));
  };

  // Sends the login request and stores the returned admin session in state.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', message: '' });

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await readJson(response);

      if (!response.ok) {
        setAdmin(null);
        setStatus({
          loading: false,
          error: data.message ?? 'שם המשתמש או הסיסמה שגויים.',
          message: '',
        });
        return;
      }

      setAdmin(data.admin);
      setForm(initialForm);
      setStatus({
        loading: false,
        error: '',
        message: 'התחברת בהצלחה לאזור הניהול.',
      });
    } catch {
      setStatus({
        loading: false,
        error: 'החיבור לשרת נכשל. נסו שוב בעוד רגע.',
        message: '',
      });
    }
  };

  // Ends the admin session both on the server and in the local UI.
  const handleLogout = async () => {
    setStatus({ loading: true, error: '', message: '' });

    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setAdmin(null);
      setStatus({
        loading: false,
        error: '',
        message: 'התנתקת מאזור הניהול.',
      });
    }
  };

  return (
    <section className="clinic-page">
      <div className="clinic-shell">
        <div className="clinic-intro">
          <span className="section-tag">ניהול המרפאה</span>
          <h1>כניסת מנהל</h1>
          <p>
            האזור הזה מיועד להתחברות של צוות הניהול. אחרי ההתחברות אפשר להרחיב
            אותו לטפסים פנימיים, תכנים מאובטחים, וקישורים לניהול המרפאה.
          </p>
        </div>

        <div className="clinic-card content-card">
          {admin ? (
            <div className="clinic-admin-state">
              <h2>שלום, {admin.displayName}</h2>
              <p>
                התחברת בתור <strong>{admin.username}</strong>. כרגע הלוגיקה
                מחוברת לשרת ולמסד הנתונים, כך שאפשר להתחיל להוסיף כאן כלי ניהול
                אמיתיים.
              </p>
              <div className="clinic-actions">
                <button type="button" className="clinic-button secondary" onClick={handleLogout}>
                  התנתקות
                </button>
              </div>
            </div>
          ) : (
            <form className="clinic-form" onSubmit={handleSubmit}>
              <label className="clinic-field">
                <span>שם משתמש</span>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </label>

              <label className="clinic-field">
                <span>סיסמה</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </label>

              <button type="submit" className="clinic-button" disabled={status.loading}>
                {status.loading ? 'מתחבר...' : 'התחברות'}
              </button>
            </form>
          )}

          {status.error ? <p className="clinic-feedback error">{status.error}</p> : null}
          {!status.error && status.message ? <p className="clinic-feedback success">{status.message}</p> : null}
        </div>
      </div>
    </section>
  );
}
