import React from 'react'
import {
    AppBar,
    Avatar,
    Button,
    Container,
    createTheme, Grid, ImageList, ImageListItem, ImageListItemBar,
    Menu,
    MenuItem,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userSelector, logout} from "../features/users/usersSlice.jsx";

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

function MyButton({text, callback}){
    return (
        <Button variant="text"
                onClick= {callback}
                sx={{color:'#fff',
                    fontFamily: "Work Sans, sans-serif",
                    fontsize: '15px',
                    fontWeight: 400,
                    textTransform: 'none',
                    '&:hover': {
                        color: 'rgba(255, 255, 255, 0.5)', // Change the background color on hover
                    },
                }}>
            {text}</Button>
    )
}


export const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const {user}= useSelector(userSelector)

    //local states
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
        navigate(`/login`)
    }


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative" alignitems="center" sx={{ top: 0, left: 0, right: 0, width: '100%', height: "70px" }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap sx={{fontFamily: "Work Sans, sans-serif", fontSize: '24px', fontWeight: "700", ml:10}}>
                        Blogy
                        <span style={{ fontSize: '30px', color: 'rgba(255,255,255,0.5)', marginRight:480 }}>.</span>
                    </Typography>
                    <MyButton text="Home" callback={()=>navigate(`/`)}></MyButton>
                    <MyButton text="Following"></MyButton>
                    <MyButton text="Explore"></MyButton>
                    <MyButton text="About Us"></MyButton>
                    <Avatar alt="User" src={`${user.profile.user_dp}`} sx={{width: 35, height: 35, ml:50, mt:1}}/>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{color:'#fff',
                            fontFamily: "Work Sans, sans-serif",
                            fontsize: '15px',
                            fontWeight: 400,
                            textTransform: 'none',
                            '&:hover': {
                                color: 'rgba(255, 255, 255, 0.5)', // Change the background color on hover
                            },
                            mt:1.5
                        }}>
                        {user.first_name} {user.last_name}<ArrowDropDownIcon/></Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>View Profile</MenuItem>
                        <MenuItem onClick={() => navigate(`/editprofile`)}>Edit Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Drafts</MenuItem>
                        <MenuItem onClick={handleClose}>Published</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}