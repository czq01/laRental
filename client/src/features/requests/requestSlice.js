import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import requestService from "./requestService"

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: ''
}

// export const handleRequest = createAsyncThunk(
//   'handleRequest',
//   async (requestData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await requestService.handleRequest(token, requestData)
//     } catch (error) {
//       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   })


export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ''
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(handleRequest.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(handleRequest.fulfilled, (state) => {
  //       state.isLoading = false
  //       state.isSuccess = true
  //     })
  //     .addCase(handleRequest.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload
  //     })
  // }
})

export const { reset } = requestSlice.actions
export default requestSlice.reducer