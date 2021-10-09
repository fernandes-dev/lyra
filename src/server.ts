import cors from 'cors'
import express from 'express'

import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { routes } from './routes'

const port = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.get('/', (request, response) =>
  response.json({ message: 'Welcome to Lyra API 1' })
)

app.get('/verify-auth', ensureAuthenticated, (request, response) =>
  response.send()
)

app.listen(port, () => console.log(`🚀 app running on port ${port}`))
