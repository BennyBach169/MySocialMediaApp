package com.example.MySocialMedia.repositories;

import com.example.MySocialMedia.baens.PostLike;
import com.example.MySocialMedia.baens.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostLikeRepo extends JpaRepository<PostLike,Long> {
    PostLike findByPostIdAndLikerId(long postId,long likerId);
    boolean existsByPostIdAndLikerId(long postId,long likerId);
    @Transactional
    @Modifying
    void deleteByPostId(long postId);
    @Query("SELECT pl.liker FROM PostLike pl WHERE pl.post.id = :postId")
    List<User> findUsersByPostId(@Param("postId") long postId);

    @Modifying
    @Transactional
    @Query("DELETE FROM PostLike pl WHERE pl.liker.id = :userId")
    void deleteAllLikesByUser(@Param("userId") long userId);

}
