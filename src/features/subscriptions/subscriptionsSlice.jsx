import { createSlice,} from "@reduxjs/toolkit";
import {checkoutPremium,} from "./subscriptionsThunks.jsx";
import {PAYMENT_CANCELLED, PAYMENT_SUCCESSFUL} from "../../app/constants.jsx";


const subscriptionSlice = createSlice({
    name: "subscriptions",
    initialState:{
        loading:false,
        stripeCheckoutUrl: null,
        stripeSessionId: null,
        error:null,
        subscriptionMessage: null
    },
    reducers: {
        resetSubscriptionSlice: (state) => {
            state.loading=false
            state.stripeCheckoutUrl= null
            state.stripeSessionId= null
            state.error=null
            state.subscriptionMessage= null
        },
        setSubscriptionMessageSuccess: (state) =>{
            state.subscriptionMessage = PAYMENT_SUCCESSFUL
        },
        setSubscriptionMessageCancelled: (state) =>{
            state.subscriptionMessage = PAYMENT_CANCELLED
        },
        clearSubscriptionMessage: (state) => {
            state.subscriptionMessage = null
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(checkoutPremium.pending, (state) =>{
                return {
                    ...state,
                    loading: true,
                    error: null,
                    stripeCheckoutUrl: null
                };
            })
            .addCase(checkoutPremium.fulfilled, (state, action)=>{
                return {
                    ...state,
                    loading: false,
                    error: null,
                    stripeCheckoutUrl: action.payload.url,
                    stripeSessionId: action.payload.session_id
                };
            })
            .addCase(checkoutPremium.rejected, (state, action)=>{
                return {
                    ...state,
                    loading: false,
                    stripeCheckoutUrl: null,
                    error: action.error.message,
                };
            })
    }
});

export const {setSubscriptionMessageSuccess,
    setSubscriptionMessageCancelled,
    clearSubscriptionMessage,
    resetSubscriptionSlice} = subscriptionSlice.actions

export default subscriptionSlice.reducer;

