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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Integer> getCreatedBlindBoxId() {
        return createdBlindBoxId;
    }

    public void setCreatedBlindBoxId(List<Integer> createdBlindBoxId) {
        this.createdBlindBoxId = createdBlindBoxId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Integer> getOwnBlindBoxId() {
        return ownBlindBoxId;
    }

    public void setOwnBlindBoxId(List<Integer> ownBlindBoxId) {
        this.ownBlindBoxId = ownBlindBoxId;
    }

    public List<Integer> getParticipateBlindBoxId() {
        return participateBlindBoxId;
    }

    public void setParticipateBlindBoxId(List<Integer> participateBlindBoxId) {
        this.participateBlindBoxId = participateBlindBoxId;
    }

    public List<Integer> getParticipateBlindBoxIdTime() {
        return participateBlindBoxIdTime;
    }

    public void setParticipateBlindBoxIdTime(List<Integer> participateBlindBoxIdTime) {
        this.participateBlindBoxIdTime = participateBlindBoxIdTime;
    }

    public List<Integer> getBlindBoxIdOrder() {
        return blindBoxIdOrder;
    }

    public void setBlindBoxIdOrder(List<Integer> blindBoxIdOrder) {
        this.blindBoxIdOrder = blindBoxIdOrder;
    }

    public List<String> getBlindBoxOrderResult() {
        return blindBoxOrderResult;
    }

    public void setBlindBoxOrderResult(List<String> blindBoxOrderResult) {
        this.blindBoxOrderResult = blindBoxOrderResult;
    }

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
