import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/search/searchSlice'
import houseReducer from '../features/houses/houseSlice'
import postReducer from '../features/posts/postSlice'
import requestReducer from '../features/requests/requestSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer, 
    search: searchReducer,
    houses: houseReducer,
    posts: postReducer,
    requests: requestReducer, 
  },
});
