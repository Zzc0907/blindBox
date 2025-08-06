package com.example.BlindBox.po;

import com.example.BlindBox.vo.AccountVO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "account")
public class Account {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;//用户id

    @Basic
    @Column(name = "username")
    private String username;//用户名

    @Basic
    @Column(name = "password")
    private String password;//用户密码

    @ElementCollection
    @CollectionTable(name = "accountCreatedBlindboxIds", joinColumns = @JoinColumn(name = "accountId"))
    @Column(name = "createdBlindBoxId")
    private List<Integer> createdBlindBoxId = new ArrayList<>();//用户创建的盲盒

    @ElementCollection
    @CollectionTable(name = "accountOwnBlindboxIds", joinColumns = @JoinColumn(name = "accountId"))
    @Column(name = "ownBlindBoxId")
    private List<Integer> ownBlindBoxId = new ArrayList<>();//用户抽取到的盲盒

    @ElementCollection
    @CollectionTable(name = "accountParticipateBlindBoxId", joinColumns = @JoinColumn(name = "accountId"))
    @Column(name = "participateBlindBoxId")
    private List<Integer> participateBlindBoxId = new ArrayList<>();//用户参与过的盲盒

    @ElementCollection
    @CollectionTable(name = "accountParticipateBlindBoxTime", joinColumns = @JoinColumn(name = "accountId"))
    @Column(name = "participateBlindBoxTime")
    private List<Integer> participateBlindBoxTime = new ArrayList<>();//用户参与过的盲盒中抽了但未中的次数

    public AccountVO toVO(){
        AccountVO accountVO = new AccountVO();
        accountVO.setId(this.id);
        accountVO.setUsername(this.username);
        accountVO.setPassword(this.password);
        accountVO.setCreatedBlindBoxId(this.createdBlindBoxId);
        accountVO.setOwnBlindBoxId(this.ownBlindBoxId);
        accountVO.setParticipateBlindBoxId(this.participateBlindBoxId);
        accountVO.setParticipateBlindBoxIdTime(this.participateBlindBoxTime);
        return accountVO;
    }
}
