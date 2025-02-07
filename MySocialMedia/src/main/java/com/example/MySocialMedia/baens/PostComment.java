package com.example.MySocialMedia.baens;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Date;

@Entity
@Table(name="post_comments")
public class PostComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Post post;
    @ManyToOne
    private User commentAuthor;
    @Column(columnDefinition = "datetime")
    private Date dateCommented;
    private String message;


    public PostComment() {
    }


    public PostComment(Post post, User commentAuthor, String message ,Date dateCommented) {
        this.post = post;
        this.commentAuthor = commentAuthor;
        this.message = message;
        this.dateCommented =dateCommented;
    }

    public PostComment(Post post, String message) {
        this.post = post;
        this.message = message;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getCommentAuthor() {
        return commentAuthor;
    }

    public void setCommentAuthor(User commentAuthor) {
        this.commentAuthor = commentAuthor;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDateCommented() {
        return dateCommented;
    }

    public void setDateCommented(Date dateCommented) {
        this.dateCommented = dateCommented;
    }

    @Override
    public String toString() {
        return "PostComment{" +
                "id=" + id +
                ", post=" + post +
                ", commentAuthor=" + commentAuthor +
                ", message='" + message + '\'' +
                '}';
    }
}
