package com.example.BlindBox.repository;

import com.example.BlindBox.po.BlindBox;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface BlindBoxRepository extends JpaRepository<BlindBox, Integer> {
    Optional<BlindBox> findByCreateUserIdAndBlindBoxName(Integer userId, String blindBoxName);
}
