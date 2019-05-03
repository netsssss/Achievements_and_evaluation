import api from './index'

class User {
  getSelf = () => api.getAxios('/api/self', {})
  getUser = () => api.getAxios('/api/user', {})
}

export default User
