import {useEffect} from 'react'
import {useDispatch,} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {
    setSubscriptionMessageCancelled
} from "../features/subscriptions/subscriptionsSlice.jsx";

export const CheckoutCancelled = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setSubscriptionMessageCancelled())
        navigate(`/`)

    }, [dispatch, navigate]);

    return (
        <>
            <Header/>

            <div><p>Loading...</p></div>
        </>
    )
}