<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app mobile-breakpoint="650"> <!--Скрываем сайдбар при 650 пикселях и меньше-->
      <v-list dense>
        <v-subheader>Users</v-subheader>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="user in users"
            :key="user.id">
            <v-list-item-avatar>
              <v-img
                :alt="`${user.name} avatar`"
                :src="require('../assets/avatar_1.png')"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="user.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon :color="user.id === selectedItem+1 ? 'primary' : 'grey'">
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
      <v-toolbar-title v-text="getName" :class="{moved: drawer}"/>
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
    ...mapState(["user"])
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: 'Jason Oner',
        },
        {
          id: 2,
          name: 'Mike Carlson',
        },
        {
          id: 3,
          name: 'Cindy Baker',
        },
        {
          id: 4,
          name: 'Ali Connors',
        },
        {
          id: 5,
          name: 'Mr Perdusha',
        },
      ],
      drawer: false,
      right: true,
      selectedItem: -1,
      items: [
        {text: 'Real-Time', icon: 'mdi-clock'},
        {text: 'Audience', icon: 'mdi-account'},
        {text: 'Conversions', icon: 'mdi-flag'},
      ],
    }
  },
  methods: {
    ...mapMutations(['clearUser']),
    exit() {
      this.clearUser();
      this.$router.push("/?message=leftChat")
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
