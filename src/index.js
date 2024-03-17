import express from 'express'
import router from './routes/index.js'
import knex from 'knex'

const {
	APP_ENV = 'local',
	PG_PORT = 5432, 
	PG_HOST = 'localhost', 
	PG_USERNAME, 
	PG_PASSWORD, 
	PG_DATABASE,
 } = process.env

let dbConfig = {
	client: 'pg',
	connection: {
		host: PG_HOST,
		port: PG_PORT,
		user: PG_USERNAME,
		password: PG_PASSWORD,
		database: PG_DATABASE
	}
}

export let db = knex(dbConfig)

if(APP_ENV !== 'local') {
	dbConfig.connection.ssl = {
		rejectUnauthorized: false
	}
	db = knex(dbConfig)
}

db.raw('SELECT 1')
  .then( async () => {
	console.log(`Connected to ${PG_DATABASE} database`)
	// await db.destroy()
	// console.log('Connection closed')
  })	
  .catch((err) => console.log('Connection failed', err));

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/', router)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
