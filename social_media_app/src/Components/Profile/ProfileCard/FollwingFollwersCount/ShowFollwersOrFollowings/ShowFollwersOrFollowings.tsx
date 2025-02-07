import { User } from "../../../../../models/User";
import { FollowingsProfiles } from "./FollowingsProfiles/FollowingsProfiles";
import "./ShowFollwersOrFollowings.css";

interface DataProps{
    handleBack():void
    users:User[];
    headerDisplay:string;
}

export function ShowFollwersOrFollowings(props:DataProps): JSX.Element {
    return (
        <div className="ShowFollwersOrFollowings">
			<div className="backEditBox">
        <span className="xBack" onClick={() => props.handleBack()}>
          X
        </span>
        <span className="editHaeder">{props.headerDisplay}</span>
      </div>

      {props.users?.map(u=><FollowingsProfiles user={u} key={u.id}/>)}
        </div>
    );
}
