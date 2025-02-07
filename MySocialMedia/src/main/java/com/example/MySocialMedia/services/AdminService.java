package com.example.MySocialMedia.services;

import com.example.MySocialMedia.Security.SessionManager;
import com.example.MySocialMedia.baens.Post;
import com.example.MySocialMedia.baens.User;
import com.example.MySocialMedia.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Objects;

@Service
public class AdminService {
    private boolean loggedIn = false;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private FollowingRepo followingRepo;
    @Autowired
    private PostCommentRepo postCommentRepo;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SessionManager sessionManager;
    @Autowired
    private PostLikeRepo postLikeRepo;


    public void login(String email , String password) throws Exception {

        if(email.equals("admin0admin")&& password.equals("admin45742")){
            loggedIn=true;
        }else {
      throw new Exception("error");
        }
    }

    public List<User> getAllUsers() throws Exception {
        if(loggedIn) {
            return userRepository.findAll();
        }else {
            throw new Exception("Not authorized");
        }
    }

    @Transactional
    public void deleteUser(long userId) throws Exception {
        if(loggedIn){
            postCommentRepo.deleteCommentsByAuthorId(userId);
            postLikeRepo.deleteAllLikesByUser(userId);
            for(Post p:postRepository.findByAuthor_Id(userId)){
                deletePost(p.getId());
            }

            followingRepo.deleteUserFollowingHistory(userId);
            userRepository.deleteById(userId);
        }else {
            throw new Exception("Not authorized");
        }
    }

    public List<User> getActiveUsers() throws SQLException {
        return sessionManager.activeSessions();
    }

    public void kickFromSession(long userId) throws SQLException {
        sessionManager.kickFromSession(userId);
    }


    public void deletePost(long id) throws SQLException {
                postLikeRepo.deleteByPostId(id);
                postCommentRepo.deleteCommentsByPostId(id);
                postRepository.deleteById(id);


    }
}
