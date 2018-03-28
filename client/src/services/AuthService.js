import Api from '@/services/Api'

export default {
  registerUser (credentials) {
    return Api().post('register', credentials)
  }
}
