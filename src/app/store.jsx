import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import usersReducer from '../features/users/usersSlice.jsx';
import blogsReducer from '../features/blogs/blogsSlice.jsx'

const persistConfig = {
    key: 'root',
    storage,
}
const persistedUsersReducer = persistReducer(persistConfig, usersReducer)
const persistedBlogsReducer = persistReducer(persistConfig, blogsReducer)

export const store = configureStore({
    reducer: {
        users: persistedUsersReducer,
        blogs: persistedBlogsReducer,
    }
})

export const persistor = persistStore(store)
