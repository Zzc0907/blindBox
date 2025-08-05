package com.example.BlindBox.serviceImpl;

import com.example.BlindBox.po.Account;
import com.example.BlindBox.repository.AccountRepository;
import com.example.BlindBox.service.AccountService;
import com.example.BlindBox.util.TokenUtil;
import com.example.BlindBox.vo.AccountVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.token.TokenService;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    TokenUtil tokenUtil;

    @Override
    public String register(AccountVO accountVO){
        Account account=accountRepository.findByUsername(accountVO.getUsername());
        if(account!=null){
            return "用户已存在";
        }
        Account newAccount=accountVO.toPO();
        accountRepository.save(newAccount);
        return "注册成功";
    }
}
