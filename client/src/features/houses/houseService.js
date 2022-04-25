import axios from 'axios'

const API_URL = '/house'

const getHouseBySearch = async (searchData) => {

  let {addr, priceRange, distRange, amenities, page, limit} = searchData
  priceRange = priceRange.join()
  amenities = amenities.join()

  const url = `${API_URL}?addr=${addr}&distRange=${distRange}&priceRange=${priceRange}&amenities=${amenities}&page=${page}&limit=${limit}`

  const response = await axios.get(url)
  
  return response.data
}

const getHousesByLoc = async (locData) => {
  const {addr, distRange} = locData

  const url = `${API_URL}/loc?addr=${addr}&distRange=${distRange}`

  const response = await axios.get(url)

  return response.data
}

const getHouseById = async (house_id) => {
  const response = await axios.get(API_URL + `/${house_id}`)
  return response.data
}

const getHousesByIds = async (house_ids) => {
  const ids_string = house_ids.join(',')
  console.log(ids_string)
  const response = await axios.get(
    API_URL + '/ids',
    {params: {house_ids: ids_string}}
  )
  return response.data
}

const addHouse = async (houseData) => {
  const response = await axios.post(API_URL, houseData)
  return response.data
}

const updateHouseLikes = async (house_id, token) => {

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  
  const response = await axios.put(
    `${API_URL}/likes/${house_id}`, {}, 
    config)
    
  return response.data
}

const sortHouseByPrice = async (searchData) => {
  let {addr, priceRange, distRange, amenities, page, limit, sortBy, asc} = searchData
  priceRange = priceRange.join()
  amenities = amenities.join()

  const url = `${API_URL}?addr=${addr}&distRange=${distRange}&priceRange=${priceRange}&amenities=${amenities}&page=${page}&limit=${limit}&sortBy=${sortBy}&asc=${asc}`

  const response = await axios.get(url)

  return response.data
}

const houseService = {
  getHouseBySearch,
  getHousesByLoc,
  updateHouseLikes,
  sortHouseByPrice,
  getHouseById,
  getHousesByIds,
  addHouse,
}

export default houseService