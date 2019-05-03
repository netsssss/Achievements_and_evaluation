import api from './index'

class Score {
  getScore = () => api.getAxios('/api/score', {})
}

export default Score
