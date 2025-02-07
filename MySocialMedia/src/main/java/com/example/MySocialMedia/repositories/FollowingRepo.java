package com.example.MySocialMedia.repositories;

import com.example.MySocialMedia.baens.Following;
import com.example.MySocialMedia.baens.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowingRepo extends JpaRepository<Following,Long> {

        List<Following> findByFollower_Id(long followerId);
        boolean existsByFollowerIdAndFollowedId(long followerId , long followedId);
        @Query(value = "SELECT u.* FROM followings f JOIN users u ON u.id = f.follower_id WHERE f.followed_id = ?1", nativeQuery = true)
        List<User>getAllFollowers(long followedId);

        @Query(value = "SELECT u.* FROM followings f JOIN users u ON u.id = f.followed_id WHERE f.follower_id = ?1", nativeQuery = true)
        List<User>getAllFollowings(long followerId);

        List<Following>findByFollowedId(long followedId);
        Following findByFollowerIdAndFollowedId(long followerId , long followedId);

        @Modifying
        @Transactional
        @Query(value = "DELETE FROM followings WHERE follower_id = :userId OR followed_id = :userId", nativeQuery = true)
        void deleteUserFollowingHistory(@Param("userId") long userId);


}
