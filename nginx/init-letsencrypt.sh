# #!/bin/bash

# domains=(soriconnct.com www.soriconnct.com)
# email="montaser.mohamed.hassan@gmail.com"
# staging=1

# # Stop running containers
# docker compose down

# # Remove existing certificates
# sudo rm -rf ./nginx/certbot/conf/*

# # Create required directories
# sudo mkdir -p ./nginx/certbot/conf/live/soriconnct.com
# sudo mkdir -p ./nginx/certbot/www

# # Start nginx
# docker compose up --force-recreate -d nginx

# # Wait for nginx to start
# echo "Waiting for nginx to start..."
# sleep 7

# # Request certificate
# docker compose run --rm --entrypoint "\
#     certbot certonly --webroot -w /var/www/certbot \
#     --email $email \
#     ${staging:+'--staging'} \
#     --agree-tos \
#     --force-renewal \
#     -d soriconnct.com \
#     -d www.soriconnct.com \
#     --no-eff-email" certbot

# # Restart nginx
# docker compose restart nginx

#!/bin/bash

# Create directory for certificates
mkdir -p ./nginx/certs

# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ./nginx/certs/localhost.key \
    -out ./nginx/certs/localhost.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Set appropriate permissions
chmod 644 ./nginx/certs/localhost.crt
chmod 644 ./nginx/certs/localhost.key