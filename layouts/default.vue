<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app mobile-breakpoint="650"> <!--Скрываем сайдбар при 650 пикселях и меньше-->
      <v-list dense>
        <v-subheader>Users</v-subheader>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="u in users"
            :key="u.id">
            <v-list-item-avatar>
              <v-img
                :alt="`${u.name} avatar`"
                :src="require('../assets/avatar_1.png')"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="u.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon :color="u.id === user.id ? 'primary' : 'grey'">
                <!-- selectedIndex+1 из-за id-->
                mdi-message-outline
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="getName" />
      <v-spacer/>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark
                 v-bind="attrs" @click="exit"
                 v-on="on">
            <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Leave room</span>
      </v-tooltip>
    </v-app-bar>
    <v-content :class="{moved: drawer}">
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  computed: {
    getName() {
      return 'Room id: ' + this.user.room + ', chat page of ' + this.user.name
    },
    ...mapState(["user", "users"])
  },
  data() {
    return {
      drawer: false,
      right: true
    }
  },
  methods: {
    ...mapMutations(['clearUser']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, ()=>{ //cb функция - что происходит после срабатывания сокета
      this.clearUser();
      this.$router.push("/?message=leftChat")
      })
    }
  }
}
</script>

<style scoped>
.moved{
  padding-left: 250px !important;
}
@media screen and (max-width: 760px) {
  .moved{
    padding-left: 0px !important;
  }
}
</style>
