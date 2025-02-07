import { useNavigate } from "react-router-dom";
import { User } from "../../../../models/User";
import "./UserCard.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { authStore } from "../../../../redux/AuthStore";
import adminService from "../../../../services/AdminService";
import { showErrorToast, showSuccessToast } from "../../../ToastNotifications";
interface DataProps{
    user:User
    isActive:boolean
    pullData():void
}

export function UserCard(props:DataProps): JSX.Element {
    const navigate=useNavigate();

    function handleClick(){
        let token = authStore.getState().adminToken;
        if (token) {
          adminService
            .deleteUser(token,props.user.id!)
            .then((res) => {showSuccessToast("Deleted"); props.pullData();})
            .catch((err) => showErrorToast(err.response.data));
        }

    }
    return (
        <div className="UserCard">
            {props.isActive&&
                <div className="isActive"></div>
            }
            
			  <div
                    className="profileImage"
                    onClick={() => {
                        navigate("/profile/" + props.user.id);
                        window.location.reload();
                      }}
                  >
                    <img src={props.user.image} />
                  </div>
                  <div className="profileDetails">
                    <div
                      className="ProfileFullName"
                      onClick={() => {
                        navigate("/profile/" + props.user.id);
                        window.location.reload();
                      }}
                    >
                      <span>{props.user.firstName}</span>
                      <span>{props.user.lastName}</span>
                      
                    </div>
                    <div className="profileUserName">{props.user.userName}</div>
                    <button onClick={handleClick}><DeleteForeverIcon style={{
                        color:"gray"
                    }}/></button>
                    
                  </div>
        </div>
    );
}
