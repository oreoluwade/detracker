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
      password: ''
    }
  },
  methods: {
    async login () {
      const response = await AuthService.login({
        identifier: this.identifier,
        password: this.password
      })
      console.log('login button was clicked', response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
