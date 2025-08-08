package com.example.BlindBox.vo;

import com.example.BlindBox.po.Account;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.JoinColumn;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AccountVO {
    private Integer id;
    private String username;
    private String password;
    private List<Integer> createdBlindBoxId ;
    private List<Integer> ownBlindBoxId;
    private List<Integer> participateBlindBoxId;
    private List<Integer> participateBlindBoxIdTime;
    private List<Integer> blindBoxIdOrder;
    private List<String> blindBoxOrderResult;

    public Account toPO(){
        Account account = new Account();
        account.setId(id);
        account.setUsername(username);
        account.setPassword(password);
        account.setCreatedBlindBoxId(createdBlindBoxId);
        account.setOwnBlindBoxId(ownBlindBoxId);
        account.setParticipateBlindBoxId(participateBlindBoxId);
        account.setParticipateBlindBoxTime(participateBlindBoxIdTime);
        account.setBlindBoxIdOrder(blindBoxIdOrder);
        account.setBlindBoxOrderResult(blindBoxOrderResult);
        return account;
    }
}
