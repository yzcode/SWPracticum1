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
import workcross.service.CommentService;
import workcross.service.ProjectService;
import workcross.service.TaskService;
import workcross.service.TeamService;
import workcross.service.UserService;

@Controller
public class CommentController {

	@Autowired
	TaskService taskService;

	@Autowired
	UserService userService;

	@Autowired
	CommentService commentService;

	@RequestMapping(value = "/api/tasks/{taskId}/comments/", method = RequestMethod.GET)
	public @ResponseBody
	List<Comment> getTaskComments(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId) {
		Task task = taskService.getTaskById(taskId);
		List<Comment> comments = commentService.getTaskComment(task);
		for (Comment comment : comments)
			commentService.fillCommentOwener(comment);
		return comments;
	}

	@RequestMapping(value = "/api/tasks/{taskId}/comments/", method = RequestMethod.POST)
	public @ResponseBody
	Comment createTaskComments(HttpSession httpSession,
			@PathVariable(value = "taskId") long taskId, String message) {
		Task task = taskService.getTaskById(taskId);
		User user = (User) httpSession.getAttribute("user");
		Comment comment = commentService.addTaskComment(task, user, message);
		return comment;
	}
}
