package workcross.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.*;

import workcross.model.*;
import workcross.repository.CommentRepository;
import workcross.repository.EntryRepository;
import workcross.repository.ProjectRepository;
import workcross.repository.TaskMemberRepository;
import workcross.repository.TaskRepository;
import workcross.repository.TeamMemberRepository;
import workcross.repository.TeamRepository;
import workcross.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	UserRepository userRepository;

	public Comment addTaskComment(Task task, User user, String message) {
		Comment comment = new Comment("task", task.getId(), user.getId(),
				message);
		return commentRepository.save(comment);
	}

	public List<Comment> getTaskComment(Task task) {
		List<Comment> comments = commentRepository.findByObjectTypeAndObjectId(
				"task", task.getId());
		return comments;
	}

	public Comment fillCommentOwener(Comment comment) {
		User user = userRepository.findById(comment.getUserId());
		comment.setOwner(user);
		return comment;
	}

}
