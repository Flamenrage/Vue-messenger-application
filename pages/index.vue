<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
    <h1>Title</h1>
      <v-btn @click="message">New message</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  sockets:{
    connect(){
      console.log('connect method working')
    }
  },
  methods:{
    message(){
      this.$socket.emit('createMessage', {
        text: 'from client'
      })
      console.log('message method activated')
    }
  }
}
</script>
