#!/bin/bash

# Fetch metadata token for IMDSv2
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600" -s)

# Fetch public IP address using the token
public_ip=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" -s http://169.254.169.254/latest/meta-data/public-ipv4)

# Check if public IP is available
if [ -z "$public_ip" ]; then
    echo "No public IP assigned to this instance."
    exit 1
else
    echo "Public IP Address: $public_ip"
fi

# Find all .js files in the current directory and subdirectories
find . -type f -name "*.js" | while read -r file; do
  # Replace 127.0.0.1:5000 with the fetched public IP address
  sed -i.bak "s|127\.0\.0\.1:5000|${public_ip}:5000|g" "$file"
  echo "Updated: $file"
done

# Remove backup files created by sed
find . -type f -name "*.bak" -delete

echo "Replacement complete!"