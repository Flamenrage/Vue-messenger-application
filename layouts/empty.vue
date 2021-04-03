<template>
  <v-app app dark>
    <v-content>
      <v-container fluid class="move">
          <nuxt></nuxt>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
name: "empty"
}
</script>

<style scoped>
.move {
  padding-top: 20vh !important;
}
</style>
