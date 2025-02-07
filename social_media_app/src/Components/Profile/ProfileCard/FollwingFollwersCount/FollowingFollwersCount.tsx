import { useEffect, useState } from "react";
import "./FollowingFollwersCount.css";
import userService from "../../../../services/UserService";
import { User } from "../../../../models/User";
import { showErrorToast } from "../../../ToastNotifications";
import feedService from "../../../../services/FeedService";
import { ShowFollwersOrFollowings } from "./ShowFollwersOrFollowings/ShowFollwersOrFollowings";

interface DataProps {
  user: User;
  editable: boolean;
}

export function FollowingFollwersCount(props: DataProps): JSX.Element {
  const [followers, setFollowers] = useState<User[]>([]);
  const [followings, setFollowings] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [headerDisplay,setHeaderDisplay] =useState<string>("");
  const [showUers,setShowUsers] = useState<boolean>(false);

  useEffect(() => {
    feedService
      .getAllFollwers(props.user.id!)
      .then((res) => setFollowers(res))
      .catch((err) => showErrorToast(err.respose.data));

    feedService
      .getAllFollwings(props.user.id!)
      .then((res) => setFollowings(res))
      .catch((err) => showErrorToast(err.respose.data));
  }, []);

  function handleBack(){
    setShowUsers(false)
  }

  function handleClickFollwers(){
    setHeaderDisplay("Followers")
    setUsers(followers)
    setShowUsers(true)
    
  }
  function handleClickFollwings(){
    setHeaderDisplay("Following")
    setUsers(followings)
    setShowUsers(true)
  }

  return (
    <div className="FollwingFollwersCount">
      {followers && (
        <div className="follwersCount" onClick={handleClickFollwers}>
          <span className="count">{followers.length}</span>
          <span className="followersText">Followers</span>
        </div>
      )}

      {followings && (
        <div className="follwersCount" onClick={handleClickFollwings}>
          <span className="count">{followings.length}</span>
          <span className="followersText">Following</span>
        </div>
      )}
       {showUers&& <ShowFollwersOrFollowings handleBack={handleBack} users={users} headerDisplay={headerDisplay}/>}
    </div>

  );
}
