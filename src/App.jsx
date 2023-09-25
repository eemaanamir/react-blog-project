import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx"
import { EditProfile } from "./pages/EditProfile.jsx"
import { BlogDetail } from "./pages/BlogDetail.jsx"
import {createTheme, ThemeProvider} from "@mui/material";

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

export default function App(){

    return (
        <ThemeProvider theme={theme}>
        <div className="wrapper">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/sign-up" element={<Signup />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/edit-profile" element={<EditProfile/>}/>
                    <Route path="/blog-detail" element={<BlogDetail/>}/>
                </Routes>
            </Router>
        </div>
        </ThemeProvider>
    );
}