import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, BLOG_LIST_URL} from "../../app/constants.jsx";

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