<template>
  <v-toolbar fixed class="teal lighten-3">
    <v-toolbar-title class="mr-4">
      <router-link
        class="home"
        :to="{ name: 'root'}">
        DailyExpensesTracker
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        flat
        dark
        :to="{ name: 'root'}">
        Check Today's Spending
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.userIsLoggedIn"
        flat
        dark
        :to="{ name: 'login'}">
        Login
      </v-btn>

      <v-btn
        v-if="!$store.state.userIsLoggedIn"
        flat
        dark
        :to="{ name: 'register'}"
      >
        Sign Up
      </v-btn>

      <v-btn
        v-if="$store.state.userIsLoggedIn"
        flat
        dark
        @click="logout"
      >
        Log Out
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'root' })
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
