// knexfile.js
// npx knex init (to initialise a knexfile.js)
// run below command to generate tables in DB
//npx knex migrate:latest

export default {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: '',
      password: '',
      database: ''
    },
    migrations: {
      directory: './src/models'
    }
  }
}