# jaydon

Nginx Control Panel

> This is an experimental control panel written for a niche reason. Use at your own risk.

### Before Installation

You need:

- [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/package-manager/)
- [NPM](https://www.npmjs.com/get-npm)
- [Yarn](https://www.npmjs.com/package/yarn)
- [PM2](https://www.npmjs.com/package/pm2)

### Installation

```
# Download repository
git clone https://github.com/ozgrozer/jaydon.git

# Change directory
cd jaydon

# Install dependencies
yarn install

# Start server with PM2
pm2 start ./src/backend/server.js --name jaydon -i max

# Open browser and go to
http://your-ip:1148
```

### Preview

<img src="preview.jpg" alt="" width="600" />

### Todo

- [ ] Domains
- [ ] Users
- [ ] DNS
- [ ] SSL
- [ ] Cron
- [ ] Logs
- [ ] Monitor
- [ ] API
