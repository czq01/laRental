import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import houseService from "./houseService"

const initialState = {
  houses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getHouseBySearch = createAsyncThunk('main/houses',
  async (search, thunkAPI) => {
    try {
      return await houseService.getHouseBySearch(search)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

export const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHouseBySearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHouseBySearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.houses = action.payload.data
      })
      .addCase(getHouseBySearch.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.houses = []
      })
  }
})

export const { reset } = houseSlice.actions
export default houseSlice.reducer