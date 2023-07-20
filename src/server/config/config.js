require('dotenv').config();

const {database, username, password, host} = process.env;
const config = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "postgres"
  },
  "test": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "postgres"
  },
  "production": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "postgres"
  }
}

module.exports = config;