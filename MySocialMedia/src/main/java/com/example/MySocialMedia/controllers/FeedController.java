package com.example.MySocialMedia.controllers;

import com.example.MySocialMedia.baens.Post;
import com.example.MySocialMedia.baens.PostComment;
import com.example.MySocialMedia.baens.User;
import com.example.MySocialMedia.services.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/feed")
public class FeedController {
    @Autowired
    private FeedService feedService;

    @GetMapping("/posts")
    public List<Post> getAllPosts(){
        return feedService.getAllPosts();
    }

    @GetMapping("/postcomments/{postId}")
    public List<PostComment> postComments(@PathVariable long postId) {;
        return feedService.postComments(postId);
    }

    @GetMapping("/getpost/{postId}")
    public Post getPost(@PathVariable long postId) throws SQLException {
        return feedService.getPost(postId);
    }

    @GetMapping("/getCommentsCount/{postId}")
    public int getCommentsCount(@PathVariable long postId){
        return feedService.getPostCommentsCount(postId);
    }

    @GetMapping("/getuserbyid/{userId}")
    public User getUserDetails(@PathVariable long userId) throws SQLException {
       return feedService.getUserDetails(userId);
    }

    @GetMapping("/getusersposts/{userId}")
    public List<Post> getPostsByUserId(@PathVariable long userId){
        return feedService.getPostsByUserId(userId);
    }

    @GetMapping("/getuserfollowers/{userId}")
    public List<User> getUserFollowers(@PathVariable long userId){
        return feedService.getUserFollowers(userId);
    }

    @GetMapping("/getuserfollowings/{userId}")
    public List<User> getUserFollowings(@PathVariable long userId){
        return feedService.getUserFollowings(userId);
    }

    @GetMapping("/findallpostlikers/{postId}")
    public List<User> findAllPostLikers(@PathVariable long postId){
        return feedService.findAllPostLikers(postId);
    }
}
