# Node.js Express Web Server with PostgreSQL and JWT Authentication
Node + Express + PostgreSQL

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Env](#env)
- [Usage](#usage)

<a name="features"></a>
## Features already implemented

- Login, Register, Email Confirmation
- Cookie for JWT 
- Timeline
- Visitors tracking with ip, location..

<a name="requirements"></a>
## Requirements

- Node.js (version 20.3.1)
- PostgreSQL 
- npm (version 9.6.7) or
- yarn (version 1.22.19)
- send grid account with an api key
- ipinfo account with a key

<a name="installation"></a>
## Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:lishenyu16/express-server.git
   cd express-server
   ```

2. Install dependencies
   ```sh
   yarn install
   npm install
   ```
 3. install a local database with pgadmin or clound db like elephantSql or aws RDS

<a name="env"></a>
## .env file
A sample .env would be like below:
  ```sh
  PORT=[your port number]
  NODE_ENV="production"
  DATABASE_URL=[a string to connecto the db, containing the username, host and port...
  SENDGRID_API_KEY=[sendGrid api key]
  TOKEN_SERECT=[your own secret string]
  IPINFO_TOKEN=[your ipinfo token
  ```
<a name="usage"></a>
## Usage
1. Start the server:
  ```sh
    yarn start
  ```
2. The server will be running at localhost:[your port] by default.



