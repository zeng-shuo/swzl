package com.ctgu.swzl.config;

import com.ctgu.swzl.domain.User;
import com.ctgu.swzl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class AdminInterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String username = (String) request.getSession().getAttribute("loginUser");
        String isAdmin = (String) request.getSession().getAttribute("isAdmin");
        if (username==null||"false".equals(isAdmin)){
            response.sendRedirect(request.getContextPath()+"/login");
            return false;
        }
        return true;
    }
}
