package com.example.BlindBox.util;

import com.example.BlindBox.po.Account;
import com.example.BlindBox.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class SecurityUtil {

    @Autowired
    HttpServletRequest httpServletRequest;
    public Account getCurrentAccount() {
        return (Account) httpServletRequest.getSession().getAttribute("account");
    }
}
