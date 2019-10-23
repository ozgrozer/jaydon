echo "1/11. Installing MongoDB"
sudo apt install gnupg -y
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update -y
sudo apt install mongodb-org -y
sudo service mongod start
systemctl enable mongod.service

echo "2/11. Installing Nginx"
sudo apt install nginx -y

echo "3/11. Installing Git"
sudo apt install git -y

echo "4/11. Installing Node.js"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs -y

echo "5/11. Installing Yarn"
sudo npm i -g yarn

echo "6/11. Installing PM2"
sudo npm i -g pm2

echo "7/11. Jaydon: cloning Git repository"
git clone https://github.com/ozgrozer/jaydon.git && cd jaydon

echo "8/11. Jaydon: installing dependencies"
yarn install

echo "9/11. Jaydon: building React app"
yarn build

echo "10/11. Jaydon: creating necessary database tables"
yarn run firstRun

echo "11/11. Jaydon: starting server with PM2"
pm2 start ./src/backend/server.js --name jaydon -i max
pm2 startup
pm2 save
