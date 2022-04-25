import axios from 'axios'

const API_URL = '/request'

const getRequestById = async (request_id) => {
  const response = await axios.get(API_URL + `/${request_id}`)
  return response.data
}

const getRequestsByIds = async (request_ids) => {
  const ids_string = request_ids.join(',')
  const response = await axios.get(
    API_URL + '/ids',
    {params: {request_ids: ids_string}}
  )
  return response.data
}

const getMyRequests = async (token) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  } 
  const response = await axios.get(API_URL + '/my', config)

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

const handleRequest = async (token, requestData) => {

  const {request_id, status} = requestData
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + `/${request_id}`, {status}, config)

  return response.data
}

const deleteRequest = async (token, request_id) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  } 
  const response = await axios.delete(API_URL + `/${request_id}`, config)

  return response.data
}

const requestService = {
  getRequestById,
  getRequestsByIds,
  createRequest,
  handleRequest,
  getMyRequests,
  deleteRequest,
}

export default requestService