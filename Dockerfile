FROM node
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT ["npm","start"]