import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (blogObject) => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const remove = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blogObject.id}`, config)
}

const comment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment)
  return response.data
}

export default { getAll, setToken, create, update, remove, comment }