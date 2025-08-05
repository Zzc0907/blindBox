package com.example.BlindBox.vo;

import com.example.BlindBox.po.Account;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
public class AccountVO {
    private Integer id;
    private String username;
    private String password;
    private ArrayList<Integer> createdBlindBoxId ;
    private ArrayList<Integer> ownBlindBoxId;
    private ArrayList<Integer> participateBlindBoxId;
    private ArrayList<Integer> participateBlindBoxIdTime;

    public Account toPO(){
        Account account = new Account();
        account.setId(id);
        account.setUsername(username);
        account.setPassword(password);
        account.setCreatedBlindBoxId(createdBlindBoxId);
        account.setOwnBlindBoxId(ownBlindBoxId);
        account.setParticipateBlindBoxId(participateBlindBoxId);
        account.setParticipateBlindBoxTime(participateBlindBoxIdTime);
        return account;
    }
}
