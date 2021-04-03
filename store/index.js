export const state = () => ({
  user: {}, //объекты со своими полями
  messages: [] //просто массив сообщений
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearUser(state){
    state.user = {}
    state.messages = []
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
  }
}
