package com.hostelbazaar.repository;

import com.hostelbazaar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByHostel(String hostel);
    List<User> findByHostelAndRoom(String hostel, String room);
}