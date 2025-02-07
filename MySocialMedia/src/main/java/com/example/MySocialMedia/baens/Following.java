package com.example.MySocialMedia.baens;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "Followings")
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    @ManyToOne
    @JoinColumn(name = "followed_id", nullable = false)
    private User followed;

    public Following() {
    }

    public Following(User follower, User followed) {
        this.follower = follower;
        this.followed = followed;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollowed() {
        return followed;
    }

    public void setFollowed(User following) {
        this.followed = following;
    }

    @Override
    public String toString() {
        return "Following{" +
                "id=" + id +
                ", follower=" + follower +
                ", following=" + followed +
                '}';
    }
}

