# AWS Deployment Guide for Marico Global API (Docker Version)

This guide will walk you through the process of deploying the Marico Global API application on AWS using Docker.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Docker installed locally
4. Git installed locally
5. Basic understanding of AWS services and Docker

## Step 1: Prepare Your Application

1. Ensure your Docker image is ready:
   ```bash
   # Pull the Docker image
   docker pull your-docker-image:tag
   
   # Test the image locally
   docker run -p 3000:3000 your-docker-image:tag
   ```

2. Create a `.env` file for production environment variables:
   ```bash
   cp .env.example .env.production
   ```

3. Update the production environment variables with appropriate values:
   - Database connection strings
   - API keys
   - Other sensitive information

## Step 2: Set Up AWS Infrastructure

### 2.1 Create an EC2 Instance

1. Log in to AWS Console
2. Navigate to EC2 Dashboard
3. Click "Launch Instance"
4. Choose Amazon Linux 2023 AMI
5. Select t2.micro (free tier eligible) or appropriate instance type
6. Configure instance details:
   - Network: Default VPC
   - Subnet: Any public subnet
   - Auto-assign Public IP: Enable
7. Add storage (minimum 8GB)
8. Add tags (optional)
9. Configure Security Group:
   - Allow SSH (Port 22)
   - Allow HTTP (Port 80)
   - Allow HTTPS (Port 443)
   - Allow your application port (e.g., 3000)
10. Review and launch
11. Create or select an existing key pair
12. Download the key pair file (.pem)

### 2.2 Set Up RDS Database (if needed)

1. Navigate to RDS Dashboard
2. Click "Create database"
3. Choose your database engine (e.g., PostgreSQL)
4. Select appropriate instance size
5. Configure database settings:
   - DB instance identifier
   - Master username and password
   - VPC and subnet settings
6. Configure security group to allow access from EC2 instance
7. Create database

## Step 3: Deploy Application

### 3.1 Connect to EC2 Instance

```bash
# Change permissions of your key file
chmod 400 your-key-pair.pem

# Connect to your instance
ssh -i your-key-pair.pem ec2-user@your-instance-public-dns
```

### 3.2 Install Docker on EC2

```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install docker -y

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to docker group
sudo usermod -a -G docker ec2-user

# Log out and log back in for group changes to take effect
exit
# Reconnect to your instance
```

### 3.3 Deploy Docker Container

```bash
# Create a directory for your application
mkdir ~/marico-api
cd ~/marico-api

# Create docker-compose.yml
cat > docker-compose.yml << 'EOL'
version: '3.8'
services:
  app:
    image: your-docker-image:tag
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: always
EOL

# Create .env file with your production environment variables
nano .env

# Start the container
docker-compose up -d
```

## Step 4: Set Up Nginx as Reverse Proxy

1. Install Nginx:
```bash
sudo yum install nginx -y
```

2. Configure Nginx:
```bash
sudo nano /etc/nginx/conf.d/marico-api.conf
```

3. Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. Start Nginx:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 5: Set Up SSL with Let's Encrypt

1. Install Certbot:
```bash
sudo yum install certbot python3-certbot-nginx -y
```

2. Obtain SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com
```

## Step 6: Set Up Domain and DNS

1. Register a domain name (if not already done)
2. Create a hosted zone in Route 53
3. Add an A record pointing to your EC2 instance's public IP
4. Update nameservers at your domain registrar

## Step 7: Monitoring and Maintenance

1. Set up CloudWatch alarms for:
   - CPU utilization
   - Memory usage
   - Disk space
   - Container health

2. Regular maintenance tasks:
   ```bash
   # Update Docker image
   docker-compose pull
   docker-compose up -d

   # Update system
   sudo yum update -y
   ```

## Step 8: Backup Strategy

1. Set up automated database backups in RDS
2. Configure EBS snapshots for EC2 instance
3. Implement Docker volume backups if needed

## Troubleshooting

1. Check container logs:
   ```bash
   docker-compose logs -f
   ```

2. Check Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

3. Check system logs:
   ```bash
   sudo journalctl -u nginx
   ```

## Security Considerations

1. Keep all software updated
2. Use security groups to restrict access
3. Implement proper IAM roles and policies
4. Regular security audits
5. Monitor for suspicious activities
6. Implement rate limiting
7. Use AWS WAF for additional security
8. Scan Docker images for vulnerabilities
9. Use Docker secrets for sensitive data

## Cost Optimization

1. Use appropriate instance sizes
2. Implement auto-scaling if needed
3. Use reserved instances for long-term deployments
4. Monitor and optimize resource usage
5. Use AWS Cost Explorer to track expenses

## Docker-Specific Commands

```bash
# View running containers
docker ps

# View container logs
docker logs container_id

# Restart container
docker-compose restart

# Stop container
docker-compose down

# View container resource usage
docker stats

# Clean up unused images
docker image prune -a
```

Remember to replace placeholder values (like your-domain.com, your-docker-image:tag, etc.) with your actual values during deployment. 