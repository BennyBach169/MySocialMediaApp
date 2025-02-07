package com.example.MySocialMedia.controllers;

import com.example.MySocialMedia.Security.Session;
import com.example.MySocialMedia.Security.SessionManager;
import com.example.MySocialMedia.Security.TokenManager;
import com.example.MySocialMedia.baens.Post;
import com.example.MySocialMedia.baens.PostComment;
import com.example.MySocialMedia.baens.User;
import com.example.MySocialMedia.repositories.PostCommentRepo;
import com.example.MySocialMedia.repositories.PostRepository;
import com.example.MySocialMedia.repositories.UserRepository;
import com.example.MySocialMedia.services.AdminService;
import com.example.MySocialMedia.services.UserService;
import com.example.MySocialMedia.services.ValidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private SessionManager sessionManager;
    @Autowired
    ApplicationContext ctx;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostCommentRepo postCommentRepo;
    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/posts")
//    public List<Post> getAllPosts(){
//        return postRepository.findAllByOrderByIdDesc();
//    }
//
//    @GetMapping("/postcomments/{postId}")
//    public List<PostComment> postComments(@PathVariable long postId) {;
//        return postCommentRepo.findByPostId(postId);
//    }

    @GetMapping("/login")
    public String login( String email, String password) throws SQLException {
       UserService userService = ctx.getBean(UserService.class);
       userService.login(email,password);
       return getNewTokenOrExistingOne(email,password,userService);
    }

    @GetMapping("/admin/api/login")
    public String adminLogin(String email , String password) throws Exception {
        AdminService adminService = ctx.getBean(AdminService.class);
        adminService.login(email,password);
        String token = TokenManager.createAdminToken(adminService);
        sessionManager.addSession(token,new Session(TokenManager.setExpiredInMinutes(30),adminService));
        return token;
    }

    @PostMapping("/admin/api/logout")
    public void adminLogout( @RequestHeader(value = "Authorization") String token){
        token =token.replace("Bearer ", "");
        sessionManager.endSession(token);
    }




    @PostMapping("/logout")
    public void logout( @RequestHeader(value = "Authorization") String token){
        token =token.replace("Bearer ", "");
        sessionManager.endSession(token);
    }

    @PostMapping("/register")
    public void register(@RequestBody User user) throws SQLException {
        user.setUserName(user.getUserName().replace("@",""));
        user.setUserName("@"+user.getUserName());
        ValidateService.validateCredentials(user);
        if(user.getImage().isEmpty()) {
            user.setImage("/assets/Unknown_person.jpg");
            userRepository.save(user);
        }
        userRepository.save(user);
    }





    public String getNewTokenOrExistingOne(String email , String password,UserService userService) throws SQLException {
        String id = email+password;
        String token = "";
                if(sessionManager.checkIfSessionAlreadyExist(id).equals("new")){
                    token = TokenManager.createToken(userService);
                    sessionManager.addSession(token,new Session(userService, TokenManager.setExpiredInMinutes(30),id));

                }else {
                    token= sessionManager.checkIfSessionAlreadyExist(id);
                }
        return token;
    }
}
