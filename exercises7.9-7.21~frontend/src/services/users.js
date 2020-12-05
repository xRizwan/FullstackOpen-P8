import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getUser = async (userId) => {
  const request = await axios.get(`${baseUrl}/${userId}`)
  return request.data
}

export default {
  getAll,
  getUser,
}