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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ''
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
  }
})

export const { reset } = postSlice.actions
export default postSlice.reducer