import Api from '@/services/Api'

export default {
  registerUser (credentials) {
    return Api().post('user/register', credentials)
  },

  login (credentials) {
    return Api().post('user/login', credentials)
  }
}
