package com.example.BlindBox.po;

import com.example.BlindBox.vo.BlindBoxVO;
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
@Table(name = "blind_box")
public class BlindBox {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Basic
    @Column(name = "createUserId")
    private Integer createUserId;//创建的用户

    @Basic
    @Column(name = "blindBoxName")
    private String blindBoxName;//盲盒名称

    @Basic
    @Column(name = "description")
    private String description;//盲盒描述

    @Basic
    @Column(name = "price")
    private Integer price;//盲盒价格

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

    @ElementCollection
    @CollectionTable(name = "blindBoxWinnerId", joinColumns = @JoinColumn(name = "blindBoxId"))
    @Column(name = "winnerId")
    private List<Integer> winnerId = new ArrayList<>();//已经抽中的人的id

    @ElementCollection
    @CollectionTable(name = "blindComments", joinColumns = @JoinColumn(name = "blindBoxId"))
    @Column(name = "comments")
    private List<String> comments = new ArrayList<>();//人们对该盲盒的评论

    public BlindBoxVO toVO(){
        BlindBoxVO blindBoxVO=new BlindBoxVO();
        blindBoxVO.setId(id);
        blindBoxVO.setCreateUserId(createUserId);
        blindBoxVO.setBlindBoxName(blindBoxName);
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
