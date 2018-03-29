<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Transactions">
        <h1>You own your own transactions</h1>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  name: 'Transactions',
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
