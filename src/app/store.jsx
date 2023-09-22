import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import usersReducer from '../features/users/usersSlice.jsx';
import blogsReducer from '../features/blogs/blogsSlice.jsx'

const persistConfig = {
    key: 'root',
    storage,
}
const persistedUserReducer = persistReducer(persistConfig, usersReducer)

export const store = configureStore({
    reducer: {
        users: persistedUserReducer,
        blogs: blogsReducer
    }
})

export const persistor = persistStore(store)
