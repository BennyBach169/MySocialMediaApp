package com.example.MySocialMedia.repositories;

import com.example.MySocialMedia.baens.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByPasswordAndEmail(String password,String email);
    User findByEmail(String email);
    boolean existsByUserName(String username);
    boolean existsByEmail(String email);
}
