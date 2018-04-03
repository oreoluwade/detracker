<template>
  <v-layout>
    <v-flex xs4>
    <panel title="Transaction Metadata">
      <div class="pl-4 pr-4 pt-2 pb-2">
        <form
          name="transaction-form"
          autocomplete="off">
          <v-text-field
            label="Title"
            v-model="title"
          ></v-text-field>
          <v-text-field
            label="YYYY-MM-DD"
            v-model="date"
          ></v-text-field>
          <v-text-field
            label="Amount"
            v-model="amount"
          ></v-text-field>
        </form>
        <br>
        <span v-html="error" class="red--text" />
        <br>
        <v-btn
          @click="addTransaction"
          class="teal lighten-3">
          Add
        </v-btn>
      </div>
    </panel>
    </v-flex>
      <v-flex xs8>
        <panel title="Transaction Description" class="ml-2">
          <v-text-field
            label="Description (Optional)"
            multi-line
            v-model="description"
          ></v-text-field>
        </panel>
      </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import TransactionService from '@/services/TransactionService'
export default {
  data () {
    return {
      title: '',
      description: '',
      amount: null,
      date: new Date().toISOString().slice(0, 10),
      error: '',
      userId: ''
    }
  },
  components: {
    Panel
  },
  methods: {
    async addTransaction () {
      console.log('the transaction button was clicked')
      try {
        const response = await TransactionService.addNewTransaction({
          title: this.title,
          description: this.description,
          amount: this.amount,
          date: this.date,
          userId: this.userId
        })
        this.$router.push({
          name: 'transactions'
        })
        console.log('New Transaction added', response.data)
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  },
  created () {
    if (this.$store.state.user) {
      this.userId = this.$store.state.user.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
