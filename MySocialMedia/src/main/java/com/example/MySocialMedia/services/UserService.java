package com.example.MySocialMedia.services;

import com.example.MySocialMedia.baens.*;
import com.example.MySocialMedia.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Service
@Scope("prototype")
public class UserService {
    private boolean loggedIn = false;
    private String email;
    private User user;
    private FollowingRepo followingRepo;
    private UserRepository userRepository;
    private PostRepository postRepository;
    private PostLikeRepo postLikeRepo;
    private PostCommentRepo postCommentRepo;

    public UserService(FollowingRepo followingRepo, UserRepository userRepository, PostRepository postRepository, PostLikeRepo postLikeRepo, PostCommentRepo postCommentRepo) {
        this.followingRepo = followingRepo;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.postLikeRepo = postLikeRepo;
        this.postCommentRepo = postCommentRepo;
    }

    public void login(String email, String password) throws SQLException {
        if (ValidateService.login(email, password)) {
            loggedIn = true;
            this.email =email;
            user = userRepository.findByEmail(email);

        }
    }

    public List<Post> getPosts() throws SQLException {
        if (loggedIn) {
            return postRepository.findByAuthorIdOrdered(user.getId());
        } else {
            throwException();
        }
        return null;
    }

    public User getUserDetails() throws SQLException {
        if (loggedIn) {
            return userRepository.findByEmail(email);

        } else {
            throwException();
        }
        return null;
    }

    public void updateUser(User user) throws SQLException {
        User temp = userRepository.findById(user.getId()).orElseThrow(() -> new SQLException("User not found with ID: " + user.getId()));
        if (loggedIn) {
            if(user.getId()!=temp.getId()){
              throw new SQLException("Oops Something went wrong");
            }
            if (user.getFirstName().isEmpty()) {
                user.setFirstName(temp.getFirstName());
            }
            if (user.getLastName().isEmpty()) {
                user.setLastName(temp.getLastName());
            }

            if (user.getUserName().isEmpty()) {
                user.setUserName(temp.getUserName());
            }else {
                user.setUserName(user.getUserName().replace("@",""));
                if(!user.getUserName().startsWith("@")){
                    user.setUserName("@"+user.getUserName());
                }
               if(!temp.getUserName().equals(user.getUserName())){
                   ValidateService.validateUpdateUser(user,false);
               }
            }

            if (user.getEmail().isEmpty()) {
                user.setEmail(temp.getEmail());
            }else {
              if(!temp.getEmail().equals(user.getEmail())){
                  ValidateService.validateUpdateUser(user,true);
              }
            }

            if (user.getPassword().isEmpty()) {
                user.setPassword(temp.getPassword());
            }
            if (user.getImage().isEmpty()) {
                user.setImage(temp.getImage());
            }
            userRepository.save(user);
        } else {
            throwException();
        }
    }

    public void addPost(Post post) throws SQLException {
        if (loggedIn) {
            if (post.getContent().length() > 5000) {
                throw new SQLException("This content length is too long!");
            }
            if (post.getAuthor().getId() != user.getId()) {
                throw new SQLException(("Oops something went wrong!"));
            }
            post.setDatePosted(new Date(System.currentTimeMillis()));
            post.setLikeCount(0);
            postRepository.save(post);
        } else {
            throwException();
        }
    }

    public void editPost(Post post) throws SQLException {
        Post temp = postRepository.findById(post.getId()).orElseThrow(() -> new SQLException("Post not found with ID: " + post.getId()));
        if (loggedIn) {
            if (temp.getAuthor().getId() != user.getId()) {
                throw new SQLException(("Oops something went wrong!"));
            }
            if (post.getContent().length() > 1000) {
                throw new SQLException("This content length is too long!");
            }
            temp.setContent(post.getContent());
            postRepository.save(temp);
        } else {
            throwException();
        }
    }

    public void deletePost(long id) throws SQLException {
        Post temp = postRepository.findById(id).orElseThrow(() -> new SQLException("Post not found with ID: " + id));

        if (loggedIn) {
            if (temp.getAuthor().getId() == user.getId()) {
                postLikeRepo.deleteByPostId(id);
                postCommentRepo.deleteCommentsByPostId(id);
                postRepository.deleteById(id);
            } else {
                throw new SQLException("Oops something went wrong");
            }
        } else {
            throwException();
        }
    }

    public boolean likeUnlike(Post post) throws SQLException {
        boolean liked = false;
        if (loggedIn) {
            Post temp = postRepository.findById(post.getId()).orElseThrow(() -> new SQLException("Error"));
            PostLike postLike = postLikeRepo.findByPostIdAndLikerId(post.getId(), user.getId());
            if (postLike != null) {
                temp.setLikeCount(temp.getLikeCount() - 1);
                postRepository.save(temp);
                postLikeRepo.deleteById(postLike.getId());
                liked = false;
            } else {

                temp.setLikeCount(temp.getLikeCount() + 1);
                postRepository.save(temp);
                postLikeRepo.save(new PostLike(temp, user));
                liked = true;
            }
        } else {
            throwException();
        }
        return liked;
    }



    public boolean checkIfPostLiked(long postId) throws SQLException {
        boolean found = false;
        if (loggedIn) {
            Post temp = postRepository.findById(postId).orElseThrow(() -> new SQLException("Error"));
            if (postLikeRepo.existsByPostIdAndLikerId(postId, user.getId())) {
                found = true;
            } else {
                found = false;
            }
        } else {
            throwException();
        }
        return found;
    }

    public void commentOnPost(PostComment postComment) throws SQLException {

        if (loggedIn) {
            Post temp = postRepository.findById(postComment.getPost().getId()).orElseThrow(() -> new SQLException("Error"));
            if (postComment.getMessage().length() > 1000) {
                throw new SQLException("Comment too long please try again");
            } else {
                postComment.setDateCommented(new Date(System.currentTimeMillis()));
                postComment.setCommentAuthor(user);
                postCommentRepo.save(postComment);
            }
        }
    }

    public void deleteComment(long postCommentId) throws SQLException {
        if (loggedIn) {
            PostComment temp = postCommentRepo.findById(postCommentId).orElseThrow(() -> new SQLException("Error"));
            if (temp.getCommentAuthor().getId() == user.getId()) {
                postCommentRepo.deleteById(postCommentId);
            } else {
                throw new SQLException(("Something went wrong"));
            }
        } else {
            throwException();
        }
    }

    public boolean followUnfollow(long followed) throws SQLException {
        User toBeFollowed = userRepository.findById(followed).orElseThrow(() -> new SQLException("Error"));
        Following following = new Following(user, toBeFollowed);
        boolean followingUser = false;
        if (loggedIn) {
            Following temp = followingRepo.findByFollowerIdAndFollowedId(user.getId(), following.getFollowed().getId());
            if (following.getFollower().getId() == user.getId()) {
                if (temp != null) {
                    followingRepo.deleteById(temp.getId());
                } else {
                    followingRepo.save(following);
                    followingUser = true;
                }
            }
        } else {
            throwException();
        }
        return followingUser;
    }

    public boolean checkIfFollowing(long followedId) throws SQLException {
        boolean followingUser = false;
        User toBeFollowed = userRepository.findById(followedId).orElseThrow(() -> new SQLException("Error"));
        Following following = new Following(user, toBeFollowed);
        if(loggedIn){
            Following temp = followingRepo.findByFollowerIdAndFollowedId(user.getId(), toBeFollowed.getId());
            if(temp != null){
                followingUser = true;
            }
        }
        return followingUser;
    }

    public List<User> getAllFollowers() {
        if (loggedIn) {
            return followingRepo.getAllFollowers(user.getId());
        } else {
            return null;
        }
    }

    public List<User> getAllFollowing() {
        if (loggedIn) {
            return followingRepo.getAllFollowings(user.getId());
        } else {
            return null;
        }
    }

    public List<Post> findPostOfFollowing(){
        if(loggedIn){
            return postRepository.findPostsByFollowerId(user.getId());
        }
        return null;
    }






    private void throwException() throws SQLException {
        throw new SQLException("Please Login");
    }


}
