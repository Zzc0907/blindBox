package com.example.BlindBox.po;

import com.example.BlindBox.vo.CommentVO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Comment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;//评论id

    @Basic
    @Column(name = "blindBoxId")
    private Integer blindBoxId;//评论所属盲盒id

    @Basic
    @Column(name = "userId")
    private Integer userId;//评论所属用户id

    @Basic
    @Column(name = "judge")
    private Boolean judge;//用户的判断，给出赞或差（true/false）

    @Basic
    @Column(name = "content")
    private String content;//用户评论内容

    public CommentVO toVO(){
        CommentVO commentVO = new CommentVO();
        commentVO.setId(id);
        commentVO.setBlindBoxId(blindBoxId);
        commentVO.setUserId(userId);
        commentVO.setJudge(judge);
        commentVO.setContent(content);
        return commentVO;
    }
}
