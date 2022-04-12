import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const search = JSON.parse(localStorage.getItem('search'))

const initialState = {
  search: search ? search : {}
}


export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      localStorage.setItem('search',
      JSON.stringify(Object.assign(state.search, action.payload)))
    }
  }
})

export const { updateSearch } = searchSlice.actions
export default searchSlice.reducer