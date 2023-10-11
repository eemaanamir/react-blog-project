import {useEffect} from 'react'
import {useDispatch, useSelector,} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {updateToPremium} from "../features/users/usersSlice.jsx";
import {setSubscriptionMessageSuccess} from "../features/subscriptions/subscriptionsSlice.jsx";
import {selectUser} from "../features/users/usersSelectors.jsx";
import {fetchUser} from "../features/users/usersThunks.jsx";

export const CheckoutSuccess = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector(selectUser)

    useEffect(() => {
        if(user) {
            dispatch(setSubscriptionMessageSuccess())
            dispatch(updateToPremium())
            navigate(`/`)
        }
        else{
            dispatch(fetchUser())
        }

    }, [dispatch, navigate, user]);

    return (
        <>
            <Header/>

            <div><p>Loading Success...</p></div>
        </>
    )
}