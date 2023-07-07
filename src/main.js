import http from 'http'

// Import
import app from './app.js'
import { Server } from 'socket.io'

import { createClient } from 'redis'

const httpServer = http.createServer(app)

/**
 * REDIS
 */

const clientRedisExpress = createClient({ url: process.env.REDIS_URL })

const clientRedis = createClient({ url: process.env.REDIS_URL })

clientRedis.connect().then(() => {
  console.log('conectado redis')
}).catch(e => {
  console.log('error redis', e)
})

clientRedis.on('error', (err) =>
  console.log('Redis clientRedis Error', err)
)

clientRedis.on('connect', (err) => {
  if (err) throw err
  console.log('connect redis')
})

clientRedis.on('ready', (err) => {
  if (err) throw err
  console.log('ready redis')
})

clientRedis.on('end', (err) => {
  if (err) throw err
  console.log('end')
})

clientRedis.publish('task.test', 'nuevo usuario')

clientRedis.subscribe('task.test', (message) => {
  console.log('task.test', message)
})

/**
 * SOCKET
 */

const io = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true
  }
})

// For Socket ADMIN UI
const { instrument } = require('@socket.io/admin-ui')

instrument(io, {
  auth: false
})

let users = []
const tiempoTranscurrido = Date.now()
const hoy = new Date(tiempoTranscurrido)

io.on('connection', (socket) => {
  console.log('🚀 connection ~ socket', socket.id)

  users.push({
    id: socket.id,
    dateTime: hoy.toLocaleDateString(),
    dateTimeUtc: hoy.toUTCString(),
    handshake: socket.handshake
  })
  app.locals.users = users

  socket.on('subscribe', (data) => {
    const { username, room, info } = data
    console.log('[socket]', 'join room :', data)
    const user = {
      username: username,
      id: socket.id,
      room: room,
      dateTime: hoy.toLocaleDateString(),
      dateTimeUtc: hoy.toUTCString(),
      info: info
    }

    if (users.some(objeto => objeto.id === socket.id)) {
      // socket.leave(objeto.room)
      users.find(item => item.id === socket.id).room = room
      users.find(item => item.id === socket.id).username = username
      socket.join(room)
    } else {
      users.push(user)
      socket.join(room)
    }

    // const foundIndex = users.findIndex((item) => item.id === socket.id)
    // send all users

    if (users.filter((item) => item.room === room).length > 1) {
      io.to(socket.id).emit(room, false)
    }

    const uniqueUsers = users.filter((item, index) => {
      return index === users.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(item)
      })
    })

    app.locals.users = uniqueUsers

    console.log('🚀 subscribe ~ socket.on ~ users', uniqueUsers, room)
    io.sockets.emit('users', uniqueUsers)
  })

  socket.on('unsubscribe', function (data) {
    try {
      const { username, room } = data
      console.log('[socket]', 'leave room :', room, socket.id, username)

      users = users.filter(function (item) {
        return item.id !== socket.id && item.username !== room
      })

      app.locals.users = users
      socket.leave(room)
      socket.to(room).emit('user left', socket.id)
    } catch (e) {
      console.log('[error]', 'leave room :', e)
      socket.emit('error', 'couldnt perform requested action')
    }
  })

  socket.on('private message', ({ content, to }) => {
    socket.to(to).emit('private message', {
      content,
      from: socket.id
    })
  })

  // Escucha y Envia Mensajes a una sala general
  socket.on('messageRoom', ({ to, content }) => {
    console.log('🚀 ~ socket.on ~ messageRoom:')

    io.to(to).emit('message', content)
  })

  socket.on('user', () => {
    console.log('usuarios', users)
  })

  socket.on('connect', () => {
    console.log('🚀 connect ~ socket.on ~ users', users)
  })

  socket.on('disconnect', () => {
    console.log('🚀 Disconnect ~ socket.on ~ users', socket.id)
    users = users.filter((item) => item.id !== socket.id)
    console.log('🚀 Disconnect ~ socket.on ~ users', users)
    app.locals.users = users
  })
})

export { httpServer, app, clientRedisExpress }
