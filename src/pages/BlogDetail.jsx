import React, {useEffect} from 'react'
import {
    Button,
    Container,
    createTheme, Grid, ImageList, ImageListItem,
    ThemeProvider,
    Typography
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    selectAllBlogs,
    getBlogsStatus,
    getBlogsError,
    fetchBlogs,
    fetchBlogDetail, selectExpandedBlog, getExpandedBlogError
} from "../features/blogs/blogsSlice.jsx";
import {Header} from "../components/Header.jsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#214252',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        }
    },
});


export const BlogDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const blog = useSelector(selectExpandedBlog)
    const blogError = useSelector(getExpandedBlogError)


    let content
    if(blogError){
        content = <p>{blogError}</p>
    }
    else if (blog){
        content = (
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
                        {/*<img*/}
                        {/*    srcSet={blog.blog_header_image}*/}
                        {/*    src={blog.blog_header_image}*/}
                        {/*    alt="title"*/}
                        {/*    loading="lazy"*/}
                        {/*    style={{*/}
                        {/*        width: '100%',*/}
                        {/*        objectFit: 'cover',*/}
                        {/*    }}*/}
                        {/*/>*/}
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
                                }}
                            >
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
                            </div>
                        </div>
                    </div>
                </ImageListItem>
                <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: 50}}>
                    <Typography variant="h3" color="inherit" sx={{fontFamily: "Work Sans, sans-serif",fontSize:"15px" ,fontWeight: "400", color: "gray", mt: 1, pb:2, maxWidth: "1300px"}}>
                        {blog.blog_content}
                    </Typography>
                </div>
        </div>
        )
    }
    else {
        content = <p>Loading...</p>
    }

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            {content}
        </ThemeProvider>
    )
}