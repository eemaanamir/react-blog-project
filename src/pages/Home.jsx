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
    fetchBlogDetail
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

function BlogSummaryView({id,title,author,date,summary,headerUrl,dispatch,navigate}){
    console.log(id)
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-US', options);

    return (
        <ImageListItem key="item" sx={{ width: 416, borderRadius: 2, marginBottom: '15px'}}>
            <div
                style={{
                    width: '100%',
                    height: '261px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '15px',
                    overflow: 'hidden',
                }}
            >
                <img
                    srcSet={headerUrl}
                    src={headerUrl}
                    alt="title"
                    loading="lazy"
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div style={{width: 390, alignSelf: "center", justifySelf: "center", marginBottom:30}}>
                <Typography variant="h6" color="inherit" sx={{fontFamily: "Work Sans, sans-serif", fontSize: "20px",fontWeight: "500", color: "#4D4C7D", mt: 1, pb:2}}>
                    {title}
                </Typography>
                <Typography variant="p" color="inherit" noWrap sx={{fontFamily: "Work Sans, sans-serif",fontSize: "13px", fontWeight: "400", color: "gray"}}>
                    {author} - {formattedDate}
                </Typography>
                <Typography variant="body1" gutterBottom={true} color="inherit"
                            sx={{fontFamily: "Work Sans, sans-serif",
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "gray",
                                mt: 1,
                                pb: 1.5,
                                maxHeight: "4.5em",
                                overflow: "hidden"}}>
                    {summary}
                </Typography>

                <Button variant="text" size="large"
                        sx={{color:'primary',
                            fontFamily: "Work Sans, sans-serif",
                            fontsize: '15px',
                            fontWeight: 600,
                            textTransform: 'none',
                            width: "fit-content",
                            p:0,
                            position: 'absolute',
                            bottom: '10px',
                            left: '10px',
                        }}
                        onClick={() => {
                                dispatch(fetchBlogDetail(id))
                                navigate(`/blogdetail`)
                            }
                        }>
                    <u>Continue Reading</u></Button>
            </div>
        </ImageListItem>
    )
}

export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const blogs = useSelector(selectAllBlogs)
    const blogsStatus = useSelector(getBlogsStatus)
    const blogsError = useSelector(getBlogsError)


    useEffect(()=>{
        if (blogsStatus === 'idle'){
            dispatch(fetchBlogs())
        }
    },[blogsStatus,dispatch])

    let content;
    if(blogsStatus === 'loading'){
        content = <p>Loading...</p>
    }
    else if (blogsStatus === 'succeeded'){
        const sortedBlogs = blogs.slice().sort((a, b) => {
            const dateA = new Date(a.blog_date_time);
            const dateB = new Date(b.blog_date_time);
            return dateB - dateA; // descending order (latest first)
        });
        content = sortedBlogs.map(blog => <BlogSummaryView
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
    }
    else if (blogsStatus === 'failed'){
        content = <p>{blogsError}</p>
    }

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <div style={{width:'1320px', marginTop: 70, marginLeft: 140}}>
                <Typography variant="h4" color="inherit" noWrap sx={{fontFamily: "Work Sans, sans-serif", fontWeight: "700", color: "#214252", mb: 5}}>
                    Blogs
                </Typography>
                <ImageList cols={3}>
                    {content}
                </ImageList>
            </div>
        </ThemeProvider>
    )
}