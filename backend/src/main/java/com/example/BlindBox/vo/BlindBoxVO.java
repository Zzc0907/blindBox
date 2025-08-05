package com.example.BlindBox.vo;

import com.example.BlindBox.po.BlindBox;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
public class BlindBoxVO {
    private Integer id;
    private Integer createUserId;
    private String description;
    private String price;
    private Integer lastQuantity;
    private Integer winQuantity;
    private Integer maxWinQuantity;
    private String cover;
    private ArrayList<Integer> winnerId;
    private ArrayList<String> comments;

    public BlindBox toPO(){
        BlindBox blindBox=new BlindBox();
        blindBox.setId(id);
        blindBox.setCreateUserId(createUserId);
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
