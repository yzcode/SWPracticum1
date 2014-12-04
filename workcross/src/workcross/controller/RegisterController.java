package workcross.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import workcross.model.*;
import workcross.service.UserService;

import javax.annotation.Resource;

@RequestMapping("/Register")
@Controller
public class RegisterController {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	public String ShowRegisterForm() {
		return "register";
	}

	@RequestMapping(method = RequestMethod.POST)
	public ModelAndView RegisterForm(String username, String email,
			String nickname, String password, String password_rep) {
		userService.addUser(username, password, email, nickname);
		ModelAndView mv = new ModelAndView();
		return mv;

	}
}
