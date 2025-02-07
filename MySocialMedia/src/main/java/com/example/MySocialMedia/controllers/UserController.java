package com.example.MySocialMedia.controllers;

import com.example.MySocialMedia.Security.SessionManager;
import com.example.MySocialMedia.baens.Post;
import com.example.MySocialMedia.baens.PostComment;
import com.example.MySocialMedia.baens.User;
import com.example.MySocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private SessionManager sessionManager;


    private UserService getInstance(String token) throws SQLException {
        token =token.replace("Bearer ", "");
        UserService userService = sessionManager.getService(token);
        sessionManager.updateSessionExpiration(token);
        return userService;
    }

    @GetMapping("/details")
    public User getUserDetails(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getUserDetails();
    }
    @PutMapping("updateuser")
    public void updateUser(@RequestHeader(value = "Authorization") String token,@RequestBody User user) throws SQLException {
        getInstance(token).updateUser(user);
    }

    @GetMapping("/followers")
    public List<User> getAllFollowers(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getAllFollowers();
    }
    @GetMapping("followings")
    public List<User> showAllFollowings(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getAllFollowing();
    }

    @PostMapping("followunfollow/{followedId}")
    public boolean followUser(@RequestHeader(value = "Authorization") String token,@PathVariable int followedId) throws SQLException {
        return getInstance(token).followUnfollow(followedId);
    }

    @GetMapping("/checkIfFollowing/{followedId}")
    public boolean checkIfFollowing(@RequestHeader(value = "Authorization") String token,@PathVariable long followedId) throws SQLException {
        return getInstance(token).checkIfFollowing(followedId);
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts(@RequestHeader(value = "Authorization") String token) throws SQLException {
        return getInstance(token).getPosts();
    }

    @PostMapping("/addpost")
    public void addPost(@RequestHeader(value = "Authorization") String token,@RequestBody Post post) throws SQLException {
        getInstance(token).addPost(post);
    }
    @PutMapping("/editpost")
    public void editPost(@RequestHeader(value = "Authorization") String token,@RequestBody Post post) throws SQLException {
        getInstance(token).editPost(post);
    }
    @DeleteMapping("/deletepost/{postId}")
    public void deletePost(@RequestHeader(value = "Authorization") String token,@PathVariable long postId) throws SQLException {
        getInstance(token).deletePost(postId);
    }

    @PostMapping("/post/likeunlike")
    public boolean likeUnlike(@RequestHeader(value = "Authorization") String token,@RequestBody Post post) throws SQLException {
        return getInstance(token).likeUnlike(post);
    }

    @PostMapping("/post/comment")
    public void addComment(@RequestHeader(value = "Authorization") String token,@RequestBody PostComment comment) throws SQLException {
        getInstance(token).commentOnPost(comment);
    }

    @DeleteMapping("/post/deletecomment/{commentId}")
    public void deletePostComment(@RequestHeader(value = "Authorization") String token,@PathVariable long commentId) throws SQLException {
        getInstance(token).deleteComment(commentId);
    }

    @GetMapping("/checkIfPostLiked/{postId}")
    public boolean checkIfPostLiked(@RequestHeader(value = "Authorization") String token, @PathVariable long postId) throws SQLException {
        return getInstance(token).checkIfPostLiked(postId);
    }
    @GetMapping("/postsofollowings")
    public List<Post> findPostOfFollowing(@RequestHeader(value = "Authorization") String token) throws SQLException {
            return getInstance(token).findPostOfFollowing();
    }




}
