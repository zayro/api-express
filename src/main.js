
import path from 'path'
import fs from 'fs'
import http from 'http'
import https from 'https'

// Import
import app from './app.js'
import { Server } from 'socket.io'

const privateKey = fs.readFileSync(path.join(__dirname, '../ssl/key.pem'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../ssl/cert.pem'), 'utf8')

const credentials = { key: privateKey, cert: certificate }

export const httpServer = http.createServer(app)
export const httpsServer = https.createServer(credentials, app)

export const io = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true
  }
})
