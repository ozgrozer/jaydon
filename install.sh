echo "1. Updating package list."
sudo apt update -y

echo "2. Installing Nginx."
sudo apt install nginx -y

echo "3. Installing Git."
sudo apt install git -y

echo "4. Installing Node.js."
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs -y

echo "5. Installing Yarn."
sudo npm i -g yarn

echo "6. Installing PM2."
sudo npm i -g pm2

echo "7. Downloading repository."
git clone https://github.com/ozgrozer/jaydon.git && cd jaydon

echo "8. Installing dependencies."
yarn install

echo "9. Creating necessary database tables."
yarn run firstRun

echo "10. Starting server with PM2."
pm2 start ./src/backend/server.js --name jaydon -i max
pm2 startup
pm2 save
