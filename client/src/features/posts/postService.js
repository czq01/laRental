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

const postService = {
  createPost,
}

export default postService