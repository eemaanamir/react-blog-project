import {fetchBlogDetail} from "../features/blogs/blogsThunks.jsx";
import {Button, ImageListItem, Typography} from "@mui/material";
import React from "react";
import {imageListStyle, summaryButton, summaryDateAuthor, summaryText, summaryTitle} from "../emoticonCss.jsx";

export const BlogSummaryView = ({id,title,author,date,summary,headerUrl,dispatch,navigate}) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-US', options);

    const handleClick = () => {
        dispatch(fetchBlogDetail(id))
        navigate(`/blog-detail`)
    }

    return (
        <ImageListItem key="item" sx={imageListStyle}>
            <div
                className ="imageListDiv"
            >
                <img
                    srcSet={headerUrl}
                    src={headerUrl}
                    alt="title"
                    loading="lazy"
                />
            </div>
            <div className="blogSummaryDiv">
                <Typography variant="h6" sx={summaryTitle}>
                    {title}
                </Typography>
                <Typography variant="p" color="inherit" noWrap sx={summaryDateAuthor}>
                    {author} - {formattedDate}
                </Typography>
                <Typography variant="body1" gutterBottom={true} color="inherit"
                            sx={summaryText}>
                    {summary}
                </Typography>

                <Button variant="text" size="large"
                        sx={summaryButton}
                        onClick={handleClick}>
                    <u>Continue Reading</u></Button>
            </div>
        </ImageListItem>
    )
}