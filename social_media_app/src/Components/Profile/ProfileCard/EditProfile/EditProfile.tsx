import { useEffect, useState } from "react";
import "./EditProfile.css";
import { User } from "../../../../models/User";
import userService from "../../../../services/UserService";
import { getToeknState } from "../../../../Utils";
import { showErrorToast, showSuccessToast } from "../../../ToastNotifications";
import { useNavigate } from "react-router-dom";
interface DataProps {
  handleBack(): void;
  user: User;
}
export function EditProfile(props: DataProps): JSX.Element {
  const [firstName, setFirstName] = useState<string>(props.user.firstName!);
  const [lastName, setLastName] = useState<string>(props.user.lastName!);
  const [userName, setUserName] = useState<string>(props.user.userName!);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(props.user.image!);

  useEffect(() => {    
  },[]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let userUpdate: User = new User(
      props.user.id,
      firstName,
      lastName,
      userName,
      imageUrl,
      email,
      password
    );
    console.log(userUpdate)

    userService.updateUser(userUpdate)
    .then(res=>{showSuccessToast("User Updated")
      props.handleBack();
      // window.location.reload();
    })
    .catch(err=>showErrorToast(err.response.data))
  };

  return (
    <div className="EditProfile">
      <div className="backEditBox">
        <span className="xBack" onClick={() => props.handleBack()}>
          X
        </span>
        <span className="editHaeder">Edit Profile</span>
      </div>
      <form onSubmit={handleSubmit} className="editForm">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="submitEditsButton" type="submit" >SAVE</button>
        </div>
      </form>
    </div>
  );
}
