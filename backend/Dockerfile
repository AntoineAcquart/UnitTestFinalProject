# pull the Node.js Docker image
FROM node:14

# create the directory inside the container
WORKDIR /app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./
COPY tsconfig.json ./
COPY ormconfig.json ./

RUN npm install

COPY . .

#RUN npm run build
RUN npm start

EXPOSE 8000

# the command that starts our app
#ENTRYPOINT ["node", "./build/src/index.js"]
ENTRYPOINT ["ts-node-dev", "./index.ts"]
