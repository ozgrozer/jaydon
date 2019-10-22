echo "1/11. Updating package list"
sudo apt update -y

echo "2/11. Installing gcc and g++"
sudo apt install gcc
sudo apt install g++

echo "3/11. Installing Nginx"
sudo apt install nginx -y

echo "4/11. Installing Git"
sudo apt install git -y

echo "5/11. Installing Node.js"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs -y

echo "6/11. Installing Yarn"
sudo npm i -g yarn

echo "7/11. Installing PM2"
sudo npm i -g pm2

echo "8/11. Downloading repository"
git clone https://github.com/ozgrozer/jaydon.git && cd jaydon

echo "9/11. Installing dependencies"
yarn install

echo "10/11. Creating necessary database tables"
yarn run firstRun

echo "11/11. Starting server with PM2"
pm2 start ./src/backend/server.js --name jaydon -i max
pm2 startup
pm2 save
