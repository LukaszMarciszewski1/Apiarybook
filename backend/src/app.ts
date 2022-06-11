import express, { Application } from 'express'
import cors from 'cors'
import { config } from './config/config'
import { connectDB } from './db/mongoose'

const app: Application = express()
app.use(express.json())
app.use(cors())

connectDB()
.then(() => app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`)
  })
)
.catch(error => console.log(`${error} did not connect`))
