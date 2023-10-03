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

export const useCreateDraftInitialValues = () => {
    return(
        {
            blog_title: {
                value: '',
                error: false,
                errorMessage: 'You must enter a title',
            },
            blog_topic: {
                value: 'Select Topic *',
                error: false,
                errorMessage: 'You must select a topic',
            },
            blog_summary: {
                value: '',
                error: false,
                errorMessage: 'You must enter a summary',
            },
            blog_content: {
                value: '',
                error: false,
                errorMessage: 'You must enter content',
            },
        })
}

export const getSignupInitialValues = () => {
    return {
        firstName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a first name',
        },
        lastName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a last name',
        },
        email: {
            value: '',
            error: false,
            errorMessage: 'You must enter a valid email address',
        },
        password1: {
            value: '',
            error: false,
            errorMessage: 'You must enter a password',
        },
        password2: {
            value: '',
            error: false,
            errorMessage: 'Passwords do not match',
        },
        userBio: {
            value: '',
            error: false,
            errorMessage: 'You must enter your user bio',
        },
    }
}

export const useLoginInitialValues = () =>{
    return {
        email: {
            value: '',
            error: false,
            errorMessage: 'You must enter a valid email address',
        },
        password: {
            value: '',
            error: false,
            errorMessage: 'You must enter a password',
        },
    }
}

export const useVerifyEmailInitialValues = () =>{
    return {
        otp: {
            value: '',
            error: false,
            errorMessage: 'You must enter a 6 digit OTP',
        },
    }
}