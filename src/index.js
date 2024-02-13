import express from 'express'
import router from './routes/index.js'
import knex from 'knex'

const { 
	PG_PORT = 5432, 
	PG_HOST = 'localhost', 
	PG_USERNAME, 
	PG_PASSWORD, 
	PG_DATABASE
 } = process.env

export const db = knex({
	client: 'pg',
	connection: {
		host: PG_HOST,
		port: PG_PORT,
		user: PG_USERNAME,
		password: PG_PASSWORD,
		database: PG_DATABASE
	}
})

db.raw('SELECT 1')
  .then(() => console.log(`Connected to ${PG_DATABASE} database`))	
  .catch((err) => console.log('Connection failed', err));

const app = express()

const port = process.env.PORT || 3000

app.use('/', router)

app.use(express.json())

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
