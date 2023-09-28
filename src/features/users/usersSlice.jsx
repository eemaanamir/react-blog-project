import { createSlice,} from "@reduxjs/toolkit";
import {loginUser, signupUser, updateUser} from "./usersThunks.jsx";
import Cookies from 'js-cookie';


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
            state.message= ""
        },
        clearError: (state) =>{
            state.error = null
        },
        logout:(state) =>{
            localStorage.removeItem("user")
            Cookies.remove("token");
            // localStorage.removeItem("token")
            localStorage.removeItem("userID")
            state.loading=false
            state.user=null
            state.error=null
            state.message='Logout Successful'
        },
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
                Cookies.set("token", action.payload["token"], {expires: 7,})
                // localStorage.setItem("token", action.payload["token"])
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
                console.log(state.user)
                return {
                    ...state,
                    user: action.payload,
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

export const {clearMessage,
    clearError,
    logout} = userSlice.actions
export default userSlice.reducer;

