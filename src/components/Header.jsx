import React from 'react'
import {
    AppBar,
    Avatar,
    Button,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../features/users/usersSlice.jsx";
import {selectUser} from "../features/users/usersSelectors.jsx"
import {HeaderButton} from "./HeaderButton.jsx";
import {appBar, blogyHeading, headerUserAvatar, menuButton,} from "../emoticonCss.jsx";


export const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //redux state
    const {user}= useSelector(selectUser)

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

    const handleEditProfileClick = () => navigate(`/edit-profile`)

    const handleHomeClick = ()=>navigate(`/`)


    return (
        <>
            <AppBar position="relative" alignitems="center" sx={appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap sx={blogyHeading}>
                        Blogy
                        <span className ="blogyHeadingPeriod">.</span>
                    </Typography>
                    <HeaderButton text="Home" callBack={handleHomeClick}></HeaderButton>
                    <HeaderButton text="Following"></HeaderButton>
                    <HeaderButton text="Explore"></HeaderButton>
                    <HeaderButton text="About Us"></HeaderButton>
                    <Avatar alt="User" src={`${user.profile.user_dp}`} sx={headerUserAvatar}/>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={menuButton}>
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
                        <MenuItem onClick={handleEditProfileClick}>Edit Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Drafts</MenuItem>
                        <MenuItem onClick={handleClose}>Published</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}