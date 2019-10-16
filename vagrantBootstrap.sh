#!/usr/bin/env bash

echo "1. Updating package list."
sudo apt update -y

echo "2. Installing Nginx."
sudo apt install nginx -y

echo "3. Installing Git."
sudo apt install git -y

echo "4. Installing Node.js."
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs -y

echo "5. Installing Yarn."
npm i -g yarn

echo "6. Installing PM2."
npm i -g pm2

echo "7. Installing dependencies."
cd /var/www/jaydon
yarn install

echo -e "\nOS version:"
hostnamectl
echo -e "\nNginx version:"
nginx -v
echo -e "\nGit version:"
git --version
echo -e "\nNode.js version:"
node -v
echo -e "\nNPM version:"
npm -v
echo -e "\nYarn version:"
yarn -v
echo -e "\nPM2 version:"
pm2 -v
