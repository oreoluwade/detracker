import Api from '@/services/Api'

export default {
  getAllTransactions () {
    return Api().get('transaction/all')
  },
  addNewTransaction (credentials) {
    return Api().post('transaction/create', credentials)
  }
}
