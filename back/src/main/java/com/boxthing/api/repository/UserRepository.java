package com.boxthing.api.repository;

import com.boxthing.api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByEmail(String email);
}
