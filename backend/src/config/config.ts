import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URI || ''
const SERVER_PORT = Number(process.env.SERVER_PORT) || 1337

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}