# Plaste Clinic Website

This project is a clinic website built with:

- `frontend/`: React + Vite
- `backend/dr-halachmi-clinic/`: Spring Boot + PostgreSQL

The site includes public clinic pages, a contact experience, a Q&A blog, and an admin flow for managing blog posts.

## What The Site Does

Visitors can:

- browse the clinic pages from the top navigation
- read blog question-and-answer cards
- submit a new question from the blog page
- use the contact page to reach the clinic

Admins can:

- log in through the clinic/admin page
- create new blog cards
- edit existing blog cards
- delete blog cards
- review visitor-submitted questions as ideas for future posts
- delete submitted questions from the admin idea list

## Site Navigation

The site uses hash-based navigation, so each section opens inside the same frontend app.

Main sections:

- `#home` - home page
- `#aesthetic` - aesthetic treatments
- `#eyes` - eye-related treatments
- `#team` - clinic team page
- `#blog` - public blog and question form
- `#contact` - contact page
- `#clinic` - admin login page

Example local URLs:

- `http://localhost:5173/#home`
- `http://localhost:5173/#blog`
- `http://localhost:5173/#clinic`

## How To Use The Site

### For Visitors

1. Open the site in the browser.
2. Use the top navigation bar to move between sections.
3. Open `בלוג שאלות ותשובות` to read published blog cards.
4. At the bottom of the blog page, fill in the question form and submit it.
5. The question is saved in the database so the clinic admin can review it later.

### For Admins

1. Open the `לשימוש המרפאה` page or go to `#clinic`.
2. Log in with the admin username and password.
3. After login, open the blog page.
4. Use `פוסט חדש` to create a new public blog card.
5. Use `עריכה` on any card to update its question or answer.
6. Use `מחיקה` on any card to remove it.
7. In the admin question section, review visitor questions and use them as ideas for future posts.

## Local Setup

### Prerequisites

Install these first:

- Java `21`
- Node.js `18+` or newer
- `npm`
- PostgreSQL

### 1. Create The Database

Create a PostgreSQL database named:

```text
blogdb
```

The backend is configured by default to connect to:

- database: `blogdb`
- host: `localhost`
- port: `5432`

### 2. Optional Environment Variables

You can override the default database and admin values with environment variables.

Backend database settings:

- `DB_USERNAME`
- `DB_PASSWORD`

Admin seed settings:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_DISPLAY_NAME`

Current defaults from `application.properties`:

- admin username: `admin`
- admin password: `change-me-now`
- admin display name: `Clinic Admin`

For real use, change the default admin password before deployment.

## Run The Project

### Start The Backend

From:

```text
backend/dr-halachmi-clinic
```

Run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

### Start The Frontend

From:

```text
frontend
```

Install dependencies if needed:

```powershell
npm install
```

Run the dev server:

```powershell
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

The Vite config already proxies `/api` requests to the Spring backend.

## Blog And Admin Behavior

- Published blog cards are loaded from the backend database.
- Visitor questions are saved separately from published posts.
- Admin login uses a server session, so refreshing the page keeps the admin logged in while the session is active.
- The backend seeds the first admin user and starter blog posts when the database is empty.

## Useful Commands

Frontend:

```powershell
npm run lint
npm run build
```

Backend:

```powershell
.\mvnw.cmd test
```

## Troubleshooting

If the blog or admin area does not work locally:

1. Make sure PostgreSQL is running.
2. Make sure the `blogdb` database exists.
3. Make sure the backend is running on `http://localhost:8080`.
4. Make sure the frontend is running on `http://localhost:5173`.
5. If admin login fails, check the configured admin username/password values.

## Project Structure

```text
plaste/
├─ frontend/
│  ├─ src/
│  └─ package.json
├─ backend/
│  └─ dr-halachmi-clinic/
│     ├─ src/
│     └─ pom.xml
└─ README.md
```
