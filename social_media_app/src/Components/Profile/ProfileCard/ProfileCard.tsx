import { User } from "../../../models/User";
import { ProfileImages } from "./ProfileImages/ProfileImages";
import "./ProfileCard.css";
import { FollowingFollwersCount } from "./FollwingFollwersCount/FollowingFollwersCount";
interface DataProps {
  user: User;
  editable: boolean;
  updateState():void
}
export function ProfileCard(props: DataProps): JSX.Element {
  function updateState(){
    props.updateState();
  }
  return (
    <div className="ProfileCard">
      {/* <div className="profileImages">
        <div className="CoverPhoto">
          <img src={props.user.image} alt="" />
        </div>
        <div className="profilePic">
          <img src={props.user.image} alt="" />
        </div>
      </div> */}
      <ProfileImages updateState={updateState} user = {props.user} editable = {props.editable}/>
      <div className="fullNameAndUsername">
        <span className="fullNameProfileCard">{props.user.firstName} {props.user.lastName}</span>
        <span className="userNameProfileCard">{props.user.userName}</span>
      </div>
      <FollowingFollwersCount user={props.user} editable={props.editable}/>
    </div>
  );
}
