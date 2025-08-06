package com.example.BlindBox.vo;

import com.example.BlindBox.po.Show;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ShowVO {
    private Integer id;
    private Integer userId;
    private String detail;
    private List<Integer> commentUserId;
    private List<String> comment;

    public Show toPO(){
        Show show =new Show();
        show.setId(id);
        show.setUserId(userId);
        show.setDetail(detail);
        show.setCommentUserId(commentUserId);
        show.setComment(comment);
        return show;
    }
}
