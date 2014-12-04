package workcross.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import workcross.model.*;
import workcross.service.UserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/Login",method = RequestMethod.POST)
	public String Login(String username, String password,HttpSession httpSession) {
		//if (username == null || password == null)
			
		User user =  userService.getUserByUsername(username);
		if (user != null)
		{
			if(user.matchPassword(password))
				httpSession.setAttribute("user", user);
		}
		return "index";
	}
}
