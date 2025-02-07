package com.example.MySocialMedia.services;

import com.example.MySocialMedia.baens.User;
import com.example.MySocialMedia.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class ValidateService {
     private static UserRepository userRepository;

    public ValidateService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void validateCredentials(User user) throws SQLException {
//        String regex = "^[a-zA-Z0-9+&*-]+(?:\\.[a-zA-Z0-9+&-]+)@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        if (userRepository.existsByEmail(user.getEmail().toLowerCase())) {
            throw new SQLException("Email Already Exists");
        }
        if (userRepository.existsByUserName(user.getUserName().toLowerCase())) {
            throw new SQLException("User Name Already Exists");
        }
//        if(!user.getEmail().matches(regex)){
//            throw new SQLException("Invalid Email");
//        }
        if(user.getPassword().length()<6){
            throw new SQLException("Invalid Password , Must be at least 6 characters");
        }
    }

    public static void validateUpdateUser(User user , boolean checkEmail) throws SQLException {
        if(checkEmail) {
            if (userRepository.existsByEmail(user.getEmail().toLowerCase())) {
                throw new SQLException("Email Already Exists");
            }
        }else {
            if (userRepository.existsByUserName(user.getUserName().toLowerCase())) {
                throw new SQLException("User Name Already Exists");
            }

        }
    }



    public static void register(User user) throws SQLException {
        validateCredentials(user);
        userRepository.save(user);
    }

    public static boolean login(String email, String password) throws SQLException {
        if (!userRepository.existsByPasswordAndEmail(password, email)) {
            throw new SQLException("One of two details provided are not correct ," +
                    "please try again");
        }
        return true;
    }
}
