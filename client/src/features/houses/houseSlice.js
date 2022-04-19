import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import houseService from "./houseService"

const initialState = {
  data: {
    count: 0,
    totalPages: 0,
    requestedAddr: '',
    houses: []
  },
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
      // console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  })

export const updateHouseLikes = createAsyncThunk('updateHouseLikes',
  async (house_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await houseService.updateHouseLikes(house_id, token)
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

export const sortHouseByPrice = createAsyncThunk('sortByPrice',
  async (search, thunkAPI) => {
    try {
      return await houseService.sortHouseByPrice(search)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // console.log(message)
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
        state.data = action.payload.data
      })
      .addCase(getHouseBySearch.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.houses = []
      })
      .addCase(updateHouseLikes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateHouseLikes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        
        const house = state.data.houses.find((house) => (
          house._id == action.payload.house._id
        ))
        
        house.likes = action.payload.house.likes
      })
      .addCase(updateHouseLikes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.houses = []
      })

      .addCase(sortHouseByPrice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sortHouseByPrice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.data
      })
      .addCase(sortHouseByPrice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.houses = []
      })
  }
})

export const { reset } = houseSlice.actions
export default houseSlice.reducer