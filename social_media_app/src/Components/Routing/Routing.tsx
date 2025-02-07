import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../Home/Home";
import { Profile } from "../Profile/Profile";
import { Login } from "../Login/Login";
import ScrollToTop from "../ScrollToTop";
import { Register } from "../Login/Register/Register";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import { PostPage } from "../PostPage/PostPage";
import { Likers } from "../Likers/Likers";

export function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <ScrollToTop/>
			<Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/postpage" element={<PostPage/>}/>
                <Route path="/likers/:id" element={<Likers/>}/>
            </Routes>
        </div>
    );
}
