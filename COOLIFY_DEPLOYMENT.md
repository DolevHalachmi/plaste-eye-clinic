# Coolify Deployment Guide

## Why Coolify Might Not Auto-Detect Your Project

Coolify looks for specific configuration files in these priority order:
1. **docker-compose.yml** in the repository root
2. **Dockerfile** in the repository root
3. **docker-compose.yaml** (alternate naming)

### Common Reasons for Detection Failure

### 1. ❌ Docker Compose File Not in Root
**Your Setup:** ✅ `docker-compose.yml` IS in root
- This should be detected automatically

### 2. ❌ Incorrect docker-compose.yml Structure
- Missing version field
- Invalid YAML syntax
- Services not properly defined
- Invalid service names

**Check:** Your docker-compose.yml looks valid. Verify:
```bash
# Validate YAML syntax
docker-compose config
```

### 3. ❌ Missing Build Context Paths
Coolify needs proper build contexts defined:
```yaml
services:
  backend:
    build:
      context: ./backend/dr-halachmi-clinic  # ✅ This is correct
      dockerfile: Dockerfile
```

### 4. ❌ Relative vs Absolute Paths
- Coolify clones your repo to its server
- Uses relative paths from git root
- **Avoid**: `/absolute/paths` or `C:\Windows\paths`
- **Use**: `./backend/dr-halachmi-clinic`, `./frontend`

**Your Setup:** ✅ Correct (all relative paths)

### 5. ❌ Environment Variable File Issues
- `.env` file should NOT exist in git repo
- `.env.example` should exist (this acts as template)
- Coolify creates `.env` from your dashboard settings

**Check:**
```bash
# Verify .env is in .gitignore
cat .gitignore | grep "^\.env"
```

### 6. ❌ Private Git Repository
- Coolify needs git access (SSH or token)
- Public repos: usually auto-detected
- Private repos: may need SSH key configuration

## How to Manually Add to Coolify

If Coolify doesn't auto-detect:

### Step 1: Connect Repository
1. In Coolify dashboard → **Repositories**
2. Connect your Git provider (GitHub, GitLab, etc.)
3. Select your repository

### Step 2: Create New Project/Service
1. Click **Add Service** or **New Application**
2. Select **Docker Compose**
3. Choose your repository and branch

### Step 3: Configure Settings
1. **Service Type**: Docker Compose
2. **Base Directory**: `.` (root) or leave empty
3. **Docker Compose File**: `docker-compose.yml`
4. **Compose Version**: `3.8` (matches your file)

### Step 4: Add Environment Variables
In Coolify dashboard, add these variables:

```
DB_NAME=dr_halachmi_clinic
DB_USERNAME=clinic_user
DB_PASSWORD=<strong-random-password>
DB_PORT=5432
BACKEND_PORT=8080
FRONTEND_PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-random-password>
APP_CORS_ALLOWED_ORIGINS=https://yourdomain.com
APP_PUBLIC_BASE_URL=https://yourdomain.com
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_USERNAME=<your-email>
SPRING_MAIL_PASSWORD=<app-password>
```

### Step 5: Configure Ports
- **Frontend**: Port 3000 (public access via domain)
- **Backend**: Port 8080 (internal or subdomain)
- **Database**: Port 5432 (internal only, NOT public)

### Step 6: Configure SSL/HTTPS
1. Enable HTTPS
2. Provide domain or use Coolify's domain
3. Auto-generate SSL certificate

## Troubleshooting Checklist

### File Structure Validation
```bash
# Check if docker-compose.yml exists in root
ls -la docker-compose.yml

# Validate YAML
docker-compose config

# Check if Dockerfiles exist
ls -la backend/dr-halachmi-clinic/Dockerfile
ls -la frontend/Dockerfile

# Verify .env is ignored
git status | grep -i env
```

### Common Issues

**Issue**: "Cannot find docker-compose.yml"
```bash
# Solution: Ensure it's in git root, not in subdirectory
git ls-files docker-compose.yml
```

**Issue**: "Service failed to start"
```bash
# Check logs in Coolify dashboard
# Verify all environment variables are set
# Check port conflicts
```

**Issue**: "Health check failing"
- Backend needs `/actuator/health` endpoint (✅ Your app has this)
- Frontend needs to be reachable on port 3000
- PostgreSQL needs to accept connections

## For Coolify to Auto-Detect

Ensure these are committed to git:

✅ **Required:**
- [ ] `docker-compose.yml` in repository root
- [ ] Both `Dockerfile`s properly configured
- [ ] `.env.example` file (as reference)
- [ ] `.gitignore` excludes `.env`

✅ **Recommended:**
- [ ] `DOCKER_DEPLOYMENT.md` (documentation)
- [ ] `README.md` with deployment instructions
- [ ] `.dockerignore` files to reduce image size

## Manual Deployment with Coolify CLI

If using Coolify CLI:

```bash
# Login to Coolify
coolify auth login

# Deploy docker-compose
coolify deploy --file docker-compose.yml

# View deployment status
coolify status
```

## Integration Files (Optional but Helpful)

Create `.coolify.json` in root to explicitly configure:

```json
{
  "services": {
    "db": {
      "image": "postgres:16-alpine",
      "environment": {
        "POSTGRES_DB": "${DB_NAME}",
        "POSTGRES_USER": "${DB_USERNAME}",
        "POSTGRES_PASSWORD": "${DB_PASSWORD}"
      }
    },
    "backend": {
      "build": {
        "context": "./backend/dr-halachmi-clinic"
      },
      "ports": ["${BACKEND_PORT}:8080"],
      "depends_on": ["db"]
    },
    "frontend": {
      "build": {
        "context": "./frontend"
      },
      "ports": ["${FRONTEND_PORT}:3000"],
      "depends_on": ["backend"]
    }
  }
}
```

## Deployment Optimization

### Reduce Build Time
- Use `.dockerignore` files (already configured ✅)
- Multi-stage builds (already in Dockerfiles ✅)
- Cache layers effectively

### Configure Healthchecks
Already configured in docker-compose.yml ✅
- Backend: `/actuator/health`
- Frontend: HTTP GET /
- Database: PostgreSQL health check

### Resource Limits (Optional)
Add to docker-compose.yml for production:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1024M
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Debugging Coolify Detection

Enable Coolify verbose logging:
```bash
# In Coolify dashboard settings
# Enable Debug Mode or Verbose Logging
# Then re-scan for projects
```

## Next Steps

1. **Verify git repository** is accessible to Coolify
2. **Connect repository** in Coolify dashboard
3. **Manually select** Docker Compose configuration
4. **Set environment variables** via dashboard
5. **Deploy** and monitor logs
6. **Test** all services (frontend, backend, database)

For detailed Coolify documentation: https://coolify.io/docs
