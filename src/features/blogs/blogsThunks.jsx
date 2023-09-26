import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, BLOG_LIST_URL, CREATE_DRAFT_URL, DRAFT_LIST_URL} from "../../app/constants.jsx";

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


export const createDraftBlog = createAsyncThunk( 'blogs/createDraftBlog',
    async (draftDetails) =>{
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const response = await axios.post(CREATE_DRAFT_URL, draftDetails ,axiosConfig)
        return response.data
    })

export const fetchDraftList = createAsyncThunk( 'blogs/fetchDraftList',
    async () =>{
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const response = await axios.get(DRAFT_LIST_URL, axiosConfig)
        return response.data
    })

export const updateDraftBlog = createAsyncThunk( 'blogs/updateDraftBlog',
    async (draftDetails) =>{
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const UPDATE_DRAFT_URL = `${BASE_URL}/blogs/${draftDetails.id}/edit/`
        const response = await axios.put(UPDATE_DRAFT_URL, draftDetails ,axiosConfig)
        return response.data
    })