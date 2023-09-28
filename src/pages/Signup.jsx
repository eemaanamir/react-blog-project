import * as React from 'react';
import {
    Alert, AlertTitle,
    Box, Button,
    Container,
    FormControl, FormControlLabel, FormGroup,
    IconButton, InputAdornment,
    InputLabel,
    OutlinedInput, Switch,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearError, clearMessage,} from "../features/users/usersSlice.jsx"
import {selectUser} from "../features/users/usersSelectors.jsx"
import {signupUser} from "../features/users/usersThunks.jsx"
import {toggleTheme, validateField} from "../app/functions.jsx";
import {formBorderBox, formContainer, formHeaderBox, formInnerBox, formSubmitButton} from "../emoticonCss.jsx";
import {useSignupInitialValues} from "../app/useInitialValues.jsx";


export const Signup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const {error}= useSelector(selectUser)


    //local states
    const [success, setSuccess] = React.useState(false);
    const [formValues, setFormValues] = React.useState(useSignupInitialValues());
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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

    const handleMessageClose = () => {dispatch(clearMessage())}
    const handleErrorClose = () => {dispatch(clearError())}
    const getAlertMessage = () => {
        if (success){
            return(
                <Alert severity="success" onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    Your account was successfully created — <strong>Welcome!</strong>
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
                await validateField(formValues, fieldName, formValues[fieldName].value);
                newFormValues[fieldName].error = false;
            } catch (error) {
                const fieldName = fieldNames.find((name) => formValues[name].errorMessage === error);
                newFormValues[fieldName].error = true;
                isSuccess = false
            }
        }
        if (isSuccess){
            let userDetails = {
                first_name:formValues["firstName"]["value"],
                last_name: formValues["lastName"]["value"],
                email: formValues["email"]["value"],
                password1: formValues["password1"]["value"],
                password2: formValues["password2"]["value"],
                user_bio: formValues["userBio"]["value"],
            }
            dispatch(signupUser(userDetails)).then((result) => {
                if (result.payload) {
                    setFormValues(useSignupInitialValues())
                    setSuccess(true)
                    navigate(`/login`)
                }
            })
        }
        else{
            setFormValues(newFormValues);
        }

    };

    return (
        <>
            <Container sx={formContainer}>
                {getAlertMessage()}
                <br/>
                <Box sx = {formBorderBox}>
                    <Box sx={formHeaderBox}>
                        <Typography variant="h5" component="h5" sx={{color: "#fff"}}>
                            SIGN UP
                        </Typography>
                    </Box>
                    <FormGroup>
                        <FormControlLabel control={<Switch></Switch>} label="Dark Mode" sx={{pl:55, pt:1,}} onClick={toggleTheme}/>
                    </FormGroup>
                    <Box sx={formInnerBox}>

                        <form noValidate onSubmit={handleSubmit}>
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
                                sx={{ my:1, width: '33ch', mr:1}}
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
                                placeholder="Enter your email address"
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                fullWidth
                                required
                                type="email"
                                value={formValues.email.value}
                                onChange={handleChange}
                                error={formValues.email.error  || error}
                                helperText={formValues.email.error? formValues.email.errorMessage: error? error: null}
                                sx={{ my:1, width: '70ch'}}
                            />

                            <FormControl sx={{ my:1, width: '33ch',  mr:1}} fullWidth variant="outlined" required error={formValues.password1.error}>
                                <InputLabel htmlFor="outlined-adornment-password" sx={{ color: formValues.password1.error ? '#d32f2f' : '#00000099' }}>Password</InputLabel>
                                <OutlinedInput
                                    name="password1"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formValues.password1.value}
                                    onChange={handleChange}
                                    error={formValues.password1.error}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {formValues.password1.error && (
                                    <Typography variant="caption" color="error">
                                        {formValues.password1.errorMessage}
                                    </Typography>
                                )}
                            </FormControl>

                            <FormControl  sx={{ my:1, ml:3, width: '33ch'}} fullWidth variant="outlined" required error={formValues.password2.error}>
                                <InputLabel htmlFor="outlined-adornment-password" sx={{ color: formValues.password2.error ? '#d32f2f' : '#00000099' }}>Confirm Password</InputLabel>
                                <OutlinedInput
                                    name="password2"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={formValues.password2.value}
                                    onChange={handleChange}
                                    error={formValues.password2.error}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                                {formValues.password2.error && (
                                    <Typography variant="caption" color="error">
                                        {formValues.password2.errorMessage}
                                    </Typography>
                                )}
                            </FormControl>


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
                                    color= 'primary'>Register</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
