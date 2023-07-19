require('dotenv').config();

const {database, username, password } = process.env;
const config = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": username,
    "password": password,
    "database": database,
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": username,
    "password": password,
    "database": database,
    "host": "localhost",
    "dialect": "postgres"
  }
}

module.exports = config;