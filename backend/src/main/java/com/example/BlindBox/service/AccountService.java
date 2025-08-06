package com.example.BlindBox.service;

import com.example.BlindBox.vo.AccountVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public interface AccountService {
    String register(AccountVO accountVO);
    String login(AccountVO accountVO);
    String getUserMessage(String token);
    String updateUserMessage(AccountVO accountVO);
}
