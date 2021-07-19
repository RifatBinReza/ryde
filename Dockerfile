FROM node:lts AS base
WORKDIR /app
COPY package.json /app/

# developmentDependencies
FROM base AS dependencies
WORKDIR /app
RUN npm install --loglevel=error

# development
FROM dependencies AS development
# ENV variables are available to the running conatiners
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
# mongodb url
ARG DATABASE_URL=mongodb://mongodb:27017/ryde
ENV DATABASE_URL $DATABASE_URL
# node will be listening in this port 
ARG PORT=4200
ENV PORT $PORT
#COPY . /app/
COPY --from=dependencies /app/node_modules /app/node_modules
WORKDIR /app
# When container starts it will run the npm local script 
CMD ["./wait-for-it.sh", "mongodb:27017", "--", "npm", "run", "dev"]
