import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx"
import { EditProfile } from "./pages/EditProfile.jsx"
import { BlogDetail } from "./pages/BlogDetail.jsx"

export default function App(){

    return (
        <div className="wrapper">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/editprofile" element={<EditProfile/>}/>
                    <Route path="/blogdetail" element={<BlogDetail/>}/>
                </Routes>
            </Router>
        </div>
    );
}