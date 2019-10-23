echo "1/11. Updating package list"
sudo apt update -y

echo "2/11. Installing MongoDB"
sudo apt install gnupg -y
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update -y
sudo apt install mongodb-org -y
sudo service mongod start
systemctl enable mongod.service

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

echo "8/11. Downloading Jaydon"
git clone https://github.com/ozgrozer/jaydon.git && cd jaydon

echo "9/11. Installing dependencies"
yarn install

echo "10/11. Creating necessary database tables"
yarn run firstRun

echo "11/11. Starting server with PM2"
pm2 start ./src/backend/server.js --name jaydon -i max
pm2 startup
pm2 save
