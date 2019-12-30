FROM node:latest
WORKDIR /app

COPY package.json .
RUN npm install

#Due to problem with nodemon. Worked fine without on my main computer...
RUN npm install nodemon -g

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start-dev"]