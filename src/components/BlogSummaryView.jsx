import {fetchBlogDetail} from "../features/blogs/blogsThunks.jsx";
import {Button, ImageListItem, Typography} from "@mui/material";
import {
    imageListStyle,
    summaryButton,
    summaryDateAuthor,
    summaryPremiumButton,
    summaryText,
    summaryTitle
} from "../emoticonCss.jsx";
import {checkoutPremium} from "../features/subscriptions/subscriptionsThunks.jsx";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {BASIC, PREMIUM} from "../app/constants.jsx";


// eslint-disable-next-line react/prop-types
export const BlogSummaryView = ({id,title,author,date,summary,headerUrl,blogType,userType ,dispatch,navigate}) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-US', options);

    const handleClick = () => {
        dispatch(fetchBlogDetail(id))
        navigate(`/blog-detail`)
    }
    const handlePremiumClick = () => {
        dispatch(checkoutPremium())
    }

    return (
        <ImageListItem key="item" sx={imageListStyle}>
            <div
                className ="imageListDiv"
            >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        srcSet={headerUrl}
                        src={headerUrl}
                        alt="title"
                        loading="lazy"
                        style={{ maxWidth: '100%' }}
                    />
                    {blogType === PREMIUM &&
                        <div style={{ position: 'absolute', top: 5, right: 4 }}>
                            <WorkspacePremiumIcon sx={{ color: '#a47f05', fontSize: '30px' }} />
                        </div>
                    }
                </div>
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

                {
                    userType === PREMIUM?
                    <Button variant="text" size="large"
                            sx={summaryButton}
                            onClick={handleClick}>
                        <u>Continue Reading</u></Button>
                    :blogType === BASIC?
                    <Button variant="text" size="large"
                            sx={summaryButton}
                            onClick={handleClick}>
                        <u>Continue Reading</u></Button>
                    :
                    <Button variant="text" size="large"
                            sx={summaryPremiumButton}
                            onClick={handlePremiumClick}>
                        <u>Buy Premium to Read More</u></Button>
                }

            </div>
        </ImageListItem>
    )
}