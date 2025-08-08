package com.example.BlindBox.service;

import com.example.BlindBox.vo.BlindBoxVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public interface BlindBoxService {
    String createBlindBox(Integer userId, BlindBoxVO blindBoxVO);

    String getBlindBox(Integer blindBoxId, Integer userId);

    String makeComment(Integer userId,Integer blindBoxId,String comment);
}
