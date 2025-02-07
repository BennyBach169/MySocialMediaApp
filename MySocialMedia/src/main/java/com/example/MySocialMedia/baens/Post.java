package com.example.MySocialMedia.baens;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;


import java.util.Date;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "datetime")
    private Date datePosted;
    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    @Column(length = 5000)
    private String content;
    private long likeCount;


    public Post() {

    }

    public Post(Date datePosted, User author, String content, long likeCount) {
        this.datePosted = datePosted;
        this.author = author;
        this.content = content;
        this.likeCount = likeCount;
    }

    public Post(Date datePosted, User author, String content) {
        this.datePosted = datePosted;
        this.author = author;
        this.content = content;
    }

    public Post(User author, String content ,long likeCount) {
        this.author = author;
        this.content = content;
        this.likeCount = likeCount;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", datePosted=" + datePosted +
                ", author=" + author +
                ", content='" + content + '\'' +
                ", likeCount=" + likeCount +
                '}';
    }
}
