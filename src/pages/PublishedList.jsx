import React, {useEffect} from 'react'
import {
    Alert, AlertTitle,
    ImageList,
    Typography
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    selectDraftMessage,
    selectPublishedError, selectPublishedStatus, selectAllPublished,
} from "../features/blogs/blogsSelector.jsx";
import {fetchPublishedList} from "../features/blogs/blogsThunks.jsx"
import {Header} from "../components/Header.jsx";
import {PUBLISHED, RequestStatus} from "../app/constants.jsx";
import {
    topographyMainHeading
} from "../emoticonCss.jsx";
import {DraftSummaryView} from "../components/DraftSummaryView.jsx";
import {clearBlogMessage} from "../features/blogs/blogsSlice.jsx";


export const PublishedList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const published = useSelector(selectAllPublished)
    const publishedStatus = useSelector(selectPublishedStatus)
    const publishedError = useSelector(selectPublishedError)

    //local states
    const [content, setContent] = React.useState(null);


    useEffect(()=>{
        let newContent;
        if (publishedStatus === RequestStatus.IDLE){
            dispatch(fetchPublishedList())
        }
        if(publishedStatus === RequestStatus.LOADING){
            newContent = <p>Loading...</p>
            setContent(newContent)
        }
        else if (publishedStatus === RequestStatus.SUCCEEDED){
            const sortedBlogs = published.slice().sort((a, b) => {
                const dateA = new Date(a.blog_date_time);
                const dateB = new Date(b.blog_date_time);
                return dateB - dateA; // descending order (latest first)
            });
            newContent = sortedBlogs.map(blog => <DraftSummaryView
                key={blog.id}
                id ={blog.id}
                title={blog.blog_title}
                author={blog.user}
                date={blog.blog_date_time}
                summary={blog.blog_summary}
                headerUrl={blog.blog_header_image}
                dispatch={dispatch}
                navigate={navigate}
                type = {PUBLISHED}
            />)
            setContent(newContent)
        }
        else if (publishedStatus === RequestStatus.FAILED){
            newContent = <p>{publishedError}</p>
            setContent(newContent)
        }
    },[publishedStatus,dispatch,publishedError,published,navigate])


    return (
        <>
            <Header/>
            <div className="mainHomeDiv">
                <Typography color="inherit" noWrap sx={topographyMainHeading}>
                    Published Blogs
                </Typography>
                <ImageList cols={1}>
                    {content}
                </ImageList>
            </div>
        </>
    )
}