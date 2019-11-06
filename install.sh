echo "1/12. Installing MongoDB"
sudo apt install gnupg -y
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update -y
sudo apt install mongodb-org -y
sudo service mongod start
systemctl enable mongod.service

echo "2/12. Installing Certbot"
sudo apt install software-properties-common -y
sudo add-apt-repository universe -y
sudo add-apt-repository ppa:certbot/certbot -y
sudo apt update -y
sudo apt install certbot python-certbot-nginx -y

echo "3/12. Installing Nginx"
sudo apt install nginx -y

echo "4/12. Installing Git"
sudo apt install git -y

echo "5/12. Installing Node.js"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
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
