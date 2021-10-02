import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const port = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.get('/', (request, response) => {
  return response.json({ message: 'Welcome to Lyra API' })
})

app.get('/verify-auth', ensureAuthenticated, (request, response) => {
  return response.json({ message: 'Welcome to Lyra API' })
})

app.listen(port, () => console.log(`🚀 app running on port ${port}`))