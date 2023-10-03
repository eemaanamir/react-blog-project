import {AppBar, Typography} from "@mui/material";
import {appBar, blogyFooterText} from "../emoticonCss.jsx";

export const Footer = () =>{
    return (
        <div style={{marginTop: '8rem'}}>
            <AppBar position="relative" alignitems="center" sx={appBar}>
                <Typography variant="h6" color="inherit" noWrap sx={blogyFooterText}>
                    Created by Eemaan Amir
                </Typography>
            </AppBar>
        </div>
    )
}