import {Button} from "@mui/material";
import {menuButton} from "../emoticonCss.jsx";

// eslint-disable-next-line react/prop-types
export const HeaderButton = ({text, callBack}) => {
    return (
        <Button variant="text"
                onClick= {callBack}
                sx={menuButton}>
            {text}</Button>
    )
}