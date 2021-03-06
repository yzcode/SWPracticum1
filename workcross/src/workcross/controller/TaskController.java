package workcross.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import workcross.model.*;
import workcross.service.FeedService;
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

	@Autowired
	UserService userService;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	FeedService feedService;

	@RequestMapping(value = "/api/projects/{projectId}/entries/", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> projectTasks(HttpSession httpSession,
			@PathVariable(value = "projectId") long projectId) throws Exception {
		Map<String, Object> data = new HashMap<String, Object>();
		Project project = projectService.getProjectById(projectId);
		List<Entry> entries = taskService.getProjectEntries(project);
		List<Task> tasks = taskService.getProjectTasks(project);
		for (Task task : tasks) {
			taskService.fillTaskMember(task);
			taskService.fillTaskCheckPoints(task);
		}
		data.put("project", project);
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
		User user = (User) httpSession.getAttribute("user");
		Task task = taskService.addTask(projectId, entryId, name, description,
				pos);
		taskService.addTaskWatcher(task, user);
		taskService.fillTaskMember(task);

		Project project = projectService.getProjectById(projectId);
		Team team = teamService.getTeamById(project.getTeamId());
		List<Long> teamMemberIds = teamService.getTeamUserIds(team);
		feedService.addUsersTaskFeeds(task.getId(), teamMemberIds,
				String.format("%s 添加了一个任务:%s", user.getNickname(), name));

		return task;
	}

	@RequestMapping(value = "/api/tasks/{taskId}/", method = RequestMethod.GET)
	@ResponseBody
	Task getTask(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId) {
		Task task = taskService.getTaskById(taskId);
		taskService.fillTaskCheckPoints(task);
		taskService.fillTaskMember(task);
		return task;
	}

	@RequestMapping(value = "/api/tasks/{taskId}/", method = RequestMethod.DELETE)
	@ResponseBody
	Task deleteTask(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId) {
		Task task = taskService.getTaskById(taskId);
		taskService.deleteTask(task);
		return task;
	}

	@RequestMapping(value = "/api/tasks/{taskId}/", method = RequestMethod.POST)
	public @ResponseBody
	Task modeifyTask(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId,
			@RequestBody String json) throws JsonParseException,
			JsonMappingException, IOException {
		// User user = (User) httpSession.getAttribute("user");
		Task task = objectMapper.readValue(json, Task.class);
		task.setId(taskId);
		return taskService.saveTask(task);
	}

	@RequestMapping(value = "/api/tasks/{taskId}/members/", method = RequestMethod.POST)
	public @ResponseBody
	TaskMember addTaskMember(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId, String username) {
		User user = userService.getUserByUsername(username);
		Task task = taskService.getTaskById(taskId);

		feedService.addUserTaskFeed(taskId, user,
				String.format("有一条新任务分配给您:%s", task.getTaskName()));
		return taskService.addTaskMember(task, user);
	}

	@RequestMapping(value = "/api/tasks/{taskId}/members/{username}/", method = RequestMethod.DELETE)
	public @ResponseBody
	User removeTaskMember(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId,
			@PathVariable(value = "username") String username) {
		User user = userService.getUserByUsername(username);
		Task task = taskService.getTaskById(taskId);
		taskService.removeTaskMember(task.getId(), user.getId(), "member");
		return user;
	}

	@RequestMapping(value = "/api/tasks/{taskId}/watchers/", method = RequestMethod.POST)
	public @ResponseBody
	TaskMember addTaskWathcer(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId, String username) {
		User user = userService.getUserByUsername(username);
		Task task = taskService.getTaskById(taskId);
		return taskService.addTaskWatcher(task, user);
	}

	@RequestMapping(value = "/api/tasks/{taskId}/checkpoints/", method = RequestMethod.POST)
	public @ResponseBody
	TaskCheckPoint addTaskCheckPoint(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId, String name) {
		Task task = taskService.getTaskById(taskId);
		TaskCheckPoint taskCheckPoint = taskService.addTaskCheckPoint(task,
				name);
		return taskCheckPoint;
	}

	@RequestMapping(value = "/api/tasks/{taskId}/checkpoints/{checkPointId}/", method = RequestMethod.POST)
	public @ResponseBody
	TaskCheckPoint modifyTaskCheckPoint(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId,
			@PathVariable(value = "checkPointId") long checkPointId,
			Boolean completed) {
		TaskCheckPoint taskCheckPoint = taskService
				.getTaskCheckPointById(checkPointId);
		return taskService.modifyTaskCheckPoint(taskCheckPoint, completed);
	}

	@RequestMapping(value = "/api/tasks/{taskId}/checkpoints/{checkPointId}/", method = RequestMethod.DELETE)
	public void deleteTaskCheckPoint(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId,
			@PathVariable(value = "checkPointId") long checkPointId,
			Boolean completed) {
		TaskCheckPoint taskCheckPoint = taskService
				.getTaskCheckPointById(checkPointId);
		taskService.deleteTaskCheckPoint(taskCheckPoint);
	}

}
