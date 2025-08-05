package com.example.BlindBox.controller;


import com.example.BlindBox.po.Account;
import com.example.BlindBox.repository.AccountRepository;
import com.example.BlindBox.service.AccountService;
import com.example.BlindBox.util.TokenUtil;
import com.example.BlindBox.vo.AccountVO;
import com.example.BlindBox.vo.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Resource
    private AccountService accountService;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    AccountRepository accountRepository;

    /**
     * 用户注册
     */
    @PostMapping()
    public Response createAccount(@RequestBody AccountVO accountVO) {
        String res=accountService.register(accountVO);
        if(res=="注册成功"){
            return Response.buildSuccess(res);
        }else{
            return Response.buildFailure("400",res);
        }
    }
}
