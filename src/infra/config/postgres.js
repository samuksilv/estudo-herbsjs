require('dotenv').config()

module.exports = {
  herbsCLI: 'postgres',
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'dev',
    database: 'estudo-herbs'
  }
}
