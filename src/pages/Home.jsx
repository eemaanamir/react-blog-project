import React, {useEffect} from 'react'
import {
    Alert, AlertTitle,
    ImageList,
    Typography
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {
    selectAllBlogs,
    selectBlogsStatus,
    selectBlogsError, selectDraftMessage,
} from "../features/blogs/blogsSelector.jsx";
import {fetchBlogs} from "../features/blogs/blogsThunks.jsx"
import {Header} from "../components/Header.jsx";
import {PAYMENT_CANCELLED, PAYMENT_SUCCESSFUL, RequestStatus} from "../app/constants.jsx";
import {BlogSummaryView} from "../components/BlogSummaryView.jsx";
import {topographyMainHeading} from "../emoticonCss.jsx";
import {clearBlogMessage} from "../features/blogs/blogsSlice.jsx";
import {Footer} from "../components/Footer.jsx";
import {selectUser} from "../features/users/usersSelectors.jsx";
import {selectSubscription} from "../features/subscriptions/subscriptionsSelector.jsx";
import {clearSubscriptionMessage} from "../features/subscriptions/subscriptionsSlice.jsx";


export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const blogs = useSelector(selectAllBlogs)
    const blogsStatus = useSelector(selectBlogsStatus)
    const blogsError = useSelector(selectBlogsError)
    const message = useSelector(selectDraftMessage)
    const {user} = useSelector(selectUser)
    const {stripeCheckoutUrl, subscriptionMessage} = useSelector(selectSubscription)

    //local states
    const [content, setContent] = React.useState(null);

    let newContent;
    useEffect(()=>{
        if (blogsStatus === RequestStatus.IDLE){
            dispatch(fetchBlogs())
        }
        else if(blogsStatus === RequestStatus.LOADING){
            console.log(blogsStatus)
            newContent = <p>Loading...</p>
            setContent(newContent)
        }
        else if (blogsStatus === RequestStatus.SUCCEEDED && user){
            const sortedBlogs = blogs.slice().sort((a, b) => {
                const dateA = new Date(a.blog_date_time);
                const dateB = new Date(b.blog_date_time);
                return dateB - dateA; // descending order (latest first)
            });
            newContent = sortedBlogs.map(blog => <BlogSummaryView
                key={blog.id}
                id ={blog.id}
                title={blog.blog_title}
                author={blog.user}
                date={blog.blog_date_time}
                summary={blog.blog_summary}
                headerUrl={blog.blog_header_image}
                blogType={blog.blog_type}
                userType={user.profile.user_type}
                dispatch={dispatch}
                navigate={navigate}
            />)
            setContent(newContent)
        }
        else if (blogsStatus === RequestStatus.FAILED){
            newContent = <p>{blogsError}</p>
            setContent(newContent)
        }
    },[blogsStatus,dispatch,blogsError,blogs,navigate,user])

    useEffect(() => {
        if (stripeCheckoutUrl) {
            window.location.href = stripeCheckoutUrl;
        }
    }, [stripeCheckoutUrl]);

    const handleMessageClose = () => {dispatch(clearBlogMessage())}
    const handleSubMessageClose = () => {dispatch((clearSubscriptionMessage()))}
    const getAlertMessage = () => {
        if (message){
            return(
                <Alert severity="success" onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    Your Blog Was Successfully {message} — <strong>Check it out!</strong>
                </Alert>
            )
        }
        if (subscriptionMessage === PAYMENT_SUCCESSFUL){
            return(
                <Alert severity="success" onClose={handleSubMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    Your payment was successful. You are now a Premium user — <strong>Check it out!</strong>
                </Alert>
            )
        }
        else if (subscriptionMessage === PAYMENT_CANCELLED){
            return (
                <Alert severity="error" onClose={handleSubMessageClose}>
                    <AlertTitle>Error</AlertTitle>
                    An error occurred in your payment please try again— <strong>Try Again!</strong>
                </Alert>
            )
        }
    }

    return (
        <>
            <Header/>
            <div className="mainHomeDiv">
                {getAlertMessage()}
                <Typography color="inherit" noWrap sx={topographyMainHeading}>
                    Blogs
                </Typography>
                <ImageList cols={3}>
                    {content}
                </ImageList>
            </div>
            <Footer/>
        </>
    )
}