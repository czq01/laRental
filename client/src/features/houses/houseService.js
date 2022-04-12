import axios from 'axios'

const API_URL = '/house'

const getHouseBySearch = async (searchData) => {
  var {addr, priceRange, distRange, amenities} = searchData
  priceRange = priceRange.join()
  distRange = distRange * 1000
  amenities = amenities.join()
  const url = `${API_URL}?addr=${addr}&distRange=${distRange}&priceRange=${priceRange}&amenities=${amenities}`
  console.log(url)

  const response = await axios.get(url)
  
  return response.data
}

const houseService = {
  getHouseBySearch,
}

export default houseService