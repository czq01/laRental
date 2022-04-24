import axios from 'axios'

const API_URL = '/post'

const createPost = async (token, postData) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, postData, config)

  return response.data
}

const getPostBySearch = async (searchData) => {
  const {addr, distRange, page, limit} = searchData
  const url = API_URL + `?addr=${addr}&distRange=${distRange}&page=${page}&limit=10`
  const response = await axios.get(url)
  return response.data
}

const getPostsByIds = async (post_ids) => {
  const ids_string = post_ids.join(',')
  const response = await axios.get(
    API_URL + '/ids',
    {params: {post_ids: ids_string}}
  )
  return response.data
}

const postService = {
  createPost,
  getPostBySearch,
  getPostsByIds,
}

export default postService