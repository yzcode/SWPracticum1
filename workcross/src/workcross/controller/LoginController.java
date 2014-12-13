package workcross.controller;

import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import workcross.model.*;
import workcross.service.UserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
//@RestController
public class LoginController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/Login", method = RequestMethod.POST)
	public ModelAndView login(String username, String password,
			HttpSession httpSession) {
		// if (username == null || password == null)

		User user = userService.getUserByUsername(username);
		if (user != null) {
			if (user.matchPassword(password))
			{
				httpSession.setAttribute("user", user);
				return new ModelAndView("redirect:/dashboard");
			}
		}
		return new ModelAndView("redirect:/");
	}

	@RequestMapping(value = "/Logout", method = RequestMethod.GET)
	public ModelAndView login(HttpSession httpSession) {

		httpSession.removeAttribute("user");
		return new ModelAndView("redirect:/");
	}

	
	
}
