package com.example.BlindBox.service;

import com.example.BlindBox.po.Show;
import com.example.BlindBox.vo.ShowVO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public interface ShowService {
    String createShow(ShowVO showVO);

    String makeComment(Integer showId,Integer userId, String comment);

    String deleteShow(Integer showId);

    List<ShowVO> getAllShowVOs();

    List<ShowVO> getUserShow(Integer userId);
}
