const http = require('http')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Socket.io start')
})

const httpServer = http.createServer(app)

httpServer.listen(3003, () => {
  console.log('connec api')
})

const io = require('socket.io')(httpServer, {
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

io.on('connection', socket => {
  socket.on('join server', ({ username, room }) => {
    const user = {
      username: username,
      id: socket.id,
      room: room
    }

    socket.join(room)
    users.push(user)

    // const foundIndex = users.findIndex((item) => item.id === socket.id)
    // send all users
    if (users.filter(item => item.room === 'about').length > 1) {
      io.to(socket.id).emit('access', false)
    }

    io.sockets.emit('users', users)
    console.log('🚀CONNET ~ socket.on ~ user', user)
  })

  socket.on('messageRoom', ({ to, content }) => {
    io.to(to).emit('message', content)
  })

  socket.on('disconnect', () => {
    users = users.filter(item => item.id !== socket.id)
    console.log('🚀 Disconnect ~ socket.on ~ users', users)
  })
})
