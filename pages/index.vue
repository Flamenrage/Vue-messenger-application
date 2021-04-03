<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8>
      <v-card min-width="400">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title class="justify-center">Vue chat application</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Your name"
              required
            ></v-text-field>
            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Room"
              required
            ></v-text-field>
            <v-flex class="center-button">
              <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit">
                Sign in
              </v-btn>
            </v-flex>
          </v-card-text>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import empty from "@/layouts/empty";
import {mapMutations} from 'vuex'

export default {
  layout: "empty",
  components: {
  },
  head: {
    title: "vue-appchat"
  },
  sockets: {
    connect() {
      console.log('connect method working')
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 16 characters'
    ],
    room: '',
    roomRules: [
      v => !!v || 'room Id is required'
    ],
  }),

  methods: {
    ...mapMutations(["setUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit("userJoined", user, data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.center-button {
  padding-left: 35% !important;
}
</style>
