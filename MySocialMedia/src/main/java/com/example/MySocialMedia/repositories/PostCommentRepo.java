package com.example.MySocialMedia.repositories;

import com.example.MySocialMedia.baens.PostComment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostCommentRepo extends JpaRepository<PostComment, Long> {
    List<PostComment> findByCommentAuthorId(long authorId);
    @Query(value = "DELETE from post_comments where post_id = ?1",nativeQuery = true)
    @Modifying
    @Transactional
    void deleteCommentsByPostId(long postId);
    List<PostComment> findByPostId(long postId);

    @Query("SELECT pc FROM PostComment pc WHERE pc.post.id = :postId ORDER BY pc.id DESC")
    List<PostComment> findByPostIdOrderByNewest(@Param("postId") long postId);

    @Query(value = "SELECT COUNT(*) FROM post_comments WHERE post_id = ?1;", nativeQuery = true)
    int getCommentCountByPostId(long postId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM post_comments WHERE comment_author_id = ?1", nativeQuery = true)
    void deleteCommentsByAuthorId(long authorId);


}
