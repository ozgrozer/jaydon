echo "1/12. Updating package list"
sudo apt update -y

echo "2/12. Installing gcc and g++"
sudo apt install gcc -y
sudo apt install g++ -y

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

echo "8/12. Downloading repository"
git clone https://github.com/ozgrozer/jaydon.git && cd jaydon

echo "9/12. Installing dependencies"
yarn install

echo "10/12. Rebuilding packages"
yarn rebuild

echo "11/12. Creating necessary database tables"
yarn run firstRun

echo "12/12. Starting server with PM2"
pm2 start ./src/backend/server.js --name jaydon -i max
pm2 startup
pm2 save
