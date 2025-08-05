package com.example.BlindBox.vo;

import com.example.BlindBox.po.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentVO {
    private Integer id;
    private Integer blindBoxId;
    private Integer userId;
    private Boolean judge;
    private String content;

    public Comment toPO(){
        Comment comment=new Comment();
        comment.setId(id);
        comment.setBlindBoxId(blindBoxId);
        comment.setUserId(userId);
        comment.setJudge(judge);
        comment.setContent(content);
        return comment;
    }
}
