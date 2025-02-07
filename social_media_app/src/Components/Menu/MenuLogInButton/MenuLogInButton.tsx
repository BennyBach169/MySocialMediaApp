import { useEffect, useState } from "react";
import "./MenuLogInButton.css";
import userService from "../../../services/UserService";
import { getToeknState } from "../../../Utils";
import { User } from "../../../models/User";
import { authStore, logOut } from "../../../redux/AuthStore";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/AuthService";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { showErrorToast } from "../../ToastNotifications";

export function MenuLogInButton(): JSX.Element {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);  // Make user type nullable
    const [userName, setUserName] = useState<string>("");
    const [selectVal,setSelectVal] = useState<string>("dot");
    

    // Trigger effect when userName or token changes
    useEffect(() => {
        setSelectVal("dot")
        if (getToeknState()) {
            userService.getUserDetails()
                .then(res => {setUser(res)})
                .catch(err => {
                    showErrorToast(err.response.data)
                    navigate("/login")
                    authStore.dispatch(logOut());
                });  // Handle errors gracefully
        }

        // Update username from the Redux store
        setUserName(authStore.getState().userName);

        // Subscribe to changes in authStore for userName
        const unsubscribe = authStore.subscribe(() => {
            setUserName(authStore.getState().userName);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [authStore.getState().userName, getToeknState(),selectVal]);  // Re-run when userName or token changes

    function handleLogout() {
        let token = authStore.getState().token;
        authService.logout()
        .then(res=>{
            navigate("/login")
          authStore.dispatch(logOut());
        })
        .catch(err=>alert(err.response.data))
      }


      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        if(selectedOption ==="out"){
            setSelectVal("dot")
            handleLogout();
        }
      }
     
      

    return (
        <div className="MenuLogInButton">
            {user ? (
                <div className="logginButtonsAndDetails">
                    <div className="profileCircleLogin">
                    <img src={user.image} alt="hello" onClick={()=>{navigate(`/profile/${user.id}`); window.location.reload();}}/>
                    </div>
                    <div className="userDetailsMenu">
                        <span>{user.firstName} {user.lastName}</span>
                        <span style={{
                            color:" rgba(0, 0, 0, 0.358)"
                        }}>{user.userName}</span>
                    </div>
                    <select  className="menuSelectLogin" onChange={handleSelectChange}   >
                            <option value="dot" className="dots">• • •</option>
                            <option value="out" className="selscted">
                                LogOut
                            </option>
                        </select>
                </div>
            ) : (
                <div className="regLog">
                <div className="profileCircleLogin2" onClick={()=>navigate('/login')}>
                    LOGIN
                </div>
                <div id="register" className="profileCircleLogin2" onClick={()=>navigate('/register')}>
                    REGISTER
                </div>
                {/* <button onClick={()=>navigate('/login')} className="menuLogin">LogIn</button> */}
                </div>
            )}
        </div>
    );
    
}



