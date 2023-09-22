import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"
const USER_LOGIN_URL = `${BASE_URL}/users/login/`
const USER_SIGNUP_URL =  `${BASE_URL}/users/signup/`

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const response = await axios.post(USER_LOGIN_URL, userCredentials)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data
    }
)
export const signupUser = createAsyncThunk(
    'user/signupUser',
    async (userDetails) => {
        const response = await axios.post(USER_SIGNUP_URL, userDetails)
        return response.data
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userUpdates) => {
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const response = await axios.put(`${BASE_URL}/users/${localStorage.getItem("userID")}/profile/edit/`, userUpdates, axiosConfig)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data
    }
)

const userSlice = createSlice({
    name: "users",
    initialState:{
        loading:false,
        user:null,
        error:null,
        message: ''
    },
    reducers:{
        clearMessage: (state) => {
            return {
                ...state,
                message: ""
            };
        },
        clearError: (state) =>{
            return {
                ...state,
                error: null
            };
        },
        logout:() =>{
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            localStorage.removeItem("userID")
            return{
                loading:false,
                user:null,
                error:null,
                message: 'Logout Successful'
            }
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(loginUser.pending, (state) =>{
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                localStorage.setItem("token", action.payload["token"])
                localStorage.setItem("userID", action.payload.user.id)
                return {
                    ...state,
                    loading: false,
                    error: null,
                    user: action.payload.user,
                };
            })
            .addCase(loginUser.rejected, (state, action)=>{
                return {
                    ...state,
                    loading: false,
                    user: null,
                    error:
                        action.error.message === 'Request failed with status code 400'
                            ? 'Invalid Credentials Entered'
                            : (state.error = action.error.message),
                };
            })
            .addCase(signupUser.fulfilled, (state)=>{
                return {
                    ...state,
                    message: "Signup Successful",
                    error: null
                };
            })
            .addCase(signupUser.rejected, (state, action)=>{
                return {
                    ...state,
                    loading: false,
                    user: null,
                    error:
                        action.error.message === 'Request failed with status code 400'
                            ? 'This email is already in use. Please use a different email.'
                            : (state.error = action.error.message),
                };
            })
            .addCase(updateUser.fulfilled, (state,action) =>{
                return {
                    ...state,
                    user: action.payload.user,
                    message: "Update Successful",
                    error:null
                }
            })
            .addCase(updateUser.rejected, (state, action) =>{
                return {
                    ...state,
                    error: action.error.message
                }
            })

    }
});

export const userSelector = (state) => state.users

export const {clearMessage,
    clearError,
    logout} = userSlice.actions
export default userSlice.reducer;

