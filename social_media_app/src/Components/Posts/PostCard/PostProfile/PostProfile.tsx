import { useNavigate } from "react-router-dom";
import { User } from "../../../../models/User";
import {  timeAgo } from "../../../../Utils";
import "./PostProfile.css";


interface DataProps {
  user: User;
  datePosted: Date;
}

export function PostProfile(props: DataProps): JSX.Element {
  const navigate = useNavigate();


  return (
    <div className="PostProfile">
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
        <div className="profilePostDate">
          <span> · </span>
          {timeAgo(props.datePosted)}
        </div>
      </div>
      
   
    </div>
  );
}
