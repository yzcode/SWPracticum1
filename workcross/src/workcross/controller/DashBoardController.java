package workcross.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import workcross.model.User;

@Controller
@RequestMapping(value = "/dashboard")
public class DashBoardController {

	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView Login(HttpSession httpSession) {
		if (httpSession.getAttribute("user") == null)
			return new ModelAndView("redirect:/");
		else
			return new ModelAndView("MainFrm");
	}
}
