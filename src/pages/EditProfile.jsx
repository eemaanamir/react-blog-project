import * as React from 'react';
import {
    Alert, AlertTitle, Avatar,
    Box, Button,
    Container, TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {clearError, clearMessage} from "../features/users/usersSlice.jsx";
import {selectUser} from "../features/users/usersSelectors.jsx"
import {updateUser} from "../features/users/usersThunks.jsx"
import {Header} from "../components/Header.jsx";
import {useEditProfileInitialValues} from "../app/useInitialValues.jsx";
import {formBorderBox, formContainer, formHeaderBox, formInnerBox, formSubmitButton} from "../emoticonCss.jsx";

export const EditProfile = () => {

    const dispatch = useDispatch()

    //redux state
    const { error, message}= useSelector(selectUser)


    //local states
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [formValues, setFormValues] = React.useState(useEditProfileInitialValues());

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
        dispatch(clearError())
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleMessageClose = () => {dispatch(clearMessage())}
    const handleErrorClose = () => {dispatch(clearError())}
    const getAlertMessage = () => {
        if (message){
            return(
                <Alert severity="success" onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    Your account was successfully updated— <strong>Check it out!</strong>
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
                case 'firstName':
                case 'lastName':
                case 'userBio':
                    if (value.trim() === '') {
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
        if (isSuccess){
            let userUpdates = {
                first_name:formValues["firstName"]["value"],
                last_name: formValues["lastName"]["value"],
                profile:{
                    user_bio: formValues["userBio"]["value"],
                    // user_dp: selectedFile? selectedFile: user.profile.user_dp
                }
            }
            dispatch(updateUser(userUpdates))
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
                            EDIT PROFILE
                        </Typography>
                    </Box>
                    <Box sx={formInnerBox}>

                        <Avatar alt="User" src={`${formValues.dpLink.value}`} sx={{width: 120, height: 120, mb:1}}/>

                        <form noValidate onSubmit={handleSubmit}>

                            <div className='centerFlexDiv'>
                                <input type="file" accept=".jpg, .jpeg, .png" style={{ display: 'none'}} onChange={handleFileSelect} id="fileInput"/>
                                <label htmlFor="fileInput">
                                    <Button
                                        variant="contained"
                                        color= 'primary'
                                        component = "span"
                                        disabled
                                        >Upload New Picture</Button>
                                </label>
                            </div>
                            <div className='centerFlexDiv' style={{marginBottom:3}}>
                                {selectedFile?
                                    <p>Selected File: {selectedFile.name}</p>: <p></p>}
                            </div>

                            <TextField
                                placeholder="Enter your first name"
                                label="First Name"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                required
                                value={formValues.firstName.value}
                                onChange={handleChange}
                                error={formValues.firstName.error}
                                helperText={formValues.firstName.error && formValues.firstName.errorMessage}
                                sx={{ my:1, width: '33ch',  mr:1 }}
                            />

                            <TextField
                                placeholder="Enter your last name"
                                label="Last Name"
                                name="lastName"
                                variant="outlined"
                                fullWidth
                                required
                                value={formValues.lastName.value}
                                onChange={handleChange}
                                error={formValues.lastName.error}
                                helperText={formValues.lastName.error && formValues.lastName.errorMessage}
                                sx={{ my:1, ml:3, width: '33ch'}}
                            />

                            <TextField
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                fullWidth
                                type="email"
                                value={formValues.email.value}
                                sx={{ my:1, width: '70ch'}}
                                disabled={true}
                            />

                            <TextField
                                placeholder="A short introduction of yourself"
                                label="User Bio"
                                name="userBio"
                                variant="outlined"
                                fullWidth
                                required
                                multiline
                                rows={4}
                                value={formValues.userBio.value}
                                onChange={handleChange}
                                error={formValues.userBio.error}
                                helperText={formValues.userBio.error && formValues.userBio.errorMessage}
                                sx={{ my:1, width: '70ch'}}
                            />

                            <Box sx={formSubmitButton}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color= 'primary'>Save</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
