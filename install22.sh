echo "1/12. Installing MongoDB"
wget -nc https://www.mongodb.org/static/pgp/server-6.0.asc
cat server-6.0.asc | gpg --dearmor | sudo tee /etc/apt/keyrings/mongodb.gpg >/dev/null
sudo sh -c 'echo "deb [ arch=amd64,arm64 signed-by=/etc/apt/keyrings/mongodb.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" >> /etc/apt/sources.list.d/mongo.list'
sudo apt update
sudo apt install mongodb-org -y
sudo service mongod start

echo "2/12. Installing Certbot"
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot -y
sudo ln -s /snap/bin/certbot /usr/bin/certbot

echo "3/12. Installing Nginx"
sudo apt install nginx -y

echo "4/12. Installing Git"
sudo apt install git -y

echo "5/12. Installing Node.js"
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

echo "6/12. Installing Yarn"
sudo npm i -g yarn

echo "7/12. Installing PM2"
sudo npm i -g pm2

echo "8/12. Jaydon: cloning Git repository"
git clone https://github.com/ozgrozer/jaydon.git && cd jaydon

echo "9/12. Jaydon: installing dependencies"
yarn install

echo "10/12. Jaydon: building React app"
yarn build

echo "11/12. Jaydon: creating necessary database tables"
yarn run firstRun

echo "12/12. Jaydon: starting server with PM2"
pm2 start ./src/backend/server.js --name jaydon -i max
pm2 startup
pm2 save
