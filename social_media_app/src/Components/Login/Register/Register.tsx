import { useState } from "react";
import "./Register.css";
import { User } from "../../../models/User";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/AuthService";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";

export function Register(): JSX.Element {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const navigate = useNavigate();
  
   
  
    const handleSubmit = (event: React.FormEvent) => {
        // let defaultImage :string;
        // if(imageUrl==""){
        //     defaultImage ="/assets/Unknown_person.jpg";
        // }else{
        //     defaultImage = imageUrl;
        // }
      event.preventDefault();
      let newUser: User = new User(
        0,
        firstName,
        lastName,
        userName,
        imageUrl,
        email,
        password
      );
      
  
      authService.register(newUser)
      .then(res=>{showSuccessToast("Registered")
        navigate("/login")
      })
      .catch(err=>showErrorToast(err.response.data))
    };
  
    return (
        <div className="Register">
			      <div className="backEditBox">
        <span className="xBack" onClick={() => navigate("/login")}>
          X
        </span>
        <span className="editHaeder">Register</span>
      </div>
      <form onSubmit={handleSubmit} className="editForm">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
