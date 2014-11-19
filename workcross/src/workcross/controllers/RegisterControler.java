package workcross.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/Register")
@Controller
public class RegisterControler {

	@RequestMapping(method = RequestMethod.GET)
	public String ShowRegisterForm() {
		return "register";
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ModelAndView  RegisterForm(String username,String email,String nickname,String password,String password_rep)
	{
		System.out.println("Register password" + password);
		ModelAndView mv = new ModelAndView();
		return mv;
		
	}
}
