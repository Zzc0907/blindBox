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
import java.util.Optional;

@CrossOrigin(origins = "*")
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

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Response login(@RequestBody AccountVO accountVO){
        String token=accountService.login(accountVO);
        if(token=="false"){
            return Response.buildFailure("400","用户名或密码错误");
        }else{
            return Response.buildSuccess(token);
        }
    }

    /**
     * 获取用户信息(通过token)
     */
    @GetMapping
    public Response getUserMessage(@RequestHeader("token") String token){
        String res=accountService.getUserMessage(token);
        if(res=="true"){
            return Response.buildSuccess(tokenUtil.getAccount(token));
        }else{
            return Response.buildFailure("400",res);
        }
    }

    /**
     * 获取用户信息(通过id)
     */
    @GetMapping("/{userId}")
    public Response getUserMessageById(@PathVariable Integer userId){
        Optional<Account> account=accountRepository.findById(userId);
        if(account.isPresent()){
            return Response.buildSuccess(account.get());
        }else{
            return Response.buildFailure("400","该用户不存在");
        }
    }

    /**
     * 更新用户信息
     */
    @PutMapping
    public Response updateUserMessage(@RequestBody AccountVO accountVO){
        String res=accountService.updateUserMessage(accountVO);
        if(res=="更新成功"){
            return Response.buildSuccess(res);
        }else{
            return Response.buildFailure("400",res);
        }
    }
}
