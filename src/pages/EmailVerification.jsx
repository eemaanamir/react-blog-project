import * as React from 'react';
import {
    Alert, AlertTitle, AppBar, Avatar,
    Box, Button,
    Container,
    FormControlLabel,
    FormGroup, Menu, MenuItem, Switch,
    TextField, Toolbar,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {clearError, clearMessage} from "../features/users/usersSlice.jsx";
import {selectUser} from "../features/users/usersSelectors.jsx"
import {useNavigate} from "react-router-dom";
import {toggleTheme, validateField} from "../app/functions.jsx";
import {
    formBorderBox,
    formContainer,
    formHeaderBox,
    formInnerBox,
    formSubmitButton,
} from "../emoticonCss.jsx";
import {useVerifyEmailInitialValues} from "../app/useInitialValues.jsx";
import {useEffect} from "react";
import {SIGNUP_SUCCESSFUL, VERIFICATION_SUCCESSFUL} from "../app/constants.jsx";
import {verifyUser} from "../features/users/usersThunks.jsx";


export const EmailVerification = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const {user, message , error}= useSelector(selectUser)

    //local states
    const [formValues, setFormValues] = React.useState(useVerifyEmailInitialValues());
    const [content, setContent] = React.useState(null);
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

    const handleMessageClose = () => {dispatch(clearMessage())}
    const handleErrorClose = () => {dispatch(clearError())}
    const getAlertMessage = () => {
        if (message=== SIGNUP_SUCCESSFUL){
            return(
                <Alert severity="success"  onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    You account was successfully created — <strong>Verify Email To Continue!</strong>
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newFormValues = {...formValues};

        const fieldNames = Object.keys(formValues);
        let isSuccess = true;
        for (const fieldName of fieldNames) {
            try {
                await validateField(formValues,fieldName, formValues[fieldName].value);
                newFormValues[fieldName].error = false;
            } catch (error) {
                const fieldName = fieldNames.find((name) => formValues[name].errorMessage === error);
                newFormValues[fieldName].error = true;
                isSuccess = false
            }
        }
        if (isSuccess) {
            let userCredentials = {
                username: user.email,
                otp: formValues["otp"]["value"]
            }
            dispatch(verifyUser(userCredentials))
        }
        else {
            setFormValues(newFormValues);
        }
    };


    useEffect(() => {
        let newContent;
        if (message === VERIFICATION_SUCCESSFUL){
            dispatch(clearError())
            navigate(`/login`)
        }
        if (user) {
            newContent = user.email
            setContent(newContent)
        } else {
            newContent = 'Loading...'
            setContent(newContent)
        }
    }, [message, navigate, user])


    return (
        <>
            <Container sx={formContainer}>
                {getAlertMessage()}
                <br/>
                <Box sx = {formBorderBox}>
                    <Box sx={formHeaderBox}>
                        <Typography variant="h5" component="h5" sx={{color: "#fff"}}>
                            VERIFY EMAIL
                        </Typography>
                    </Box>
                    <FormGroup>
                        <FormControlLabel control={<Switch></Switch>} label="Dark Mode" sx={{pl:55, pt:1,}} onClick={toggleTheme}/>
                    </FormGroup>
                    <Box sx={formInnerBox}>

                        <form noValidate onSubmit={handleSubmit}>

                            <TextField
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                fullWidth
                                required
                                type="email"
                                value={content}
                                sx={{ my:1, width: '70ch'}}
                                disabled
                            />

                            <TextField
                                placeholder="Enter One Time Password"
                                label="OTP"
                                name="otp"
                                variant="outlined"
                                fullWidth
                                required
                                value={formValues.otp.value}
                                onChange={handleChange}
                                error={formValues.otp.error}
                                helperText={formValues.otp.error && formValues.otp.errorMessage}
                                sx={{ my:1, width: '70ch'}}
                            />

                            <Box sx={formSubmitButton}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color= 'primary'>Verify</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
