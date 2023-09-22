import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"
const BLOG_LIST_URL = `${BASE_URL}/blogs/list/`;

const initialState = {
    blogs: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    expandedBlog: null,
    expandedBlogError: null
}

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs',
    async () => {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };
    const response = await axios.get(BLOG_LIST_URL, axiosConfig)
    return response.data
})

export const fetchBlogDetail = createAsyncThunk( 'blogs/fetchBlogDetail',
    async (blogID) =>{
    const BLOG_DETAIL_URL = `${BASE_URL}/blogs/${blogID}/detail/`
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };
    const response = await axios.get(BLOG_DETAIL_URL, axiosConfig)
    return response.data
})

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.blogs = action.payload
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed'
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

export const selectAllBlogs = (state) => state.blogs.blogs;
export const getBlogsStatus = (state) => state.blogs.status;
export const getBlogsError = (state) => state.blogs.error;

export const selectExpandedBlog = (state) => state.blogs.expandedBlog

export const getExpandedBlogError = (state) => state.blogs.expandedBlogError

// export const {  } = blogsSlice.actions

export default blogsSlice.reducer