# pull the Node.js Docker image
FROM node:latest

# create the directory inside the container
WORKDIR /app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

COPY tsconfig.json ./

COPY ormconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

RUN npm install
RUN npm run build

EXPOSE 3000

# the command that starts our app
CMD ["node", "./build/index.js"]