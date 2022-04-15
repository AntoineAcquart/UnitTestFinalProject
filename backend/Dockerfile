# pull the Node.js Docker image
FROM node:14

# create the directory inside the container
WORKDIR /app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

COPY tsconfig.json ./

COPY ormconfig.json ./
# copy source code to /app/src folder

RUN npm install

COPY . /app/

RUN npm run build

EXPOSE 8000

# the command that starts our app
CMD ["node", "./build/index.js"]
