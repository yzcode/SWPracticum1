package workcross.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import workcross.model.*;
import workcross.service.TeamService;
import workcross.service.UserService;

@Controller
public class TeamController {

	@Autowired
	private TeamService teamService;
	
	
	@RequestMapping(value = "/api/team/", method = RequestMethod.POST)
	public @ResponseBody
	Team createTeam(HttpSession httpSession, String teamName, String description) {
		User user = (User)httpSession.getAttribute("user");
		Team team= teamService.addTeam(teamName, description);
		teamService.addUserToTeam(user, team);
		return team;
	}

	@RequestMapping(value = "/api/teams/", method = RequestMethod.GET)
	public @ResponseBody
	List<Team> getCurrentTeam(HttpSession httpSession) {
		return teamService.getUserTeams((User)httpSession.getAttribute("user"));
	}
	
	@RequestMapping(value = "/api/teams/{teamId}", method = RequestMethod.GET)
	public @ResponseBody
	List<Team> getTeamInfo(HttpSession httpSession) {
		return teamService.getUserTeams((User)httpSession.getAttribute("user"));
	}
}
