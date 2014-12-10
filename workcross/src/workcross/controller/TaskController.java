package workcross.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import workcross.model.*;
import workcross.service.ProjectService;
import workcross.service.TaskService;
import workcross.service.TeamService;
import workcross.service.UserService;

@Controller
public class TaskController {
	@Autowired
	ProjectService projectService;

	@Autowired
	TeamService teamService;

	@Autowired
	TaskService taskService;

	@RequestMapping(value = "/api/entries/", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> projectTasks(HttpSession httpSession,
			@RequestParam(value = "projectId") long projectId) {
		Map<String, Object> data = new HashMap<String, Object>();
		Project project = projectService.getProjectById(projectId);
		List<Entry> entries = taskService.getProjectEntries(project);
		List<Task> tasks = taskService.getProjectTasks(project);
		data.put("entries", entries);
		data.put("tasks", tasks);
		return data;
	}

	@RequestMapping(value = "/api/entries/", method = RequestMethod.POST)
	public @ResponseBody
	Entry addEntry(HttpSession httpSession, long projectId, String name,
			double pos) {
		return taskService.addEntry(projectId, name, pos);
	}

	@RequestMapping(value = "/api/tasks/", method = RequestMethod.POST)
	public @ResponseBody
	Task addTask(HttpSession httpSession, long projectId, long entryId,
			String name, String description, double pos) {
		return taskService.addTask(projectId, entryId, name, description, pos);
	}

}
