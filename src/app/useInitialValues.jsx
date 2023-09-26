import {useSelector} from "react-redux";
import {selectUser} from "../features/users/usersSelectors.jsx";
import {selectExpandedBlog} from "../features/blogs/blogsSelector.jsx";
import {fetchBlogDetail} from "../features/blogs/blogsThunks.jsx";


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
