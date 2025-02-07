package com.example.MySocialMedia.repositories;

import com.example.MySocialMedia.baens.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllByOrderByIdDesc();
    List<Post> findByAuthor_Id(Long authorId);
    @Query("SELECT p FROM Post p WHERE p.author.id = :authorId ORDER BY p.id DESC")
    List<Post> findByAuthorIdOrdered(Long authorId);

    @Query("SELECT p FROM Post p WHERE p.author.id IN " +
            "(SELECT f.followed.id FROM Following f WHERE f.follower.id = :followerId) " +
            "ORDER BY p.datePosted DESC")
    List<Post> findPostsByFollowerId(@Param("followerId") Long followerId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Post p WHERE p.author.id = :userId")
    void deleteAllPostsByUser(@Param("userId") long userId);


}
