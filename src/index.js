import express from 'express'
import router from './routes/index.js'

const app = express()

const port = process.env.PORT || 3000

app.use('/', router)

app.use(express.json())

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
