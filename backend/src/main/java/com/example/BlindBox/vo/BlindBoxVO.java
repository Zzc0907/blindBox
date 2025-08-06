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
    private List<String> comments;

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
        blindBox.setComments(comments);
        return blindBox;
    }
}
