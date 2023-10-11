import {createAsyncThunk} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import {CHECKOUT_PREMIUM_URL} from "../../app/constants.jsx";

export const checkoutPremium = createAsyncThunk(
    'user/checkoutPremium',
    async() =>{
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`,
            },
        };
        const response = await axios.post(CHECKOUT_PREMIUM_URL,{}, axiosConfig)
        return response.data
    }
)