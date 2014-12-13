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
import workcross.repository.FeedRepository;
import workcross.repository.ProjectRepository;
import workcross.repository.TaskMemberRepository;
import workcross.repository.TaskRepository;
import workcross.repository.TeamMemberRepository;
import workcross.repository.TeamRepository;
import workcross.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StopWatch.TaskInfo;

@Service
@Transactional
public class FeedService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private FeedRepository feedRepository;

	@PersistenceContext
	private EntityManager em;



	public Feed setFeedRead(long feedId,Boolean read) {
		Feed feed = feedRepository.findById(feedId);
		feed.setRead(true);
		return feedRepository.save(feed);
	}

	public Feed addUserTaskFeed(long taskId, User user, String message) {
		Feed feed = new Feed("task", taskId, user.getId(), message);
		return feedRepository.save(feed);
	}

	public Feed addUserTaskFeed(Task task, User user, String message) {
		Feed feed = new Feed("task", task.getId(), user.getId(), message);
		return feedRepository.save(feed);
	}

	public List<Feed> addUsersTaskFeeds(long taskId, List<Long> userIds,
			String message) {
		Feed feed;
		List<Feed> result = new ArrayList<Feed>();
		for (long userId : userIds) {
			feed = new Feed("task", taskId, userId, message);
			result.add(feedRepository.save(feed));
		}
		return result;
	}

	public List<Feed> getUserFeed(User user) {
		return feedRepository.findByUserId(user.getId());
	}


	// public int getUserUnReadNumber(User user) {
	//
	// }

}
