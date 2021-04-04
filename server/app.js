const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id) => ({name, text, id}) //transform to object

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => { //data: name, room. cb = то, что, будет срабатывать в index.vue
    if (!data.name || !data.room) {
      return cb('data is invalid')
    }
    socket.join(data.room) //соединение пользователей в комнате
    users.remove(socket.id) //на всякий случай очищаем юзера
    const cl = {
      id: socket.id,
      name: data.name,
      room: data.room
    }
    users.add(cl)
    cb({userId: socket.id}) //определяем id пользователя на фронте через сокет
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Welcome, ${data.name}!`))
    socket.broadcast.to(data.room) //вычеркиваем текущего пользователя, но оставляет всех остальных юзеров в этой комнате
      .emit('newMessage', m('admin', `User ${data.name} has entered the room`)) //говорим куда отправить сообщение
    //этот метод нужен для оповещения всех остальных пользователей о прибытии нового в данном чате
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
     return cb('Text must not be empty')
    }
    //io room logic
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage',m(user.name, data.text, data.id)) //оповещаем остальных пользователей об отправленном сообщении
    }
    cb() //очищаем текст сообщения на фронтенде
  })

  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if (user){
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage',m('admin',`User ${user.name} has left the room`))
    }
    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user){
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage',m('admin',`User ${user.name} has left the room`))
    }
  })
})

module.exports = {
  app,
  server
}
