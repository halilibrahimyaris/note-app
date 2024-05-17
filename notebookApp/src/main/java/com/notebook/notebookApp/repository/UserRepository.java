package com.notebook.notebookApp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.notebook.notebookApp.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Transactional
    Optional<User> findByEmail(String email);

}
