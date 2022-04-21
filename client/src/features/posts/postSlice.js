import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postService from "./postService"

const initialState = {
  posts: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: ''
}

export const createPost = createAsyncThunk(
  'createPost',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPost(token, postData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

export const getPostBySearch = createAsyncThunk(
  'getPostBySearch',
  async (searchData, thunkAPI) => {
    try {
      return await postService.getPostBySearch(searchData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ''
    },
    updatePost: (state, action) => {
      const postToUpdate = state.posts.find(post => (
        post._id = action.payload.post
      ))
      postToUpdate.requestedBy.push(action.payload._id)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.unshift(action.payload.post)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getPostBySearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPostBySearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload.posts
      })
      .addCase(getPostBySearch.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset, updatePost } = postSlice.actions
export default postSlice.reducer