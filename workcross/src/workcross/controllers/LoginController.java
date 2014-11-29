package workcross.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import workcross.model.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

	@Resource(name = "userManager")
	private UserManager userManager;
	
	@RequestMapping(value="/Login",method = RequestMethod.POST)
	public String Login(String username, String password,HttpSession httpSession) {
		//if (username == null || password == null)
			
		User user =  userManager.getUserByUsername(username);
		if (user != null)
		{
			if(user.matchPassword(password))
				httpSession.setAttribute("user", user);
		}
		return "index";
	}
}
