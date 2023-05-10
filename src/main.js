import http from 'http'

// Import
import app from './app.js'
import { Server } from 'socket.io'

export const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true
  }
})
