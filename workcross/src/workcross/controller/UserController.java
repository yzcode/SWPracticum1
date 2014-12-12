package workcross.controller;

import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import workcross.model.*;
import workcross.service.ProjectService;
import workcross.service.UserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	ProjectService projectService;

	@Autowired
	ObjectMapper objectMapper;

	@RequestMapping(value = "/api/user/currentuser", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> currentuser(HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		Map<String, Object> result = objectMapper.convertValue(user, Map.class);
		List<Team> manageTeams = userService.getUserTeamsByRole(user, "manager");
		result.put("managed_teams", manageTeams);
		return result;
	}
}
