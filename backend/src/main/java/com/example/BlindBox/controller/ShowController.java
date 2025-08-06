package com.example.BlindBox.controller;

import com.example.BlindBox.po.Show;
import com.example.BlindBox.repository.ShowRepository;
import com.example.BlindBox.service.ShowService;
import com.example.BlindBox.util.TokenUtil;
import com.example.BlindBox.vo.Response;
import com.example.BlindBox.vo.ShowVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/show")
public class ShowController {
    @Resource
    private ShowService showService;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    ShowRepository showRepository;

    /**
     * 创建买家秀
     */
    @PostMapping
    public Response createShow(@RequestBody ShowVO showVO) {
        String res=showService.createShow(showVO);
        if(res=="创建成功"){
            return Response.buildSuccess(res);
        }else{
            return Response.buildFailure("400",res);
        }
    }

    /**
     * 获取所有买家秀
     */
    @GetMapping
    public Response getAllShows(){
        return Response.buildSuccess(showService.getAllShowVOs());
    }

    /**
     * 获取单一客户的买家秀
     */
    @GetMapping("/{userId}")
    public Response getUserShow(@PathVariable Integer userId){
        return Response.buildSuccess(showService.getUserShow(userId));
    }

    /**
     * 评论买家秀（增加commentUserId和commentContents）
     */
    @PostMapping("/comment")
    public Response makeComment(@RequestParam Integer showId,@RequestParam Integer userId,@RequestParam String comment){
        String res=showService.makeComment(showId,userId,comment);
        if(res=="评论成功"){
            return Response.buildSuccess(res);
        }else{
            return Response.buildFailure("400",res);
        }
    }

    /**
     * 删除买家秀
     */
    @DeleteMapping
    public Response deleteShow(@RequestParam Integer showId){
        String res=showService.deleteShow(showId);
        if(res=="删除成功"){
            return Response.buildSuccess(res);
        }else{
            return Response.buildFailure("400",res);
        }
    }
}
