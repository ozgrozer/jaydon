FROM node:latest
WORKDIR /var/www/jaydon
RUN npm i -g pm2
RUN npm i -g yarn
CMD tail -f /dev/null