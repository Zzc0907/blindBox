package com.example.BlindBox.repository;

import com.example.BlindBox.po.Account;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByUsername(String username);

}
