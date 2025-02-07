import { useState } from "react";
import { User } from "../../../../models/User";
import "./ProfileImages.css";
import { EditProfile } from "../EditProfile/EditProfile";
import { FollowUnfollow } from "../../../FollowUnfollow/FollowUnfollow";
interface DataProps {
  user: User;
  editable: boolean;
  updateState():void
}
export function ProfileImages(props: DataProps): JSX.Element {
  const [editClicked,setEditClicked] = useState<boolean>(false);

  function handleBack(){
    setEditClicked(false)
    props.updateState();
  }
  return (
    <div className="ProfileImages">
      <div className="CoverPhoto">
        <img src={props.user.image} alt="" />
      </div>
      <div className="profilePic">
        <img src={props.user.image} alt="" />
      </div>
      {!props.editable && <FollowUnfollow toBeFollowedId={props.user.id!}/>}
      {props.editable && <button className="profileEdit" onClick={()=>setEditClicked(true)}>Edit Profile</button>}
      {editClicked && <EditProfile handleBack={handleBack} user={props.user}/>}
    </div>
  );
}
