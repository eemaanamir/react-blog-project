import * as React from 'react';
import {
    Alert, AlertTitle, Avatar,
    Box, Button, Collapse,
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
import {useNavigate} from "react-router-dom";
import {clearError, clearMessage, updateUser, userSelector} from "../features/users/usersSlice.jsx";
import {Header} from "../components/Header.jsx";

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

export const EditProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const {user, error}= useSelector(userSelector)

    console.log(user)


    //local states
    const [success, setSuccess] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [formValues, setFormValues] = React.useState({
        firstName: {
            value: user? user.first_name: "loading..",
            error: false,
            errorMessage: 'You must enter a first name',
        },
        lastName: {
            value: user? user.last_name: "loading..",
            error: false,
            errorMessage: 'You must enter a last name',
        },
        userBio: {
            value: user? user.profile.user_bio: "loading...",
            error: false,
            errorMessage: 'You must enter your user bio',
        },
        email: {
            value: user? user.email: "loading..."
        },
        dplink:{
            value: user? user.profile.user_dp: null
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
            },
        });
        dispatch(clearError())
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const getAlertMessage = () => {
        if (success){
            return(
                <Alert severity="success" onClose={() => {
                    dispatch(clearMessage())
                    setSuccess(false)}}>
                    <AlertTitle>Success</AlertTitle>
                    Your account was successfully updated— <strong>Check it out!</strong>
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
            setSuccess(true)
        }
        else
        {
            console.log("i am here in editprofile.jx")
            setFormValues(newFormValues);
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Header/>
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
                            EDIT PROFILE
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pt:1,
                        pb:2,
                        px:2}}>

                        <Avatar alt="User" src={`${formValues.dplink.value}`} sx={{width: 120, height: 120, mb:1}}/>

                        <form noValidate onSubmit={handleSubmit}>

                            <div style={{display:"flex", alignContent: "center", justifyContent: "center"}}>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    style={{ display: 'none'}}
                                    onChange={handleFileSelect}
                                    id="fileInput"
                                />
                                <label htmlFor="fileInput">
                                    <Button
                                        variant="contained"
                                        color= 'primary'
                                        component = "span"
                                        disabled
                                        >Upload New Picture</Button>
                                </label>
                            </div>
                            <div style={{display:"flex", alignContent: "center", justifyContent: "center", marginBottom:3}}>
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
                                sx={{ my:1, width: '33ch' }}
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
                                    color= 'primary'>Save</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
