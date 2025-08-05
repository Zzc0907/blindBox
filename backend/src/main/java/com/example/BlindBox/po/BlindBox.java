package com.example.BlindBox.po;

import com.example.BlindBox.vo.BlindBoxVO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class BlindBox {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Basic
    @Column(name = "createUserId")
    private Integer createUserId;//创建的用户

    @Basic
    @Column(name = "description")
    private String description;//盲盒描述

    @Basic
    @Column(name = "price")
    private String price;//盲盒价格

    @Basic
    @Column(name = "lastQuantity")
    private Integer lastQuantity;//盲盒剩余数量

    @Basic
    @Column(name = "winQuantity")
    private Integer winQuantity;//盲盒中奖的剩余数量

    @Basic
    @Column(name = "maxWinQuantity")
    private Integer maxWinQuantity;//盲盒抽奖的保底数量

    @Basic
    @Column(name = "cover")
    private String cover;//盲盒中奖的图片

    @Basic
    @Column(name = "winnerId")
    private ArrayList<Integer> winnerId;//已经抽中的人的id

    @Basic
    @Column(name = "comments")
    private ArrayList<String> comments;//人们对该盲盒的评论

    public BlindBoxVO toVO(){
        BlindBoxVO blindBoxVO=new BlindBoxVO();
        blindBoxVO.setId(id);
        blindBoxVO.setCreateUserId(createUserId);
        blindBoxVO.setDescription(description);
        blindBoxVO.setPrice(price);
        blindBoxVO.setLastQuantity(lastQuantity);
        blindBoxVO.setWinQuantity(winQuantity);
        blindBoxVO.setMaxWinQuantity(maxWinQuantity);
        blindBoxVO.setCover(cover);
        blindBoxVO.setWinnerId(winnerId);
        blindBoxVO.setComments(comments);
        return blindBoxVO;
    }
}
