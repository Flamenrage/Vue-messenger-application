const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, text, id) => ({name, text, id}) //transform to object

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => { //data: name, room. cb = то, что, будет срабатывать в index.vue
    if (!data.name || !data.room) {
      return cb('data is invalid')
    }
    socket.join(data.room) //соединение пользователей в комнате
    cb({userId: socket.id}) //определяем id пользователя на фронте через сокет
    socket.emit('newMessage', m('admin', `Welcome, ${data.name}!`))
    socket.emit('newMessage', m('TEST', `Welcome!`))
    socket.broadcast.to(data.room) //вычеркиваем текущего пользователя, но оставляет всех остальных юзеров в этой комнате
      .emit('newMessage', m('admin', `User ${data.name} has entered the room`)) //говорим куда отправить сообщение
    //этот метод нужен для оповещения всех остальных пользователей о прибытии нового в данном чате
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
     return cb('Text must not be empty')
    }
    //io room logic
    //temp logic:
    // socket.on('createMessage', data => {
    //   setTimeout(() => {
    //     socket.emit('newMessage', {
    //       text: data.text + ' SERVER'
    //     })
    //   }, 500)
    // })
  })
})

module.exports = {
  app,
  server
}
