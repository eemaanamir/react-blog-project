import React, {useEffect} from 'react'
import {
    ImageList,
    Typography
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    selectAllBlogs,
    selectBlogsStatus,
    selectBlogsError,} from "../features/blogs/blogsSelector.jsx";
import {fetchBlogs} from "../features/blogs/blogsThunks.jsx"
import {Header} from "../components/Header.jsx";
import {RequestStatus} from "../app/constants.jsx";
import {BlogSummaryView} from "../components/BlogSummaryView.jsx";
import {topographyMainHeading} from "../emoticonCss.jsx";


export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const blogs = useSelector(selectAllBlogs)
    const blogsStatus = useSelector(selectBlogsStatus)
    const blogsError = useSelector(selectBlogsError)

    //local states
    const [content, setContent] = React.useState(null);

    useEffect(()=>{
        if (blogsStatus === RequestStatus.IDLE){
            dispatch(fetchBlogs())
        }
        if(blogsStatus === RequestStatus.LOADING){
            let newContent = <p>Loading...</p>
            setContent(newContent)
        }
        else if (blogsStatus === RequestStatus.SUCCEEDED){
            const sortedBlogs = blogs.slice().sort((a, b) => {
                const dateA = new Date(a.blog_date_time);
                const dateB = new Date(b.blog_date_time);
                return dateB - dateA; // descending order (latest first)
            });
            let newContent = sortedBlogs.map(blog => <BlogSummaryView
                key={blog.id}
                id ={blog.id}
                title={blog.blog_title}
                author={blog.user}
                date={blog.blog_date_time}
                summary={blog.blog_summary}
                headerUrl={blog.blog_header_image}
                dispatch={dispatch}
                navigate={navigate}
            />)
            setContent(newContent)
        }
        else if (blogsStatus === RequestStatus.FAILED){
            let newContent = <p>{blogsError}</p>
            setContent(newContent)
        }
    },[blogsStatus,dispatch,blogsError,blogs,navigate])


    return (
        <>
            <Header/>
            <div className="mainHomeDiv">
                <Typography color="inherit" noWrap sx={topographyMainHeading}>
                    Blogs
                </Typography>
                <ImageList cols={3}>
                    {content}
                </ImageList>
            </div>
        </>
    )
}