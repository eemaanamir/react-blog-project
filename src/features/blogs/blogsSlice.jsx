import { createSlice,} from "@reduxjs/toolkit";
import {
    fetchBlogDetail,
    fetchBlogs,
    createDraftBlog,
    fetchDraftList,
    updateDraftBlog,
    fetchPublishedList
} from "./blogsThunks.jsx";
import {DRAFT, PUBLISHED, RequestStatus} from "../../app/constants.jsx";


const initialState = {
    blogs: [],
    status: RequestStatus.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    expandedBlog: null,
    expandedBlogError: null,
    drafts: [],
    draftsStatus: RequestStatus.IDLE,
    message: null,
    draftsError:null,
    published: [],
    publishedStatus: RequestStatus.IDLE,
    publishedError: null,
}

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        clearBlogMessage: (state) => {
            state.message= null
        },
        clearDraftError: (state) =>{
            state.draftsError = null
        },
        resetBlogsSlice:(state) =>{
            state.blogs= []
            state.status= RequestStatus.IDLE
            state.error= null
            state.expandedBlog= null
            state.expandedBlogError= null
            state.drafts= []
            state.draftsStatus= RequestStatus.IDLE
            state.message= null
            state.draftsError= null
        },
        clearExpandedBlog: (state) =>{
            state.expandedBlog= null
            state.expandedBlogError= null
        }
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
            .addCase(createDraftBlog.fulfilled, (state, action)=> {
                state.message = action.payload.is_published? PUBLISHED: DRAFT
                state.draftError = null
            })
            .addCase(createDraftBlog.rejected,(state,action) =>{
                state.draftError = action.error.message
            })
            .addCase(fetchDraftList.pending, (state)=>{
                state.draftsStatus = RequestStatus.LOADING
            })
            .addCase(fetchDraftList.fulfilled, (state,action)=>{
                state.drafts = action.payload
                state.draftError = null
                state.draftsStatus = RequestStatus.SUCCEEDED
            })
            .addCase(fetchDraftList.rejected, (state,action)=>{
                state.draftError= action.error.message
                state.draftsStatus = RequestStatus.FAILED
            })
            .addCase(updateDraftBlog.fulfilled,(state,action) =>{
                state.message = action.payload.is_published? PUBLISHED: DRAFT
                state.draftError = null
                state.expandedBlog = action.payload
            })
            .addCase(updateDraftBlog.rejected,(state,action) =>{
                state.draftsError = action.error.message
            })
            .addCase(fetchPublishedList.pending, (state)=>{
                state.publishedStatus = RequestStatus.LOADING
            })
            .addCase(fetchPublishedList.fulfilled, (state,action)=>{
                state.published = action.payload
                state.publishedError = null
                state.publishedStatus = RequestStatus.SUCCEEDED
            })
            .addCase(fetchPublishedList.rejected, (state,action)=>{
                state.publishedError= action.error.message
                state.publishedStatus = RequestStatus.FAILED
            })
    }
})


export const { clearBlogMessage,
    clearDraftError,
    resetBlogsSlice,
    clearExpandedBlog} = blogsSlice.actions

export default blogsSlice.reducer