import api from './index'

class Login {
  login = (account, password) => api.getAxios('/api/login', {account, password})
}

export default Login
