#!/usr/bin/env bash
# Pull GitHub main and rebuild Sign Up on the Hostinger VPS.
# Usage: bash /var/www/sign/scripts/vps-deploy.sh
#   or:  /root/deploy-sign.sh
set -euo pipefail

APP=/var/www/sign

cd "$APP"

if ! git diff --quiet || ! git diff --cached --quiet; then
  git stash push -m "vps-local $(date -u +%Y-%m-%dT%H:%M:%SZ)"
fi

git pull
npm install
npm install --prefix server
npm run build
pm2 restart signup-api --update-env
pm2 restart signup-web --update-env
pm2 status
