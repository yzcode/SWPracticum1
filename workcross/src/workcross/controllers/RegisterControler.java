package workcross.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import workcross.model.*;
import javax.annotation.Resource;

@RequestMapping("/Register")
@Controller
public class RegisterControler {

	@Resource(name = "userManager")
	private UserManager userManager;

	@RequestMapping(method = RequestMethod.GET)
	public String ShowRegisterForm() {
		return "register";
	}

	@RequestMapping(method = RequestMethod.POST)
	public ModelAndView RegisterForm(String username, String email,
			String nickname, String password, String password_rep) {
		userManager.addUser(username, password, email, nickname);
		ModelAndView mv = new ModelAndView();
		return mv;

	}
}
