export class User{
    
    id?:number;
    firstName?:string;
    lastName?:string;
    userName?:string;
    image?:string;
    email?:string;
    password?:string;

    constructor(
        id?:number,
        firstName?:string,
        lastName?:string,
        userName?:string,
        image?:string,
        email?:string,
        password?:string
    ){
        this.id=id
        this.firstName=firstName
        this.lastName=lastName
        this.userName=userName
        this.image=image;
        this.email=email;
        this.password=password;
    }
}