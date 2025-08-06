package com.example.BlindBox.serviceImpl;

import com.example.BlindBox.po.Show;
import com.example.BlindBox.repository.ShowRepository;
import com.example.BlindBox.service.ShowService;
import com.example.BlindBox.vo.ShowVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShowServiceImpl implements ShowService {
    @Autowired
    private ShowRepository showRepository;

    @Override
    public String createShow(ShowVO showVO){
        Show show=showVO.toPO();
        showRepository.save(show);
        return "创建成功";
    }

    @Override
    public List<ShowVO> getAllShowVOs(){
        List<ShowVO> showVOs=new ArrayList<>();
        List<Show> allShows=showRepository.findAll();
        for(Show show:allShows){
            showVOs.add(show.toVO());
        }
        return showVOs;
    }

    @Override
    public List<ShowVO> getUserShow(Integer userId){
        List<ShowVO> showVOs=new ArrayList<>();
        List<Show> allShows=showRepository.findAll();
        for(Show show:allShows){
            if(show.getUserId()==userId){
                showVOs.add(show.toVO());
            }
        }
        return showVOs;
    }

    @Override
    public String makeComment(Integer showId,Integer userId, String comment){
        Optional<Show> show=showRepository.findById(showId);
        if(show.isPresent()){
            Show thisShow=show.get();
            thisShow.getCommentUserId().add(userId);
            thisShow.getComment().add(comment);
            showRepository.save(thisShow);
            return "评论成功";
        }else{
            return "该买家秀不存在";
        }
    }

    @Override
    public String deleteShow(Integer showId){
        showRepository.deleteById(showId);
        return "删除成功";
    }
}
