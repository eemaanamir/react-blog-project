import * as React from 'react';
import {
    Alert, AlertTitle,
    Box, Button,
    Container,
    FormControlLabel,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {useEffect} from "react";
import {useCreateDraftInitialValues, } from "../app/useInitialValues.jsx";
import {formBorderBox, formContainer, formHeaderBox, formInnerBox, formSubmitButton} from "../emoticonCss.jsx";
import {
    selectDraftError,
    selectDraftMessage,
    selectExpandedBlog
} from "../features/blogs/blogsSelector.jsx";
import {
    fetchBlogs,
    updateDraftBlog
} from "../features/blogs/blogsThunks.jsx";
import {clearBlogMessage, clearDraftError, } from "../features/blogs/blogsSlice.jsx";
import {TopicSelector} from "../components/TopicSelector.jsx";
import {DRAFT, PUBLISHED} from "../app/constants.jsx";


export const DraftEdit = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const message = useSelector(selectDraftMessage)
    const error = useSelector(selectDraftError)
    const selectedDraft = useSelector(selectExpandedBlog)


    //local states
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [formValues, setFormValues] = React.useState(useCreateDraftInitialValues());
    const [isPublished, setIsPublished] = React.useState(false);


    useEffect(()=>{
        if (selectedDraft){
            let newValues = {
                blog_title: {
                    value: selectedDraft.blog_title,
                    error: false,
                    errorMessage: 'You must enter a title',
                },
                blog_topic: {
                    value: selectedDraft.blog_topic,
                    error: false,
                    errorMessage: 'You must select a topic',
                },
                blog_summary: {
                    value: selectedDraft.blog_summary,
                    error: false,
                    errorMessage: 'You must enter a summary',
                },
                blog_content: {
                    value: selectedDraft.blog_content,
                    error: false,
                    errorMessage: 'You must enter content',
                },
            }
            setFormValues(newValues)
        }
        if (message === PUBLISHED){
            dispatch(clearDraftError())
            dispatch(fetchBlogs())
            navigate(`/`)
        }
    },[dispatch, message, navigate, selectedDraft])

    const handleTopicChange = (e) => {
        const value = e.target.value;
        setFormValues({
            ...formValues,
            ['blog_topic']: {
                ...formValues['blog_topic'],
                value,
                error:false
            },
        });
    };
    //
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
                error:false
            },
        });
    };

    const handleSwitchChange = (event) => {
        setIsPublished(event.target.checked); // Update the local state variable
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleMessageClose = () => {dispatch(clearBlogMessage())}
    const handleErrorClose = () => {dispatch(clearDraftError())}
    const getAlertMessage = () => {
        if (message === DRAFT){
            return (
                <Alert severity="success" onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    Your {message} was successfully updated— <strong>Check it out!</strong>
                </Alert>
            )
        }
        else if (error){
            return(
                <Alert severity="error" onClose={handleErrorClose}>
                    <AlertTitle>Error</AlertTitle>
                    {error}— <strong>Try Again!</strong>
                </Alert>
            )
        }
    }

    const validateField = (name, value) => {
        return new Promise((resolve, reject) => {
            switch (name) {
                case 'blog_title':
                case 'blog_summary':
                case 'blog_content':
                    if (value.trim() === '') {
                        reject(formValues[name].errorMessage);
                    } else {
                        resolve();
                    }
                    break;
                case 'blog_topic':
                    if (value.trim() === 'Select Topic *') {
                        reject(formValues[name].errorMessage);
                    } else {
                        resolve();
                    }
                    break;
                default:
                    resolve();
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newFormValues = {...formValues};

        const fieldNames = Object.keys(formValues);
        let isSuccess = true;
        for (const fieldName of fieldNames) {
            try {
                await validateField(fieldName, formValues[fieldName].value);
                newFormValues[fieldName].error = false;
            } catch (error) {
                const fieldName = fieldNames.find((name) => formValues[name].errorMessage === error);
                newFormValues[fieldName].error = true;
                isSuccess = false
            }
        }
        if (isSuccess)
        {
            const blogDetails = {
                blog_title: formValues.blog_title.value,
                blog_type: 'basic',
                blog_topic: formValues.blog_topic.value,
                blog_summary: formValues.blog_summary.value,
                blog_content: formValues.blog_content.value,
                is_published: isPublished,
                id:selectedDraft.id
            }
            dispatch(updateDraftBlog(blogDetails))
        }
        else
        {
            setFormValues(newFormValues);
        }

    };

    return (
        <>
            <Header/>
            <Container sx={formContainer}>
                {getAlertMessage()}
                <br/>
                <Box sx = {formBorderBox}>
                    <Box sx={formHeaderBox}>
                        <Typography variant="h5" component="h5" sx={{color: "#fff"}}>
                            UPDATE DRAFT
                        </Typography>
                    </Box>
                    <Box sx={formInnerBox}>

                        <form noValidate onSubmit={handleSubmit}>

                            <div className='centerFlexDiv'>
                                <input type="file" accept=".jpg, .jpeg, .png" style={{ display: 'none'}} onChange={handleFileSelect} id="fileInput"/>
                                <label htmlFor="fileInput">
                                    <Button
                                        variant="contained"
                                        color= 'primary'
                                        component = "span"
                                        disabled
                                    >Upload Header Image</Button>
                                </label>
                            </div>
                            <div className='centerFlexDiv'>
                                {selectedFile?
                                    <p>Selected File: {selectedFile.name}</p>: <p></p>}
                            </div>

                            <TextField
                                placeholder="Enter the title of your blog"
                                label="Title"
                                name="blog_title"
                                variant="outlined"
                                fullWidth
                                required
                                value={formValues.blog_title.value}
                                onChange={handleChange}
                                error={formValues.blog_title.error}
                                helperText={formValues.blog_title.error && formValues.blog_title.errorMessage}
                                sx={{ my:1, width: '70ch',  mr:1 }}
                            />
                            <div style={{display:'flex', flexDirection:'row', marginBottom:2}}>
                                <TopicSelector selectedTopic={formValues.blog_topic.value} handleTopicChange={handleTopicChange} errorValue={formValues.blog_topic.error} errorMessage={formValues.blog_topic.errorMessage}/>

                                <FormControlLabel control={<Switch checked ={isPublished} onChange={handleSwitchChange} />} label="Published" sx={{pl:5, pt:1,}}/>
                            </div>

                            <TextField
                                placeholder="A short summary of your blog"
                                label="Summary"
                                name="blog_summary"
                                variant="outlined"
                                fullWidth
                                required
                                multiline
                                rows={2}
                                value={formValues.blog_summary.value}
                                onChange={handleChange}
                                error={formValues.blog_summary.error}
                                helperText={formValues.blog_summary.error && formValues.blog_summary.errorMessage}
                                sx={{ my:1, width: '70ch'}}
                            />

                            <TextField
                                placeholder="Add your blog content here"
                                label="Content"
                                name="blog_content"
                                variant="outlined"
                                fullWidth
                                required
                                multiline
                                rows={4}
                                value={formValues.blog_content.value}
                                onChange={handleChange}
                                error={formValues.blog_content.error}
                                helperText={formValues.blog_content.error && formValues.blog_content.errorMessage}
                                sx={{ my:1, width: '70ch'}}
                            />

                            <Box sx={formSubmitButton}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color= 'primary'>Update</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
