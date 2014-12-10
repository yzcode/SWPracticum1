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
import workcross.repository.ProjectRepository;
import workcross.service.ProjectService;
import workcross.service.TaskService;
import workcross.service.TeamService;
import workcross.service.UserService;

@Controller
public class ProjectController {

	@Autowired
	ProjectService projectService;

	@Autowired
	TeamService teamService;
	
	@Autowired
	TaskService taskService;

	@RequestMapping(value = "/api/projects/", method = RequestMethod.POST)
	public @ResponseBody
	Project createProject(HttpSession httpSession,
			@RequestParam("name") String projectName,
			@RequestParam("desc") String description,
			@RequestParam("team") long teamId) throws Exception {
		Team team = teamService.getTeamById(teamId);
		if (team == null)
			throw new Exception("Team not found");
		return projectService.addProject(projectName, description, team);
	}

	@RequestMapping(value = "/api/projects/{projectId}/", method = RequestMethod.GET)
	public @ResponseBody Project projectInfo(HttpSession httpSession,
			@PathVariable(value = "projectId") long projectId) {
		Map<String,Object> data = new HashMap<String, Object>();
		Project project = projectService.getProjectById(projectId);		
		return project;
	}
}
