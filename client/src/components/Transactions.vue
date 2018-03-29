<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Transactions">
        <div v-for="transaction in transactions" :key="transaction.id">
          {{transaction.title}}
          {{transaction.amount}}
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import TransactionService from '@/services/TransactionService'
import Panel from '@/components/Panel'
export default {
  name: 'Transactions',
  data () {
    return {
      transactions: null
    }
  },
  async mounted () {
    // Make a request to the backend for all user transactions
    this.transactions = (await TransactionService.getAllTransactions()).data
    console.log(this.transactions)
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
