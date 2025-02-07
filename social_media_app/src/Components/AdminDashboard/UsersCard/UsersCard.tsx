import { useEffect, useState } from "react";
import "./UsersCard.css";
import { User } from "../../../models/User";
import { authStore } from "../../../redux/AuthStore";
import adminService from "../../../services/AdminService";
import { showErrorToast } from "../../ToastNotifications";
import { UserCard } from "./UserCard/UserCard";

export function UsersCard(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUsers,setActiveUsers] = useState<User[]>([]);

  useEffect(() => {
    pullData(); 

    const interval = setInterval(() => {
      pullData(); 
    }, 5000);

    return () => clearInterval(interval); 
  }, []); 

  function pullData(){
    let token = authStore.getState().adminToken;
    if (token) {
      adminService
        .getAllUsers(token)
        .then((res) => {setUsers(res)})
        .catch((err) => {showErrorToast(err.response.data)
            
        });

        adminService
        .getAllActiveUsers(token)
        .then((res) => setActiveUsers(res))
        .catch((err) => showErrorToast(err.response.data));
    }
  }

  return (
    <div className="UsersCard">
      {users?.map((u) => {
    if (!u) return null; // Check if user is null or undefined

    for (let act of activeUsers) {
      if (u.id === act.id) {
        return <UserCard key={u.id} user={u} isActive={true} pullData={pullData} />;
      }
    }
    return <UserCard key={u.id} user={u} isActive={false} pullData={pullData} />;
  })}
    </div>
  );
}
