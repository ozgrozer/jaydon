FROM node:latest
WORKDIR /var/www/jaydon
RUN apt update -y
RUN apt install nginx -y
RUN npm i -g pm2
RUN npm i -g yarn
CMD tail -f /dev/null