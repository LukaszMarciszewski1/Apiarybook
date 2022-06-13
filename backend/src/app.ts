import express, { Application } from 'express'
import cors from 'cors'
import { config } from './config/config'
import { connectDB } from './db/mongoose'
import apiaryRoutes from './routes/apiaries'

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use('/api/apiaries', apiaryRoutes)

connectDB()
app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`)
})

// .then(() => app.listen(config.server.port, () => {
//   console.log(`Server is running on port ${config.server.port}`)
// })
// )
// .catch(error => console.log(`${error} did not connect`))
