import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

export const config = {
    access_token: process.env.ACCESS_TOKEN
}