<template>
  <div class="c-wrap">
    <div class="c-chat">
      <message v-for="m in messages" :key="m.text" :name="m.name" :text="m.text" owner>
      </message>
    </div>
    <div class="c-form">
      <chat-form></chat-form>
    </div>
  </div>
</template>

<script>

import def from "@/layouts/default";
import {mapState} from 'vuex'
import Message from "@/components/Message.vue";
import ChatForm from "@/components/ChatForm";

export default {
  layout: "def",
  components: {Message, ChatForm},
  middleware: ["chat"],
  head() { //обращаемся к контексту this, поэтому функция () {}
    return {
      title: "Room " + this.user.room
    }
  },
  data: () => ({}),
  computed: mapState(["user", "messages"]),
  methods: {
    submit() {
      // if (this.$refs.form.validate()) {
      //   const user = {
      //     name: this.name,
      //     room: this.room
      //   }
      //   this.setUser(user);
      //   this.$router.push('/chat')
      // }
    },
  }
}
</script>

<style scoped>
.c-wrap {
  height: 100%;
  position: relative; /*сдвиг относительно текущего положения*/
  overflow: hidden;
}

.c-form {
  position: absolute;
  bottom: 0; /* всегда снизу, фиксируем*/
  left: 0;
  right: 0;
  padding-top: 0rem;
  margin-bottom: 0px;
  height: 60px;
  background: #212121;
}

.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 60px;
  padding: 1rem;
  overflow-y: auto; /*для скролла*/
}
</style>
