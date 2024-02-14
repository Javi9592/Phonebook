import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
  return response.data
  }
  
  const create = async newObject => {
    const request = axios.post(baseUrl, newObject)
    const response = await request
    return response.data
  }
  
  const remove = async id => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    const response = await request
    return response.data
  }
  
  const update = async (id, updatedObject) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, updatedObject)
    const response = await request
    return response.data
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default {
    getAll,
    create,
    remove,
    update
  }