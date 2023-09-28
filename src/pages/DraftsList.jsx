import React, {useEffect} from 'react'
import {
    Alert, AlertTitle,
    Box,
    Button,
    ImageList,
    Typography
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectDraftMessage, selectAllDrafts, selectDraftStatus,} from "../features/blogs/blogsSelector.jsx";
import {fetchDraftList} from "../features/blogs/blogsThunks.jsx"
import {Header} from "../components/Header.jsx";
import {DRAFT, RequestStatus} from "../app/constants.jsx";
import {
    draftEditButton,
    topographyMainHeading
} from "../emoticonCss.jsx";
import {DraftSummaryView} from "../components/DraftSummaryView.jsx";
import {clearBlogMessage} from "../features/blogs/blogsSlice.jsx";


export const DraftsList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const drafts = useSelector(selectAllDrafts)
    const draftsStatus = useSelector(selectDraftStatus)
    const draftsError = useSelector(selectDraftStatus)
    const message = useSelector(selectDraftMessage)

    //local states
    const [content, setContent] = React.useState(null);


    useEffect(()=>{
        let newContent;
        if (draftsStatus === RequestStatus.IDLE){
            dispatch(fetchDraftList())
        }
        if(draftsStatus === RequestStatus.LOADING){
            newContent = <p>Loading...</p>
            setContent(newContent)
        }
        else if (draftsStatus === RequestStatus.SUCCEEDED){
            const sortedBlogs = drafts.slice().sort((a, b) => {
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
                type = {DRAFT}
            />)
            setContent(newContent)
        }
        else if (draftsStatus === RequestStatus.FAILED){
            newContent = <p>{draftsError}</p>
            setContent(newContent)
        }
    },[draftsStatus,dispatch,draftsError,drafts,navigate])

    const handleNewDraftClick = () => navigate(`/draft-create`)

    const handleMessageClose = () => {dispatch(clearBlogMessage())}
    const getAlertMessage = () => {
        if (message){
            return(
                <Alert severity="success" onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    Your {message} was successfully created— <strong>Check it out!</strong>
                </Alert>
            )
        }
    }

    return (
        <>
            <Header/>
            <div className="mainHomeDiv">
                {getAlertMessage()}
                <div style={{display:'flex', flexDirection:'row', marginTop:'1rem'}}>
                <Typography color="inherit" noWrap sx={topographyMainHeading}>
                    Drafts
                </Typography>
                <Box sx={draftEditButton}>
                    <Button
                        variant="contained"
                        color= 'primary'
                        sx={{ml:'65rem'}}
                        onClick={handleNewDraftClick}
                    >New Draft</Button>
                </Box>
                </div>
                <ImageList cols={1}>
                    {content}
                </ImageList>
            </div>
        </>
    )
}