import axios from "axios";
import { User } from "../models/User";

class AdminService{
    async getAllUsers(token:string){
        return (await axios.get<User[]>(`http://192.168.1.105:8080/api/admin/users`,{ headers: { Authorization: "Bearer " + token } })).data
      }
      async getAllActiveUsers(token:string){
        return (await axios.get<User[]>(`http://192.168.1.105:8080/api/admin/users/active`,{ headers: { Authorization: "Bearer " + token } })).data
      }

      async deleteUser(token:string,userId:number){
        return (await axios.delete(`http://192.168.1.105:8080/api/admin/users/deleteuser/${userId}`,{ headers: { Authorization: "Bearer " + token } })).data
      }

}

const adminService = new AdminService;
export default adminService;