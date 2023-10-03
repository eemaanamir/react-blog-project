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
import {clearMessage, clearError} from "../features/users/usersSlice.jsx";
import {selectUser} from "../features/users/usersSelectors.jsx"
import {loginUser,} from "../features/users/usersThunks.jsx"
import {useNavigate} from "react-router-dom";
import {LOGOUT_SUCCESSFUL, VERIFICATION_SUCCESSFUL} from "../app/constants.jsx";
import {toggleTheme, validateField} from "../app/functions.jsx";
import {formBorderBox, formContainer, formHeaderBox, formInnerBox, formSubmitButton} from "../emoticonCss.jsx";
import {useLoginInitialValues} from "../app/useInitialValues.jsx";


export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const {message, error}= useSelector(selectUser)

    //local states
    const [formValues, setFormValues] = React.useState(useLoginInitialValues());
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
    };

    const handleMessageClose = () => {dispatch(clearMessage())}
    const handleErrorClose = () => {dispatch(clearError())}
    const getAlertMessage = () => {
        if (message=== VERIFICATION_SUCCESSFUL){
            return(
                <Alert severity="success"  onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    You email was successfully verified — <strong>Login to continue!</strong>
                </Alert>
            )
        }
        else if(message === LOGOUT_SUCCESSFUL){
            return(
                <Alert severity="success"  onClose={handleMessageClose}>
                    <AlertTitle>Success</AlertTitle>
                    You were successfully logged out — <strong>Login to continue!</strong>
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
                email: formValues["email"]["value"],
                password: formValues["password"]["value"]
            }
            dispatch(loginUser(userCredentials)).then((result) => {
                if (result.payload) {
                    setFormValues(useLoginInitialValues())
                    dispatch(clearMessage())
                    dispatch(clearError())
                    navigate(`/`)
                }
            })
        }
        else {
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
                            LOGIN
                        </Typography>
                    </Box>
                    <FormGroup>
                        <FormControlLabel control={<Switch></Switch>} label="Dark Mode" sx={{pl:55, pt:1,}} onClick={toggleTheme}/>
                    </FormGroup>
                    <Box sx={formInnerBox}>

                        <form noValidate onSubmit={handleSubmit}>

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
                                error={formValues.email.error}
                                helperText={formValues.email.error && formValues.email.errorMessage}
                                sx={{ my:1, width: '70ch'}}
                            />

                            <FormControl sx={{ my:1,}} fullWidth variant="outlined" required error={formValues.password.error}>
                                <InputLabel htmlFor="outlined-adornment-password" sx={{ color: formValues.password.error ? '#d32f2f' : '#00000099' }}>Password</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formValues.password.value}
                                    onChange={handleChange}
                                    error={formValues.password.error}
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
                                {formValues.password.error && (
                                    <Typography variant="caption" color="error">
                                        {formValues.password.errorMessage}
                                    </Typography>
                                )}
                            </FormControl>

                            <Box sx={formSubmitButton}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color= 'primary'>Login</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
