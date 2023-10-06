import {useEffect} from 'react'
import {useDispatch,} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {updateToPremium} from "../features/users/usersSlice.jsx";
import {setSubscriptionMessageSuccess} from "../features/subscriptions/subscriptionsSlice.jsx";

export const CheckoutSuccess = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setSubscriptionMessageSuccess())
        dispatch(updateToPremium())
        navigate(`/`)

    }, [dispatch, navigate]);

    return (
        <>
            <Header/>

            <div><p>Loading Success...</p></div>
        </>
    )
}