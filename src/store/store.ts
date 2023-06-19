import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import productReducer from "../redux/slices/ProductSlice";
import cartReducer from "../redux/slices/CartSlice"


 const store = configureStore({
    reducer:{
        product:productReducer,
        cart:cartReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch