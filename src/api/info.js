import api from './index'

class Info {
  getStudent = () => api.getAxios('/api/student', {})
  getTeacher = () => api.getAxios('/api/teacher', {})
}

export default Info
