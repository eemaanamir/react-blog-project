import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, EMAIL_VERIFICATION_URL, USER_LOGIN_URL, USER_SIGNUP_URL} from "../../app/constants.jsx";
import Cookies from 'js-cookie';


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const response = await axios.post(USER_LOGIN_URL, userCredentials)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data
    }
)

export const verifyUser = createAsyncThunk(
    'user/verifyUser',
    async (userCredentials) => {
        const response = await axios.put(EMAIL_VERIFICATION_URL, userCredentials)
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
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        };
        const response = await axios.put(`${BASE_URL}/users/${localStorage.getItem("userID")}/profile/edit/`, userUpdates, axiosConfig)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data
    }
)