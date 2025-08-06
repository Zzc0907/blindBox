package com.example.BlindBox.controller;

import com.example.BlindBox.po.Account;
import com.example.BlindBox.po.BlindBox;
import com.example.BlindBox.repository.AccountRepository;
import com.example.BlindBox.repository.BlindBoxRepository;
import com.example.BlindBox.service.BlindBoxService;
import com.example.BlindBox.util.TokenUtil;
import com.example.BlindBox.vo.BlindBoxVO;
import com.example.BlindBox.vo.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blindBox")
public class BlindBoxController {
    @Resource
    private BlindBoxService blindBoxService;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    BlindBoxRepository blindBoxRepository;

    @Autowired
    AccountRepository accountRepository;

    /**
     * 创建盲盒
     */
    @PostMapping()
    public Response createBlindBox(@RequestParam Integer userId, @RequestBody BlindBoxVO blindBoxVO){
        String res=blindBoxService.createBlindBox(userId,blindBoxVO);
        if(res=="创建成功"){
            return Response.buildSuccess(res);
        }else{
            return Response.buildFailure("400",res);
        }
    }

    /**
     * 抽取盲盒
     */
    @PostMapping("/{blindBoxId}")
    public Response getBlindBox(@PathVariable Integer blindBoxId,@RequestParam Integer userId){
        String res=blindBoxService.getBlindBox(blindBoxId,userId);
        if(res=="恭喜你，抽到了！"||res=="运气不佳哦,没有抽中~"||res=="该盲盒已经被抽完了"){
            return Response.buildSuccess(res);
        }else{
            return Response.buildFailure("400",res);
        }
    }

    /**
     * 查看我创建的盲盒
     */
    @GetMapping("/create")
    public Response myBlindBox(@RequestParam Integer userId){
        Optional<Account> thisaccount=accountRepository.findById(userId);
        if(!thisaccount.isPresent()){
            return Response.buildFailure("400","该用户不存在");
        }
        List<Integer> myBlindBoxId=thisaccount.get().getCreatedBlindBoxId();
        if(myBlindBoxId==null){
            return Response.buildFailure("400","您还没有创建盲盒哦~");
        }
        List<BlindBoxVO> myBlindBoxVO=new ArrayList<>();
        for(Integer id:myBlindBoxId){
            myBlindBoxVO.add(blindBoxRepository.findById(id).get().toVO());
        }
        return Response.buildSuccess(myBlindBoxVO);
    }

    /**
     * 查看我抽到的盲盒
     */
    @GetMapping("/had")
    public Response ownBlindBox(@RequestParam Integer userId){
        Optional<Account> thisaccount=accountRepository.findById(userId);
        if(!thisaccount.isPresent()){
            return Response.buildFailure("400","该用户不存在");
        }
        List<Integer> myBlindBoxId=thisaccount.get().getOwnBlindBoxId();
        if(myBlindBoxId==null){
            return Response.buildFailure("400","您还没有盲盒哦~");
        }
        List<BlindBoxVO> myBlindBoxVO=new ArrayList<>();
        for(Integer id:myBlindBoxId){
            myBlindBoxVO.add(blindBoxRepository.findById(id).get().toVO());
        }
        return Response.buildSuccess(myBlindBoxVO);
    }

    /**
     * 查看盲盒详情
     */
    @GetMapping("/detail")
    public Response blindBoxDetail(@RequestParam Integer blindBoxId){
        Optional<BlindBox> thisBlindBox=blindBoxRepository.findById(blindBoxId);
        if(!thisBlindBox.isPresent()){
            return Response.buildFailure("400","该盲盒不存在");
        }
        return Response.buildSuccess(thisBlindBox.get().toVO());
    }

    /**
     * 搜索盲盒
     */
    @GetMapping("/find")
    public Response findBlindBox(@RequestParam String blindBoxName){
        List<BlindBox> allBlindBox=blindBoxRepository.findAll();
        List<BlindBoxVO> thisBlindBox=new ArrayList<>();
        for(BlindBox blindBox:allBlindBox){
            if(blindBox.getBlindBoxName().contains(blindBoxName)){
                thisBlindBox.add(blindBox.toVO());
            }
        }
        return Response.buildSuccess(thisBlindBox);
    }
}
