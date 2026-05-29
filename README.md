# Dr. Halachmi Clinic — Full-Stack Web Application

A production full-stack web application built for a real medical clinic in Israel.
Covers public clinic pages, a bilingual Hebrew/English Q&A blog, and a secure admin
dashboard — deployed and actively serving real visitors.

**[🌐 Live Demo → dr-halachmi.com](https://dr-halachmi.com)**

> Built by **Dolev Halachmi** as a first full-stack project — learning React, Spring Boot,
> PostgreSQL, and cloud deployment from scratch.

---

![App screenshot](image.png)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8 |
| Backend | Spring Boot 4.0, Java 21 |
| Database | PostgreSQL 16 (Neon serverless) |
| Email | Resend API |
| Frontend hosting | Vercel |
| Backend hosting | Render |
| Uptime monitoring | UptimeRobot |
| Analytics | Vercel Analytics |

---

## Features

### Public site
- Bilingual (Hebrew / English) responsive clinic website with RTL layout
- Pages: Home, Aesthetic Treatments, Eye Treatments, Our Team, Q&A Blog, Contact
- Auto-playing looped treatment videos, image slider with smooth transitions
- Hash-based single-page routing (`/#home`, `/#blog`, etc.)

### Q&A blog system
- Visitors submit questions with their name, email, and phone number
- Admin reviews the inbox and turns any question into a published post
- Patient automatically receives an answer-notification email via Resend API
- If automation fails the admin sees the patient's email as a manual fallback

### Admin dashboard
- Secure session-based login (HttpOnly, SameSite=Lax cookies)
- Create, edit, and delete published blog posts
- Manage the full visitor question inbox
- One-click "Use as post idea" to draft a post from a visitor question

---

## Engineering Challenges

These are the real problems encountered and solved while building this project.

### Cross-origin session auth failing on iOS Safari
Admin sessions worked on desktop Chrome but silently failed on iPhone Safari.
Root cause: Safari's ITP (Intelligent Tracking Prevention) blocks cross-site cookies
between `dr-halachmi.com` (Vercel) and `plaste-eye-clinic.onrender.com` (Render) because
they are different registrable domains.

**Fix:** pointed `api.dr-halachmi.com` as a CNAME to the Render backend. Both ends now
share the `dr-halachmi.com` registrable domain, which Safari treats as same-site. Changed
the session cookie from `SameSite=None` (required for cross-site) to `SameSite=Lax`
(the correct, more restrictive setting).

### Email delivery blocked by cloud provider
Gmail SMTP on port 587 is blocked on Render's network, so the Spring Mail / JavaMailSender
setup that worked locally produced no errors but never delivered.

**Fix:** migrated to the Resend Java SDK, which sends over HTTPS and is not port-restricted.
The service skips silently when no API key is set (safe for local dev) and surfaces a
warning in the admin UI on failure — without rolling back the published blog post.

### Crossing the Vercel 100 MB source-bundle limit
After re-adding compressed videos from the recycling bin, the tracked assets grew to
112.9 MB. Vercel's source bundle limit is 100 MB, so deployments silently refused to build.

**Fix:** identified that only `.optimized.mp4` versions were imported in code, removed the
original uncompressed videos (−49.8 MB), removed JPG/PNG originals where `.webp` versions
were already the ones imported, and added precise `.gitignore` rules to prevent re-adding them.

### Deployment cost migration
Started on a Hetzner VPS with Coolify and Docker Compose. Migrated to Vercel (frontend) +
Render (backend) + Neon (serverless PostgreSQL) to reduce running costs. Reworked CORS
origins, cookie domain config, environment variables, and build pipelines across two
platforms in the process.

### RTL bilingual interface
The site is primarily Hebrew (RTL) with English in admin controls and technical labels.
Required explicit `direction: rtl` handling in CSS, custom font loading (Alef typeface),
and careful layout decisions in React so Hebrew and English sections don't break each other.

### Keeping a free-tier backend alive
Render's free tier spins down services after inactivity. Configured UptimeRobot to ping
the `/actuator/health` endpoint every 13 minutes. The Spring Actuator health endpoint also
serves liveness and readiness probes for Render's health-check system.

---

## Architecture

```
Browser
  │
  ├── Vercel  (dr-halachmi.com)          React 19 + Vite — static SPA
  │
  └── Render  (api.dr-halachmi.com)      Spring Boot 4.0 / Java 21
                       │
                       └── Neon          PostgreSQL 16 — serverless
```

---

## Project Structure

```
plaste/
├── backend/dr-halachmi-clinic/
│   ├── src/main/java/
│   │   ├── auth/               Session-based admin authentication
│   │   ├── blog/               Blog posts, visitor questions, Resend email
│   │   └── config/             Security filter chain and CORS config
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── pages/              One component per route
│   │   ├── component/          Navbar, Footer, Slider, VideoCard, Social
│   │   ├── api/                Fetch client (credentials + timeout)
│   │   ├── styles/             CSS split by page and component
│   │   └── assets/             Webp images, optimized mp4 videos, fonts
│   ├── vercel.json
│   └── vite.config.js
│
├── .env.example
└── README.md
```

---

## Running Locally

### Prerequisites
- Java 21
- Node.js 18+
- PostgreSQL running locally

### 1. Create the database

```sql
CREATE DATABASE dr_halachmi_clinic;
CREATE USER clinic_user WITH PASSWORD 'clinic_password';
GRANT ALL PRIVILEGES ON DATABASE dr_halachmi_clinic TO clinic_user;
```

### 2. Configure the backend

Create `backend/dr-halachmi-clinic/src/main/resources/application-local.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/dr_halachmi_clinic
spring.datasource.username=clinic_user
spring.datasource.password=clinic_password
app.admin.seed.username=admin
app.admin.seed.password=yourSecurePassword
```

```bash
cd backend/dr-halachmi-clinic
./mvnw spring-boot:run          # macOS / Linux
.\mvnw.cmd spring-boot:run      # Windows
```

Backend starts at `http://localhost:8080`

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:5173`

Admin login is at `http://localhost:5173/#clinic`

---

## Environment Variables

### Backend (Render)

| Variable | Purpose |
|---|---|
| `DB_URL` | PostgreSQL JDBC connection string |
| `DB_USERNAME` | Database user |
| `DB_PASSWORD` | Database password |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `APP_CORS_ALLOWED_ORIGINS` | Frontend origin (`https://dr-halachmi.com`) |
| `APP_PUBLIC_BASE_URL` | Frontend base URL used in notification email links |
| `RESEND_API_KEY` | Resend API key — leave blank locally to skip email |
| `ANSWER_NOTIFICATION_FROM` | Sender address (`noreply@dr-halachmi.com`) |

### Frontend (Vercel)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend base URL (`https://api.dr-halachmi.com`) |

---

## Author

**Dolev Halachmi** — Software Engineer

[GitHub](https://github.com/DolevHalachmi) · [Live site](https://dr-halachmi.com)
