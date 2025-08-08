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
    private List<String> commentUserName;
    private List<String> comment;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public List<String> getCommentUserName() {
        return commentUserName;
    }

    public void setCommentUserName(List<String> commentUserName) {
        this.commentUserName = commentUserName;
    }

    public List<String> getComment() {
        return comment;
    }

    public void setComment(List<String> comment) {
        this.comment = comment;
    }

    public Show toPO(){
        Show show =new Show();
        show.setId(id);
        show.setUserId(userId);
        show.setDetail(detail);
        show.setCommentUserName(commentUserName);
        show.setComment(comment);
        return show;
    }
}
