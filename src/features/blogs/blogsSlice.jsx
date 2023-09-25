import { createSlice,} from "@reduxjs/toolkit";
import {fetchBlogDetail, fetchBlogs} from "./blogsThunks.jsx";
import {RequestStatus} from "../../app/constants.jsx";


const initialState = {
    blogs: [],
    status: RequestStatus.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    expandedBlog: null,
    expandedBlogError: null

}

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = RequestStatus.LOADING
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = RequestStatus.SUCCEEDED
                state.blogs = action.payload
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = RequestStatus.FAILED
                state.error = action.error.message
            })
            .addCase(fetchBlogDetail.fulfilled, (state,action) => {
                state.expandedBlog = action.payload
                state.expandedBlogError = null
            })
            .addCase(fetchBlogDetail.rejected, (state,action)=>{
                state.expandedBlogError = action.error.message
            })
    }
})


// export const {  } = blogsSlice.actions

export default blogsSlice.reducer