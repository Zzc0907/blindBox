package com.example.BlindBox.serviceImpl;

import com.example.BlindBox.po.Account;
import com.example.BlindBox.po.BlindBox;
import com.example.BlindBox.repository.AccountRepository;
import com.example.BlindBox.repository.BlindBoxRepository;
import com.example.BlindBox.service.AccountService;
import com.example.BlindBox.service.BlindBoxService;
import com.example.BlindBox.util.TokenUtil;
import com.example.BlindBox.vo.BlindBoxVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Random;
import java.util.Optional;

@Service
public class BlindBoxServiceImpl implements BlindBoxService {
    private static final Random random = new Random();

    @Autowired
    private BlindBoxRepository blindBoxRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public String createBlindBox(Integer userId, BlindBoxVO blindBoxVO){
        Optional<BlindBox> thisBlindBox=blindBoxRepository.findByCreateUserIdAndBlindBoxName(userId,blindBoxVO.getBlindBoxName());
        if(thisBlindBox.isPresent()){
            return "该盲盒已存在";
        }
        BlindBox newBlindBox=blindBoxVO.toPO();
        newBlindBox.setCreateUserId(userId);
        blindBoxRepository.save(newBlindBox);
        Optional<BlindBox> blindBox=blindBoxRepository.findByCreateUserIdAndBlindBoxName(userId,blindBoxVO.getBlindBoxName());
        Optional<Account> account=accountRepository.findById(userId);
        Account account1=account.get();
        BlindBox blindBox1=blindBox.get();
        account1.getCreatedBlindBoxId().add(blindBox1.getId());
        accountRepository.save(account1);
        return "创建成功";
    }

    @Override
    public String getBlindBox(Integer blindBoxId, Integer userId){
        Optional<Account> thisAccount=accountRepository.findById(userId);
        if(thisAccount.isPresent()){
            Optional<BlindBox> thisBlindBox=blindBoxRepository.findById(blindBoxId);
            if(thisBlindBox.isPresent()){
                Account account=thisAccount.get();
                BlindBox blindBox=thisBlindBox.get();
                if(blindBox.getLastQuantity()<=0){
                    return "该盲盒已经被抽完了";
                }
                if(blindBox.getWinQuantity()<=0){
                    blindBox.setLastQuantity(blindBox.getLastQuantity()-1);
                    blindBoxRepository.save(blindBox);
                    return "运气不佳哦,没有抽中~";
                }
                int r=random.nextInt(blindBox.getLastQuantity());
                int temp=account.getParticipateBlindBoxId().indexOf(blindBoxId);
                int b;
                if(temp!=-1){
                    b=account.getParticipateBlindBoxTime().get(temp);
                }else{
                    account.getParticipateBlindBoxId().add(blindBoxId);
                    account.getParticipateBlindBoxTime().add(0);
                    b=0;
                }
                int r1=random.nextInt(blindBox.getWinQuantity()-b);
                System.out.println(r);
                System.out.println(r1);
                if(r<blindBox.getWinQuantity()||r1<1){
                    account.getOwnBlindBoxId().add(blindBoxId);
                    account.getParticipateBlindBoxTime().set(account.getParticipateBlindBoxId().indexOf(blindBoxId),0);
                    blindBox.getWinnerId().add(userId);
                    blindBox.setLastQuantity(blindBox.getLastQuantity()-1);
                    blindBox.setWinQuantity(blindBox.getWinQuantity()-1);
                    accountRepository.save(account);
                    blindBoxRepository.save(blindBox);
                    return "恭喜你，抽到了！";
                }else{
                    account.getParticipateBlindBoxTime().set(account.getParticipateBlindBoxId().indexOf(blindBoxId),b+1);
                    blindBox.setLastQuantity(blindBox.getLastQuantity()-1);
                    accountRepository.save(account);
                    blindBoxRepository.save(blindBox);
                    return "运气不佳哦,没有抽中~";
                }
            }else{
                return "该盲盒不存在";
            }
        }else{
            return "该用户不存在";
        }
    }

    @Override
    public String makeComment(Integer userId,Integer blindBoxId,String comment){
        Optional<Account> thisAccount=accountRepository.findById(userId);
        if(thisAccount.isPresent()){
            Account account=thisAccount.get();
            Optional<BlindBox> thisBlindBox=blindBoxRepository.findById(blindBoxId);
            if (thisBlindBox.isPresent()) {
                BlindBox blindBox=thisBlindBox.get();
                blindBox.getCommentUserName().add(account.getUsername());
                blindBox.getComments().add(comment);
                blindBoxRepository.save(blindBox);
                return "评论成功";
            }else{
                return "该盲盒不存在";
            }
        }else{
            return "该用户不存在";
        }
    }
}
