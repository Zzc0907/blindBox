package com.example.BlindBox.vo;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
public class Response<T> implements Serializable {

    private String code;

    private String msg;

    private T data;

    public Response(String code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public Response() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static <T> Response<T> buildSuccess(T data) {
        return new Response<T>("200", null, data);
    }

    public static <T> Response<T> buildFailure(String code, String msg) {
        return new Response<T>(code, msg, null);
    }
}
