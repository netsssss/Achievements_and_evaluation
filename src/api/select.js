import api from './index'

class Select {
  getSelect = () => api.getAxios('/api/select', {})
}

export default Select
