<template>
  <div>
    <h1>Register</h1>
    <input
      type="text"
      name="email"
      v-model="email"
      placeholder="email"
    />
    <br>
    <input
      type="text"
      name="username"
      v-model="username"
      placeholder="Username"
    />
    <br>
    <input
      type="text"
      name="firstname"
      v-model="firstName"
      placeholder="First Name"
    />
    <br>
    <input
      type="text"
      name="lastname"
      v-model="lastName"
      placeholder="Last Name"
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
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthService.registerUser({
          email: this.email,
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password
        })
        console.log('register button was clicked', response.data)
      } catch (err) {
        this.error = err.response.data.error
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
