<h1> Test Project </h1>

## Description

- A test project made for  **RYDE**.

<br/>

## Project Stack

- Docker
- MongoDB
- Express
- NodeJS
  <br/>

### Installation

- install the **[docker](https://docs.docker.com/engine/install/ubuntu/)** and **[docker compose](https://docs.docker.com/compose/install/)**.
  <br/>


## Development
- pull the project,
  ```sh
  $ git clone 
  ```
- get inside to project directory,
  ```sh
  $ cd ryde
  ```
- install dependencies
  ```sh
  $ npm install
  ```
- start the project
  ```sh
  $ npm run start
  ```
- start test
  ```sh
  $ npm run test
  ```

## Docker
- in terminal, run this command inside the project directory to start docker.

  ```sh
  $ docker-compose build;
  $ docker-compose up;
  ```

- use the following command to stop docker.

  ```sh
  $ docker-compose down;
  ```

- Visit **http://localhost:4200** for accessing the API endpoints.
  <br/>

## Postman
- There's a postman collection file on the root directory
- There's an API documentation here: **https://documenter.getpostman.com/view/3572326/TzsWrp8C**
