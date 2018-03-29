<template>
  <v-toolbar fixed class="teal lighten-3">
    <v-toolbar-title class="mr-4">
      <span @click="navigateTo({ name: 'root'})" class="home">
        DailyExpensesTracker
      </span>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        flat
        dark
        @click="navigateTo({ name: 'today'})">
        Check Today's Spending
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.userIsLoggedIn"
        flat
        dark
        @click="
        navigateTo({ name: 'login'})"
      >
        Login
      </v-btn>

      <v-btn
        v-if="!$store.state.userIsLoggedIn"
        flat
        dark
        @click="
        navigateTo({ name: 'register'})"
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
    navigateTo (route) {
      this.$router.push(route)
    },
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
