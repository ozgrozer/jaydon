echo "1/13. Installing essential tools"
sudo apt-get update
sudo apt-get install build-essential -y

echo "2/13. Installing MongoDB"
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg arch=amd64,arm64] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install mongodb-org -y
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod

echo "3/13. Installing Certbot"
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

echo "4/13. Installing Nginx"
sudo apt install nginx -y

echo "5/13. Installing Git"
sudo apt install git -y

echo "6/13. Installing Node.js"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

echo "7/13. Installing Yarn"
sudo npm i -g yarn

echo "8/13. Installing PM2"
sudo npm i -g pm2

echo "9/13. Jaydon: cloning Git repository"
git clone https://github.com/ozgrozer/jaydon.git && cd jaydon

echo "10/13. Jaydon: installing dependencies"
yarn install

echo "11/13. Jaydon: building React app"
yarn build

echo "12/13. Jaydon: creating necessary database tables"
yarn run firstRun

echo "13/13. Jaydon: starting server with PM2"
pm2 start ./src/backend/server.js --name jaydon -i max
pm2 startup
pm2 save
