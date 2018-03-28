<template>
  <div>
    <h1>Login</h1>
    <input
      type="text"
      name="identifier"
      v-model="identifier"
      placeholder="Username/Email"
    />
    <br>
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="Password"
    />
    <br>
    <div v-html="error" class="error" />
    <button @click="login">Login</button>
  </div>
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
  .error {
    color: red;
  }
</style>
