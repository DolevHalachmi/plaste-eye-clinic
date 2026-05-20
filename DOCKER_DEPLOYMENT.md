# Docker Deployment Guide

## Quick Start (Development)

```bash
# 1. Copy the environment template
cp .env.example .env

# 2. Start all services
docker-compose up -d

# 3. Check service status
docker-compose ps

# 4. View logs
docker-compose logs -f

# Services will be available at:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8080
# - Database: localhost:3306
```

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- At least 2GB RAM allocated to Docker
- Ports 3000, 8080, 3306 available

## Configuration

### Environment Variables

Edit `.env` file to customize:

```bash
# Database
DB_ROOT_PASSWORD=rootpassword
DB_NAME=dr_halachmi_clinic
DB_USERNAME=clinic_user
DB_PASSWORD=clinic_password

# Backend
BACKEND_PORT=8080
APP_CORS_ALLOWED_ORIGINS=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Frontend
FRONTEND_PORT=3000

# Mail (optional)
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password
```

⚠️ **NEVER** commit `.env` file. It's in `.gitignore`.

## Common Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend   # Backend logs only
docker-compose logs -f frontend  # Frontend logs only
docker-compose logs -f db        # Database logs only

# Rebuild images (after code changes)
docker-compose up -d --build

# Clean everything (warning: deletes data)
docker-compose down -v

# Enter backend container shell
docker-compose exec backend sh

# Enter database shell
docker-compose exec db mysql -u clinic_user -p dr_halachmi_clinic

# Check service health
docker-compose exec backend curl http://localhost:8080/actuator/health
```

## Health Checks

Services include automatic health checks:

- **Backend**: `GET /actuator/health` (port 8080)
- **Frontend**: `GET /` (port 3000)
- **Database**: MySQL ping health check

## Persistence

- Database data is stored in Docker volume `plaste_db_data`
- Survives container restarts but not `docker-compose down -v`

## Production Considerations

### Before deploying to production:

1. **Use strong passwords** — Generate secure credentials
2. **Enable HTTPS** — Add Nginx reverse proxy with SSL
3. **Configure mail** — Set real SMTP credentials
4. **Set `SESSION_COOKIE_SECURE=true`** in production
5. **Use database backups** — Set up automated backups
6. **Monitor logs** — Integrate with log aggregation
7. **Use secrets management** — Don't use .env files; use Docker Secrets or cloud provider secrets
8. **Scale database** — Consider managed database service (AWS RDS, Google Cloud SQL, etc.)
9. **Enable authentication** — Add API authentication (JWT, OAuth, etc.)
10. **Rate limiting** — Add rate limiting to APIs

### Example production docker-compose.yml adjustments:

```yaml
services:
  backend:
    environment:
      SESSION_COOKIE_SECURE: "true"  # Force HTTPS cookies
      JPA_SHOW_SQL: "false"          # Don't log SQL in production
    restart: always
    # Add resource limits
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Verify database connection
docker-compose exec backend curl http://localhost:8080/actuator/health

# Check if port is in use
lsof -i :8080
```

### Database won't connect
```bash
# Check if database is running
docker-compose ps db

# View database logs
docker-compose logs db

# Check database health
docker-compose exec db mysqladmin ping -h localhost -u clinic_user -p
```

### Frontend API errors
```bash
# Check CORS settings
# Verify APP_CORS_ALLOWED_ORIGINS matches frontend URL

# Check backend is accessible from frontend container
docker-compose exec frontend curl http://backend:8080/actuator/health
```

## Updating Services

### Update backend (after code changes):
```bash
docker-compose down
# Make code changes
docker-compose up -d --build backend
```

### Update frontend (after code changes):
```bash
# Just restart (unless you changed dependencies)
docker-compose restart frontend

# If dependencies changed:
docker-compose down frontend
docker-compose up -d --build frontend
```

## Database Management

### Export database
```bash
docker-compose exec db mysqldump -u clinic_user -p dr_halachmi_clinic > backup.sql
```

### Import database
```bash
cat backup.sql | docker-compose exec -T db mysql -u clinic_user -p dr_halachmi_clinic
```

## Performance Tips

- **Increase Docker memory** if services are slow
- **Use local volumes** for faster database access on development machines
- **Rebuild images** after dependency updates (`docker-compose up --build`)
- **Monitor with** `docker stats`

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Spring Boot Docker Best Practices](https://spring.io/guides/topicals/spring-boot-docker)
