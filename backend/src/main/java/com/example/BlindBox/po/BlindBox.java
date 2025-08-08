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
    @CollectionTable(name = "blindCommentUserName", joinColumns = @JoinColumn(name = "blindBoxId"))
    @Column(name = "commentsUserName")
    private List<String> commentUserName = new ArrayList<>();//对该盲盒进行评论过的人

    @ElementCollection
    @CollectionTable(name = "blindComments", joinColumns = @JoinColumn(name = "blindBoxId"))
    @Column(name = "comments")
    private List<String> comments = new ArrayList<>();//人们对该盲盒的评论

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    public String getBlindBoxName() {
        return blindBoxName;
    }

    public void setBlindBoxName(String blindBoxName) {
        this.blindBoxName = blindBoxName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getLastQuantity() {
        return lastQuantity;
    }

    public void setLastQuantity(Integer lastQuantity) {
        this.lastQuantity = lastQuantity;
    }

    public Integer getWinQuantity() {
        return winQuantity;
    }

    public void setWinQuantity(Integer winQuantity) {
        this.winQuantity = winQuantity;
    }

    public Integer getMaxWinQuantity() {
        return maxWinQuantity;
    }

    public void setMaxWinQuantity(Integer maxWinQuantity) {
        this.maxWinQuantity = maxWinQuantity;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public List<Integer> getWinnerId() {
        return winnerId;
    }

    public void setWinnerId(List<Integer> winnerId) {
        this.winnerId = winnerId;
    }

    public List<String> getCommentUserName() {
        return commentUserName;
    }

    public void setCommentUserName(List<String> commentUserName) {
        this.commentUserName = commentUserName;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

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
        blindBoxVO.setCommentUserName(commentUserName);
        blindBoxVO.setComments(comments);
        return blindBoxVO;
    }
}
