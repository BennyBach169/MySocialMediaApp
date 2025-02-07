import { Post } from "./Post";
import { User } from "./User";

export class PostComment{
    id:number;
    commentAuthor:User;
    message:string;
    dateCommented:Date;
    post?:Post;

    constructor(
        id:number,
        commentAuthor:User,
        message:string,
        dateCommented:Date,
        post?:Post
    ){
        this.id=id;
        this.commentAuthor=commentAuthor;
        this.message=message;
        this.dateCommented =dateCommented;
        this.post=post;
    }
}