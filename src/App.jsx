import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";


import { Signup } from "./pages/Signup.jsx";
import { EmailVerification} from "./pages/EmailVerification.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx"
import { EditProfile } from "./pages/EditProfile.jsx"
import { BlogDetail } from "./pages/BlogDetail.jsx"
import {DraftsList} from "./pages/DraftsList.jsx";
import {DraftCreate} from "./pages/DraftCreate.jsx";
import {DraftEdit} from "./pages/DraftEdit.jsx";
import {PublishedList} from "./pages/PublishedList.jsx";
import {PublishedEdit} from "./pages/PublishedEdit.jsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#214252',
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
                    <Route path="/verify-email" element={<EmailVerification />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/edit-profile" element={<EditProfile/>}/>
                    <Route path="/blog-detail" element={<BlogDetail/>}/>
                    <Route path="/draft-list" element={<DraftsList/>}/>
                    <Route path="/draft-create" element={<DraftCreate/>}/>
                    <Route path="/draft-edit" element={<DraftEdit/>}/>
                    <Route path="/published-list" element={<PublishedList/>}/>
                    <Route path="/published-edit" element={<PublishedEdit/>}/>
                </Routes>
            </Router>
        </div>
        </ThemeProvider>
    );
}