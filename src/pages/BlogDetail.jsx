import React, {useEffect} from 'react'
import {
    Avatar, ImageListItem,
    Typography
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectExpandedBlog, selectExpandedBlogError} from "../features/blogs/blogsSelector.jsx";
import {Header} from "../components/Header.jsx";
import {
    blogDetailContent,
    blogDetailHeaderInfo,
    blogDetailHeaderTopic,
    userAvatar
} from "../emoticonCss.jsx";


export const BlogDetail = () => {
    const dispatch = useDispatch()
    //redux state
    const blog = useSelector(selectExpandedBlog)
    const blogError = useSelector(selectExpandedBlogError)

    //local states
    const [content, setContent] = React.useState(null);

    let newContent;
    useEffect(()=>{
        if(blogError){
            newContent = <p>{blogError}</p>
            setContent(newContent)
        }
        else if (blog && blog.user && blog.user.profile){
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const newDate = new Date(blog.blog_date_time);
            const formattedDate = newDate.toLocaleDateString('en-US', options);
            newContent = (
                <div>
                    <ImageListItem key="item" sx={{ width: "100%", marginBottom: '15px'}}>
                        <div className='blogDetailHeaderDiv'>
                                <img
                                    srcSet={blog.blog_header_image}
                                    src={blog.blog_header_image}
                                    alt="title"
                                    loading="lazy"
                                    style={{width: '100%', objectFit: 'cover',}}
                                />
                                <div className='blogDetailHeaderOverlayDiv'>
                                    <Typography variant="h3" color="inherit"
                                                sx={blogDetailHeaderTopic}>
                                        {blog.blog_title}
                                    </Typography>
                                    <div style={{display:'flex', flexDirection:'row', marginTop:30}}>
                                        <Avatar alt="User" src={`${blog.user.profile.user_dp}`} sx={userAvatar}/>
                                        <Typography variant="h3" color="inherit" sx={blogDetailHeaderInfo}>
                                            {blog.user.first_name} {blog.user.last_name}
                                         </Typography>
                                        <Typography variant="h3" color="inherit" sx={blogDetailHeaderInfo}>
                                            -
                                        </Typography>
                                        <Typography variant="h3" color="inherit" sx={blogDetailHeaderInfo}>
                                            {formattedDate}
                                        </Typography>
                                    </div>
                                </div>
                        </div>
                    </ImageListItem>
                    <div className='blogDetailContentDiv'>
                        <Typography variant="h3" color="inherit" sx={blogDetailContent}>
                            {blog.blog_content}
                        </Typography>
                        <Typography variant="h3" color="inherit" sx={blogDetailContent}>
                            Category: <span className='blogDetailCategorySpan'>{blog.blog_topic}</span>
                            Type: <span className='blogDetailCategorySpan'>{blog.blog_type.toUpperCase()}</span>
                        </Typography>
                    </div>
                </div>
            )

            setContent(newContent)
        }
        else {
            newContent = <p>Loading...</p>
            setContent(newContent)
        }
    }, [blog, blogError,dispatch])

    return (
        <>
            <Header/>
            {content}
        </>
    )
}