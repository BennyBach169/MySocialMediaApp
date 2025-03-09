import axios from "axios";
import { User } from "../models/User";

class AuthService{

    async login(email:string,password:string){
        return (await axios.get<string>(`http://localhost:8080/auth/login?email=${email}&password=${password}`)).data
    }

    async logout(){
        return (await axios.post<string>(`http://localhost:8080/auth/logout`)).data
    }

    async register(user:User){
        return (await axios.post(`http://localhost:8080/auth/register`,user)).data 
    }

    async adminLogin(email:string,password:string){
        return (await axios.get<string>(`http://localhost:8080/auth/admin/api/login?email=${email}&password=${password}`)).data
    }

    async adminLogout(token:string){
        return (await axios.post(`http://localhost:8080/auth/admin/api/logout`,[],{ headers: { Authorization: "Bearer " + token } })).data
    }

}

const authService = new AuthService;
export default authService;
