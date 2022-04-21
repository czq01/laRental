import axios from 'axios'

const API_URL = '/request'

const getRequestById = async (request_id) => {
  const response = await axios.get(API_URL + `/${request_id}`)
  return response.data
}

const createRequest = async (token, requestData) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, requestData, config)

  return response.data
}

const requestService = {
  getRequestById,
  createRequest,
}

export default requestService