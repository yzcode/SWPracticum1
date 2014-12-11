package workcross.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import workcross.model.*;
import workcross.service.ProjectService;
import workcross.service.TeamService;
import workcross.service.UserService;

@Controller
public class TeamController {

	@Autowired
	private TeamService teamService;
	
	@Autowired
	private ProjectService projectService;

	@RequestMapping(value = "/api/teams/", method = RequestMethod.POST)
	public @ResponseBody
	Team createTeam(HttpSession httpSession,
			@RequestParam("name") String teamName,
			@RequestParam("desc") String description) throws Exception {
		User user = (User) httpSession.getAttribute("user");
		Team team = teamService.addTeam(teamName, description);
		teamService.addUserToTeam(user, team);
		return team;
	}

	@RequestMapping(value = "/api/teams/", method = RequestMethod.GET)
	public @ResponseBody
	List<Team> getCurrentTeam(HttpSession httpSession) {
		return teamService
				.getUserTeams((User) httpSession.getAttribute("user"));
	}

	@RequestMapping(value = "/api/teams/{teamId}", method = RequestMethod.GET)
	public @ResponseBody
	Map<String,Object> getTeamInfo(HttpSession httpSession,
			@PathVariable(value = "teamId") long teamId) {
		Map<String,Object> data = new HashMap<String, Object>();
		Team team = teamService.getTeamById(teamId);
		data.put("team", team);
		data.put("users",teamService.getTeamUsers(team));
		data.put("projects", projectService.getTeamProjects(team));
		return data;
	}
}
