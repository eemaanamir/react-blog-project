import {Button} from "@mui/material";
import React from "react";
import {menuButton} from "../emoticonCss.jsx";

export const HeaderButton = ({text, callBack}) => {
    return (
        <Button variant="text"
                onClick= {callBack}
                sx={menuButton}>
            {text}</Button>
    )
}