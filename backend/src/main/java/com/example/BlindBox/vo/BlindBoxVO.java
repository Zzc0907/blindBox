package com.example.BlindBox.vo;

import com.example.BlindBox.po.BlindBox;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BlindBoxVO {
    private Integer id;
    private Integer createUserId;
    private String blindBoxName;
    private String description;
    private Integer price;
    private Integer lastQuantity;
    private Integer winQuantity;
    private Integer maxWinQuantity;
    private String cover;
    private List<Integer> winnerId;
    private List<String> commentUserName;
    private List<String> comments;

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

    public BlindBox toPO(){
        BlindBox blindBox=new BlindBox();
        blindBox.setId(id);
        blindBox.setCreateUserId(createUserId);
        blindBox.setBlindBoxName(blindBoxName);
        blindBox.setDescription(description);
        blindBox.setPrice(price);
        blindBox.setLastQuantity(lastQuantity);
        blindBox.setWinQuantity(winQuantity);
        blindBox.setMaxWinQuantity(maxWinQuantity);
        blindBox.setCover(cover);
        blindBox.setWinnerId(winnerId);
        blindBox.setCommentUserName(commentUserName);
        blindBox.setComments(comments);
        return blindBox;
    }
}
