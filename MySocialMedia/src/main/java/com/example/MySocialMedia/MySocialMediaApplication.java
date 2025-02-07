package com.example.MySocialMedia;

import com.example.MySocialMedia.baens.*;
import com.example.MySocialMedia.repositories.PostLikeRepo;
import com.example.MySocialMedia.repositories.UserRepository;
import com.example.MySocialMedia.services.UserService;
import com.example.MySocialMedia.services.ValidateService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;

@SpringBootApplication
@EnableScheduling
public class MySocialMediaApplication {

	public static void main(String[] args) {

		ApplicationContext ctx = SpringApplication.run(MySocialMediaApplication.class, args);


//		UserService userService = ctx.getBean(UserService.class);
//        UserService userService2 = ctx.getBean(UserService.class);
//        PostLikeRepo postLikeRepo = ctx.getBean(PostLikeRepo.class);
//        UserRepository userRepository =ctx.getBean(UserRepository.class);
//        try {
//            User user = userRepository.findById((long)3).orElseThrow();
//            User user1 = userRepository.findById((long)2).orElseThrow();

//            userService.login(user.getEmail(),user.getPassword());
//            userService2.login(user1.getEmail(),user1.getPassword());
//            System.out.println(userService.getUserDetails());
//            System.out.println(userService2.getUserDetails());
//            Post post = new Post(user,"new author",120);
//            Post post2 = new Post(user1,"third author",5);
//            userService.addPost(post);
//            userService2.addPost(post2);
//            Post post = userService.getPosts().get(0);
//            userService.commentOnPost(new PostComment(post,"comment on my post"));
//            userService2.likeUnlike(post);
//            userService.likeUnlike(post);
//            userService.editPost(5,"Edited post");
//            userService.deletePost(post.getId());
//            userService2.followUnfollow(1);
//            userService.followUnfollow(2);
//            System.out.println(userService.getAllFollowers());
//            System.out.println(userService2.getAllFollowing());
//
//            userService2.commentOnPost(new PostComment(post,userService2.getUserDetails(),"I found For you New Job!!! :)"));
//            userService.deletePost(1);
//        } catch (SQLException e) {
//            throw new RuntimeException(e);
//        }


    }
}
