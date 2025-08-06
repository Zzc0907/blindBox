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

    @Override
    public String login(AccountVO accountVO){
        Account account=accountRepository.findByUsernameAndPassword(accountVO.getUsername(),accountVO.getPassword());
        if(account!=null){
            return tokenUtil.getToken(account);
        }else{
            return "false";
        }
    }

    @Override
    public String getUserMessage(String token){
        Account account=tokenUtil.getAccount(token);
        if(account!=null){
            return "true";
        }else{
            return "未登录";
        }
    }

    @Override
    public String updateUserMessage(AccountVO accountVO){
        Account account=accountRepository.findByUsername(accountVO.getUsername());
        if(account!=null){
            if(accountVO.getPassword()!=null){
                account.setPassword(accountVO.getPassword());
            }
            if(accountVO.getCreatedBlindBoxId()!=null){
                account.setCreatedBlindBoxId(accountVO.getCreatedBlindBoxId());
            }
            if(accountVO.getOwnBlindBoxId()!=null){
                account.setOwnBlindBoxId(accountVO.getOwnBlindBoxId());
            }
            if(accountVO.getParticipateBlindBoxId()!=null){
                account.setParticipateBlindBoxId(accountVO.getParticipateBlindBoxId());
            }
            if(accountVO.getParticipateBlindBoxIdTime()!=null){
                account.setParticipateBlindBoxTime(accountVO.getParticipateBlindBoxIdTime());
            }
            accountRepository.save(account);
            return "更新成功";
        }else{
            return "未找到该用户";
        }
    }
}
