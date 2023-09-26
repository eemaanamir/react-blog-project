import {Box, Button, ImageListItem, Typography} from "@mui/material";
import {
    draftEditButton,
    draftImageListStyle,
    draftSummaryTitle,
    imageListStyle,
    summaryDateAuthor,
    summaryText
} from "../emoticonCss.jsx";
import React from "react";
import {fetchBlogDetail} from "../features/blogs/blogsThunks.jsx";
import {clearExpandedBlog} from "../features/blogs/blogsSlice.jsx";

export const DraftSummaryView = ({id,title,date,summary,headerUrl,dispatch,navigate}) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-US', options);

    const handleClick = () => {
        dispatch(clearExpandedBlog())
        dispatch(fetchBlogDetail(id))
        navigate(`/draft-edit`)
    }

    return (
        <ImageListItem key="item" sx={draftImageListStyle}>
            <div style={{display:'flex', flexDirection:'row'}}>
                <div
                    className ="draftImageListDiv">
                    <img
                        srcSet={headerUrl}
                        src={headerUrl}
                        alt="title"
                        loading="lazy"
                    />
                </div>
                <div className="draftSummaryDiv">
                    <Typography variant="h6" sx={draftSummaryTitle}>
                        {title}
                    </Typography>
                    <Typography variant="p" color="inherit" noWrap sx={summaryDateAuthor}>
                        - {formattedDate}
                    </Typography>
                    <Typography variant="body1" gutterBottom={true} color="inherit"
                                sx={summaryText}>
                        {summary}
                    </Typography>
                    <Box sx={draftEditButton}>
                        <Button
                            variant="contained"
                            color= 'primary' onClick = {handleClick}>Edit</Button>
                    </Box>

                </div>
            </div>
        </ImageListItem>
    )
}
