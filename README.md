# Plaste Clinic Website

A modern clinic website with public pages, interactive Q&A blog, and admin dashboard for managing content.

**Tech Stack:**
- **Frontend**: React 19 + Vite
- **Backend**: Spring Boot 4.0 + Java 21
- **Database**: MySQL 8.0
- **Deployment**: Docker & Docker Compose (recommended) or local setup

The site includes public clinic pages, contact form, Q&A blog system, and admin panel for content management.

## Features

### Visitor Features
- Browse clinic pages from navigation menu
- Read published Q&A blog posts
- Submit questions for clinic review
- Contact clinic via contact form

### Admin Features
- Secure login with session management
- Create and publish blog Q&A posts
- Edit existing blog content
- Delete blog posts
- Review visitor-submitted questions
- Manage admin user account

## Navigation Structure

The site uses hash-based navigation (#anchor routing):

| Route | Page |
|-------|------|
| `#home` | Home page |
| `#aesthetic` | Aesthetic treatments |
| `#eyes` | Eye-related treatments |
| `#team` | Clinic team |
| `#blog` | Public Q&A blog & question form |
| `#contact` | Contact page |
| `#clinic` | Admin login |

**Example URLs:**
- `http://localhost:3000/#home`
- `http://localhost:3000/#blog`
- `http://localhost:3000/#clinic` (admin login)

## Getting Started

### Option 1: Docker (Recommended) 🐳

**Prerequisites:**
- Docker 20.10+
- Docker Compose 2.0+

**Quick Start:**

```bash
# Copy environment template
cp .env.example .env

# Start all services (database, backend, frontend)
docker-compose up -d

# View status
docker-compose ps

# View logs
docker-compose logs -f
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:3306

See [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) for detailed Docker instructions.

### Option 2: Local Setup

**Prerequisites:**
- Java 21
- Node.js 18+
- npm or yarn
- MySQL 8.0

**1. Create MySQL Database**

```bash
mysql -u root -p
CREATE DATABASE dr_halachmi_clinic;
CREATE USER 'clinic_user'@'localhost' IDENTIFIED BY 'clinic_password';
GRANT ALL PRIVILEGES ON dr_halachmi_clinic.* TO 'clinic_user'@'localhost';
FLUSH PRIVILEGES;
```

**2. Set Environment Variables**

```bash
export DB_URL=jdbc:mysql://localhost:3306/dr_halachmi_clinic
export DB_USERNAME=clinic_user
export DB_PASSWORD=clinic_password
export ADMIN_USERNAME=admin
export ADMIN_PASSWORD=yourSecurePassword
```

Or create `backend/dr-halachmi-clinic/src/main/resources/application-local.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dr_halachmi_clinic
spring.datasource.username=clinic_user
spring.datasource.password=clinic_password
app.admin.seed.username=admin
app.admin.seed.password=yourSecurePassword
```

**3. Start Backend**

From `backend/dr-halachmi-clinic/`:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend runs on: http://localhost:8080

**4. Start Frontend**

From `frontend/`:

```powershell
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

## Using the Site

### For Visitors

1. Open http://localhost:3000 (or your deployed URL)
2. Browse sections via navigation menu
3. Go to **Blog** to read Q&A posts
4. Submit questions at the bottom of the blog page
5. Questions are saved for admin review

### For Admins

1. Navigate to **Admin** section (or `#clinic`)
2. Log in with configured credentials (default: `admin` / see `.env`)
3. After login, access admin dashboard
4. **Create Posts**: Use "New Post" to add Q&A blog content
5. **Edit Posts**: Click edit icon on any blog card
6. **Delete Posts**: Click delete icon to remove content
7. **Review Questions**: Check visitor-submitted questions for content ideas

## Project Structure

```
plaste/
├── backend/dr-halachmi-clinic/    # Spring Boot API
│   ├── src/main/java/             # Java source code
│   ├── src/main/resources/         # Configuration files
│   ├── pom.xml                     # Maven dependencies
│   └── Dockerfile                  # Docker build configuration
├── frontend/                        # React + Vite SPA
│   ├── src/                        # React components & pages
│   ├── package.json                # npm dependencies
│   ├── vite.config.js              # Vite configuration
│   └── Dockerfile                  # Docker build configuration
├── docker-compose.yml              # Multi-container orchestration
├── .env.example                    # Environment template
├── DOCKER_DEPLOYMENT.md            # Detailed Docker guide
└── README.md                       # This file
```

## Environment Variables

Key configuration options:

| Variable | Default | Purpose |
|----------|---------|---------|
| `DB_URL` | MySQL connection string | Database connection |
| `DB_USERNAME` | `clinic_user` | Database user |
| `DB_PASSWORD` | `clinic_password` | Database password |
| `ADMIN_USERNAME` | `admin` | Admin login username |
| `ADMIN_PASSWORD` | `admin123` | Admin login password |
| `APP_CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Frontend URL (backend CORS) |
| `BACKEND_PORT` | `8080` | Backend API port |
| `FRONTEND_PORT` | `3000` | Frontend server port |

For production, use strong passwords and adjust CORS origins to your domain.

## Database Behavior

- **Auto-initialization**: First startup creates tables and seeds initial admin user
- **Data Persistence**: All data stored in MySQL (or Docker volume if using Docker)
- **Migrations**: JPA handles schema updates via `spring.jpa.hibernate.ddl-auto=update`
- **Blog Posts**: Stored separately from visitor questions
- **Sessions**: Admin login maintains HTTP session across page refreshes

## Development Commands

### Docker Commands
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Enter backend container
docker-compose exec backend sh

# Clean everything (warning: deletes data)
docker-compose down -v
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Backend Commands
```bash
cd backend/dr-halachmi-clinic

# Run locally
.\mvnw.cmd spring-boot:run

# Run tests
.\mvnw.cmd test

# Build JAR
.\mvnw.cmd clean package

# Clean build artifacts
.\mvnw.cmd clean
```

## Production Deployment Checklist

Before deploying to production:

### Security
- [ ] Change default `ADMIN_PASSWORD` to a strong password
- [ ] Set `SESSION_COOKIE_SECURE=true` (requires HTTPS)
- [ ] Generate strong `DB_PASSWORD`
- [ ] Use secrets management system (not plain `.env` files)
- [ ] Enable HTTPS with SSL certificate
- [ ] Set realistic `APP_CORS_ALLOWED_ORIGINS` to your domain

### Configuration
- [ ] Update `APP_CORS_ALLOWED_ORIGINS` to production frontend URL
- [ ] Configure SMTP for email notifications (`SPRING_MAIL_*`)
- [ ] Set production database credentials
- [ ] Disable JPA SQL logging (`JPA_SHOW_SQL=false`)
- [ ] Configure backup strategy for database

### Performance
- [ ] Optimize and compress images for web
- [ ] Compress video assets for mobile
- [ ] Run frontend build: `npm run build`
- [ ] Run backend tests: `.\mvnw.cmd test`
- [ ] Monitor Docker resource limits
- [ ] Consider managed database service (AWS RDS, Google Cloud SQL, etc.)

### Monitoring
- [ ] Set up log aggregation
- [ ] Configure health check monitoring
- [ ] Enable application performance monitoring (APM)
- [ ] Set up alerts for service failures
- [ ] Enable database backups

See [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) for detailed Docker production setup.

## Troubleshooting

### Using Docker

**Services won't start:**
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

**Backend connection issues:**
```bash
# Check if backend is healthy
docker-compose exec backend curl http://localhost:8080/actuator/health

# Check logs
docker-compose logs backend
```

**Database connection issues:**
```bash
# Check database status
docker-compose ps db

# View database logs
docker-compose logs db

# Test database connection
docker-compose exec db mysql -u clinic_user -p -e "SELECT 1"
```

**Frontend API errors:**
```bash
# Ensure backend URL is correct
# Check APP_CORS_ALLOWED_ORIGINS matches frontend URL
# Verify backend is accessible from frontend container
docker-compose exec frontend curl http://backend:8080/actuator/health
```

### Local Setup

**Backend won't start:**
- Verify Java 21 is installed: `java -version`
- Check MySQL is running
- Verify database credentials in environment variables
- View logs for detailed error messages

**Frontend shows API errors:**
- Verify backend is running on `http://localhost:8080`
- Check CORS configuration: `APP_CORS_ALLOWED_ORIGINS`
- Verify frontend environment variables are set

**Admin login fails:**
- Confirm `ADMIN_USERNAME` and `ADMIN_PASSWORD` match your configuration
- Check database is initialized with admin user
- View backend logs for authentication errors

**Database connection fails:**
- Verify MySQL is running: `mysql -u root -p`
- Check database exists: `SHOW DATABASES;`
- Verify user has permissions: `SHOW GRANTS FOR 'clinic_user'@'localhost';`

For more detailed troubleshooting, see [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md).

## Architecture

### Backend (Spring Boot)
- REST API for blog, admin, and contact operations
- JWT session management for admin authentication
- MySQL database persistence
- Email notifications (optional SMTP)
- CORS configured for frontend origin
- Health checks via Spring Actuator

### Frontend (React + Vite)
- Single Page Application with hash-based routing
- Component-based UI with React 19
- Vite for fast development and optimized builds
- API client for backend communication
- Responsive design for all screen sizes

### Database (MySQL)
- Stores blog posts and visitor questions
- Admin user credentials
- Automatic schema initialization on startup
- Persistent volume in Docker setup

## License & Contributing

Please refer to project guidelines for contributions and licensing information.

## Support

For issues or questions:
1. Check [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) for Docker-specific help
2. Review troubleshooting section above
3. Check service logs: `docker-compose logs` or backend/frontend console output
4. Verify all environment variables are correctly set
