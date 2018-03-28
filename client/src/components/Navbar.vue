<template>
  <v-toolbar fixed class="teal lighten-3">
    <v-toolbar-title class="mr-4">
      <span @click="navigateTo({ name: 'root'})" class="home">
        DE Tracker
      </span>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        flat dark
        @click="
        navigateTo({ name: 'login'})"
      >
        Login
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn
        flat dark
        @click="
        navigateTo({ name: 'register'})"
      >
        Sign Up
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    cursor: pointer;
  }

  .home:hover {
    color: #e4e4e4;
  }
</style>
