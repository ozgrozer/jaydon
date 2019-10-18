# jaydon

Nginx Control Panel

> This is an experimental control panel written for a niche reason. Use at your own risk.

## Before Installation

You need:

- [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/package-manager/)
- [NPM](https://www.npmjs.com/get-npm)
- [Yarn](https://www.npmjs.com/package/yarn)
- [PM2](https://www.npmjs.com/package/pm2)

> Unless other control panels in Jaydon you control the versions of your softwares such as Nginx, Node.js etc.

If you're using Ubuntu you can use these commands to simply install dependencies.

```
# Update package list
sudo apt update -y

# Install Nginx
sudo apt install nginx -y

# Install Git
sudo apt install git -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs -y

# Install Yarn
sudo npm i -g yarn

# Install PM2
sudo npm i -g pm2
```

## Installation

```
# Download repository
git clone https://github.com/ozgrozer/jaydon.git

# Change directory
cd jaydon

# Install dependencies
yarn install

# Create necessary tables
yarn run firstRun

# Start server with PM2
pm2 start ./src/backend/server.js --name jaydon -i max

# Open your browser and go to
http://your-ip:1148
```

## Preview

<img src="preview.jpg" alt="" width="600" />

## Todo

- [ ] Domains
- [ ] Users
- [ ] DNS
- [ ] SSL
- [ ] Cron
- [ ] Logs
- [ ] Monitor
- [ ] API

## License

[MIT](license)
