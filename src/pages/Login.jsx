import * as React from 'react';
import {
    Alert, AlertTitle,
    Box, Button,
    Container, createTheme,
    FormControl, FormControlLabel, FormGroup,
    IconButton, InputAdornment,
    InputLabel,
    OutlinedInput, Switch,
    TextField, ThemeProvider,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, userSelector, clearMessage, clearError} from "../features/users/usersSlice.jsx";
import {useNavigate} from "react-router-dom";

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

export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const {message, error}= useSelector(userSelector)

    //local states
    const [background, setBackground] = React.useState('#132838');
    const [formValues, setFormValues] = React.useState({
        email: {
            value: '',
            error: false,
            errorMessage: 'You must enter a valid email address',
        },
        password: {
            value: '',
            error: false,
            errorMessage: 'You must enter a password',
        },
    });
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

    const getAlertMessage = () => {
        if (message=== 'Signup Successful'){
            return(
                <Alert severity="success"  onClose={() => {dispatch(clearMessage())}}>
                    <AlertTitle>Success</AlertTitle>
                    You account was successfully created — <strong>Login to continue!</strong>
                </Alert>
            )
        }
        else if(message === "Logout Successful"){
            return(
                <Alert severity="success"  onClose={() => {dispatch(clearMessage())}}>
                    <AlertTitle>Success</AlertTitle>
                    You were successfully logged out — <strong>Login to continue!</strong>
                </Alert>
            )
        }
        else if (error){
            return(
                <Alert severity="error" onClose={() => {dispatch(clearError())}}>
                    <AlertTitle>Error</AlertTitle>
                    {error}— <strong>Try Again!</strong>
                </Alert>
            )
        }
    }

    const toggleTheme = () => {
        document.bgColor = background;
        if( background === "#132838") {
            setBackground("#fff")
        }
        else{
            setBackground("#132838")
        }
    }

    const validateField = (name, value) => {
        return new Promise((resolve, reject) => {
            switch (name) {
                case 'password':
                    if (value.trim() === '') {
                        reject(formValues[name].errorMessage);
                    } else {
                        resolve();
                    }
                    break;
                case 'email': {
                    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if (!value.match(emailFormat)) {
                        reject(formValues[name].errorMessage);
                    } else {
                        resolve();
                    }
                    break;
                }
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
        if (isSuccess) {
            let userCredentials = {
                email: formValues["email"]["value"],
                password: formValues["password"]["value"]
            }
            dispatch(loginUser(userCredentials)).then((result) => {
                if (result.payload) {
                    setFormValues({
                        email: {
                            value: '',
                            error: false,
                            errorMessage: 'You must enter a valid email address',
                        },
                        password: {
                            value: '',
                            error: false,
                            errorMessage: 'You must enter a password',
                        }
                    })
                    navigate(`/`)
                }
            })
        }
        else {
            setFormValues(newFormValues);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{width:'80ch', marginTop: 10,}}>
                {getAlertMessage()}
                <Box sx = {{border: '3px solid #214252', marginTop: 5, bgcolor:"#fff", borderRadius: '16px'}}>
                    <Box sx={{
                        bgcolor: '#214252',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p:2,
                        borderRadius: '11px 11px 0px 0px'
                    }}>
                        <Typography variant="h5" component="h5" sx={{color: "#fff"}}>
                            LOGIN
                        </Typography>
                    </Box>
                    <FormGroup>
                        <FormControlLabel control={<Switch></Switch>}
                                          label="Dark Mode"
                                          sx={{pl:55, pt:1,}}
                                          onClick={toggleTheme}
                        />
                    </FormGroup>
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center',
                        pt:1,
                        pb:2,
                        px:2}}>

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

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                pb: 1,
                                pt:2
                            }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color= 'primary'>Login</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
