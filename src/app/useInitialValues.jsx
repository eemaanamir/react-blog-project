import {useSelector} from "react-redux";
import {selectUser} from "../features/users/usersSelectors.jsx";


export const useEditProfileInitialValues = () => {

    const {user} = useSelector(selectUser)
    return(
        {
            firstName: {
                value: user.first_name,
                error: false,
                errorMessage: 'You must enter a first name',
            },
            lastName: {
                value: user.last_name,
                error: false,
                errorMessage: 'You must enter a last name',
            },
            userBio: {
                value: user.profile.user_bio,
                error: false,
                errorMessage: 'You must enter your user bio',
            },
            email: {
                value: user.email
            },
            dpLink: {
                value: user.profile.user_dp
            }
        })
}
