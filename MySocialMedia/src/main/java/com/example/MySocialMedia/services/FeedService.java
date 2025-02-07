package com.example.MySocialMedia.services;

import com.example.MySocialMedia.baens.Following;
import com.example.MySocialMedia.baens.Post;
import com.example.MySocialMedia.baens.PostComment;
import com.example.MySocialMedia.baens.User;
import com.example.MySocialMedia.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeedService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private FollowingRepo followingRepo;
    @Autowired
    private PostCommentRepo postCommentRepo;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostLikeRepo postLikeRepo;


    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByIdDesc();
    }

    public List<PostComment> postComments(long postId) {
        ;
        return postCommentRepo.findByPostIdOrderByNewest(postId);
    }

    public int getPostCommentsCount(long postId) {
        return postCommentRepo.getCommentCountByPostId(postId);
    }

    public Post getPost(long postId) throws SQLException {
        return postRepository.findById(postId).orElseThrow(() -> new SQLException("Post Not Found!"));
    }

    public User getUserDetails(long id) throws SQLException {
        return userRepository.findById(id).orElseThrow(() -> new SQLException("User By ID not Found"));
    }

    public List<Post> getPostsByUserId(long id) {
        return postRepository.findByAuthorIdOrdered(id);
    }

    public List<Post> getPostsByFollowing(User user) {
        List<Post> posts = new ArrayList<>();
        List<Post> temp;
        for (Following f : followingRepo.findByFollower_Id(user.getId())) {
            temp = postRepository.findByAuthor_Id(f.getFollowed().getId());
            posts.addAll(temp);
        }
        return posts;
    }

    public List<User> getUserFollowers(long userId) {
        return followingRepo.getAllFollowers(userId);
    }

    public List<User> getUserFollowings(long userId) {
        return followingRepo.getAllFollowings(userId);
    }

    public List<User> findAllPostLikers(long postId){
        return postLikeRepo.findUsersByPostId(postId);
    }
}
