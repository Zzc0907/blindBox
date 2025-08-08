package com.example.BlindBox.po;

import com.example.BlindBox.vo.ShowVO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_show")
public class Show {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;//买家秀id

    @Basic
    @Column(name = "userId")
    private Integer userId;//买家秀所属用户id

    @Basic
    @Column(name = "detail")
    private String detail;//买家秀的具体内容

    @ElementCollection
    @CollectionTable(name = "showCommentUserName", joinColumns = @JoinColumn(name = "showId"))
    @Column(name = "commentUserName")
    private List<String> commentUserName = new ArrayList<>();//评论用户的用户名

    @ElementCollection
    @CollectionTable(name = "showComment", joinColumns = @JoinColumn(name = "showId"))
    @Column(name = "comment")
    private List<String> comment = new ArrayList<>();//评论用户的内容

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

    public ShowVO toVO(){
        ShowVO showVO = new ShowVO();
        showVO.setId(id);
        showVO.setUserId(userId);
        showVO.setDetail(detail);
        showVO.setCommentUserName(commentUserName);
        showVO.setComment(comment);
        return showVO;
    }
}
