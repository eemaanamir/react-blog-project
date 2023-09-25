import React, {useEffect} from 'react'
import {
    Avatar, ImageListItem,
    ThemeProvider,
    Typography
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectExpandedBlog, selectExpandedBlogError} from "../features/blogs/blogsSelector.jsx";
import {Header} from "../components/Header.jsx";
import {headerUserAvatar, userAvatar} from "../emoticonCss.jsx";


export const BlogDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const blog = useSelector(selectExpandedBlog)
    const blogError = useSelector(selectExpandedBlogError)

    //local states
    const [content, setContent] = React.useState(null);

    useEffect(()=>{
        if(blogError){
            let newContent = <p>{blogError}</p>
            setContent(newContent)
        }
        else if (blog){
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const newDate = new Date(blog.blog_date_time);
            const formattedDate = newDate.toLocaleDateString('en-US', options);
            let newContent = (
                <div>
                    <ImageListItem key="item" sx={{ width: "100%", marginBottom: '15px'}}>
                        <div
                            style={{
                                width: '100%',
                                height: '374px',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                }}
                            >
                                <img
                                    srcSet={blog.blog_header_image}
                                    src={blog.blog_header_image}
                                    alt="title"
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '374px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#000', // Text color
                                        flexDirection: 'column',
                                    }}>
                                    <Typography variant="h3" color="inherit"
                                                sx={{fontFamily: "Work Sans, sans-serif",
                                                    fontSize:"45px" ,
                                                    fontWeight: "400",
                                                    color: "#fff",
                                                    mt: 1,
                                                    pb:2,
                                                    width: "636px",
                                                    textAlign: "center"}}>
                                        {blog.blog_title}
                                    </Typography>
                                    <div style={{display:'flex', flexDirection:'row', marginTop:30}}><Avatar alt="User" src={`${blog.user.profile.user_dp}`} sx={userAvatar}/>
                                        <Typography variant="h3" color="inherit" sx={{fontFamily: "Work Sans, sans-serif",fontSize:"13px" ,fontWeight: "400", color: "#fff", mt: '10px', pb:2, maxWidth: "1300px", mr:"1rem"}}>
                                            {blog.user.first_name} {blog.user.last_name}
                                         </Typography>
                                        <Typography variant="h3" color="inherit" sx={{fontFamily: "Work Sans, sans-serif",fontSize:"13px" ,fontWeight: "400", color: "#fff", mt: '10px', pb:2, maxWidth: "1300px", mr:"1rem"}}>
                                            -
                                        </Typography>
                                        <Typography variant="h3" color="inherit" sx={{fontFamily: "Work Sans, sans-serif",fontSize:"13px" ,fontWeight: "400", color: "#fff", mt: '10px', pb:2, maxWidth: "1300px",}}>
                                            {formattedDate}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ImageListItem>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: 50, flexDirection: 'column', alignContent:'center',alignItems: 'center'}}>
                        <Typography variant="h3" color="inherit" sx={{fontFamily: "Work Sans, sans-serif",fontSize:"15px" ,fontWeight: "400", color: "gray", mt: '2rem', pb:2, maxWidth: "1100px"}}>
                            {blog.blog_content}
                        </Typography>
                        <Typography variant="h3" color="inherit" sx={{fontFamily: "Work Sans, sans-serif",fontSize:"13.5px" ,fontWeight: "300", color: "gray", mt: '2rem', pb:2, maxWidth: "1100px"}}>
                            Category: <span style={{color:"#214252", fontWeight:"450", paddingRight: '.5rem'}}>{blog.blog_topic}</span> Type: <span style={{color:"#214252", fontWeight:"450"}}>{blog.blog_type.toUpperCase()}</span>
                        </Typography>
                    </div>
                </div>
            )

            setContent(newContent)
        }
        else {
            let newContent = <p>Loading...</p>
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