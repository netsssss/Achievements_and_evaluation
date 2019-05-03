import api from './index'

class Teach {
  getTeach = () => api.getAxios('/api/teach', {})
}

export default Teach
