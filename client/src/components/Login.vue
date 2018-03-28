<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="teal lighten-3" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <form
              name="login-form"
              autocomolete="off">
              <v-text-field
                label="Username/Email"
                v-model="identifier"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                autocomplete="new-password"
              ></v-text-field>
            </form>
            <br>
            <span v-html="error" class="red--text" />
            <br>
            <v-btn
              @click="login"
              class="teal lighten-3">
              Login
            </v-btn>
          </div>

      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Login',
  data () {
    return {
      identifier: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          identifier: this.identifier,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log('login button was clicked', response.data)
      } catch (err) {
        this.error = err.response.data.message
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
