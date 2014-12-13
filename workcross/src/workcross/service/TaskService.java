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
import workcross.repository.TaskCheckPointRepository;
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
public class TaskService {

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	EntryRepository entryRepository;

	@Autowired
	TaskMemberRepository taskMemberRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	TaskCheckPointRepository taskCheckPointRepository;

	@PersistenceContext
	public EntityManager em;

	public Entry addEntry(long projectId, String entryName, double pos) {
		Entry entry = new Entry(projectId, entryName, pos);
		return entryRepository.save(entry);
	}

	public Task addTask(long projectId, long entryId, String taskName,
			String description, double pos) {
		Task task = new Task(projectId, entryId, taskName, description, pos);
		return taskRepository.save(task);
	}

	public Task saveTask(Task task) {
		Task o_task = taskRepository.findById(task.getId());
		task.setDateCreated(o_task.getDateCreated());
		task.setProjectId(o_task.getProjectId());
		return taskRepository.save(task);
	}

	public void removeTask(Task task) {
		taskRepository.delete(task);
	}

	public void removeEntry(Entry entry) {
		entryRepository.delete(entry);
	}

	public void removeTask(long id) {
		taskRepository.delete(id);
	}

	public void removeEntry(long id) {
		entryRepository.delete(id);
	}

	public List<Task> getProjectTasks(Project project) {
		return taskRepository.findByProjectId(project.getId());
	}

	public List<Entry> getProjectEntries(Project project) {
		return entryRepository.findByProjectId(project.getId());
	}

	public TaskMember addTaskMember(Task task, User user) {
		TaskMember taskMember = new TaskMember(task.getId(), user.getId(),
				"member");
		return taskMemberRepository.save(taskMember);
	}

	public TaskMember addTaskWatcher(Task task, User user) {
		TaskMember taskMember = new TaskMember(task.getId(), user.getId(),
				"watcher");
		return taskMemberRepository.save(taskMember);
	}

	public Task getTaskById(long taskId) {
		return taskRepository.findById(taskId);
	}

	public List<Long> getTaskMemberUserIds(Task task) {
		Query query = em
				.createQuery("select userId from TaskMember where taskId=:taskId and relation=:relation");
		query.setParameter("taskId", task.getId());
		query.setParameter("relation", "member");
		List<Long> result = query.getResultList();
		return result;
	}

	public List<Long> getTaskWatcherUserIds(Task task) {
		Query query = em
				.createQuery("select userId from TaskMember where taskId=:taskId and relation=:relation");
		query.setParameter("taskId", task.getId());
		query.setParameter("relation", "watcher");
		List<Long> result = query.getResultList();
		return result;
	}

	public Task fillTaskMember(Task task) {
		List<Long> userIds = getTaskMemberUserIds(task);
		if (!userIds.isEmpty())
			task.setMembers(userRepository.findByIdIn(userIds));
		else
			task.setMembers(new ArrayList<User>());
		return task;
	}

	public TaskCheckPoint addTaskCheckPoint(Task task, String name) {
		TaskCheckPoint taskCheckPoint = new TaskCheckPoint(task.getId(), name,
				false);
		return taskCheckPointRepository.save(taskCheckPoint);
	}

	public TaskCheckPoint modifyTaskCheckPoint(TaskCheckPoint taskCheckPoint,
			Boolean completed) {
		taskCheckPoint.setCompleted(completed);
		return taskCheckPointRepository.save(taskCheckPoint);
	}

	public TaskCheckPoint getTaskCheckPointById(long checkPointId) {
		return taskCheckPointRepository.findById(checkPointId);
	}

	public void deleteTaskCheckPoint(TaskCheckPoint taskCheckPoint) {
		if (taskCheckPoint != null)
			taskCheckPointRepository.delete(taskCheckPoint);
	}

	public List<TaskCheckPoint> getTaskCheckPoints(Task task) {
		return taskCheckPointRepository.findByTaskId(task.getId());
	}

	public Task fillTaskCheckPoints(Task task) {
		task.setCheckpoints(getTaskCheckPoints(task));
		return task;
	}

	public List<Task> getTasksByProjectIds(List<Long> ProjectIds) {
		return taskRepository.findByProjectIdIn(ProjectIds);
	}

	public void deleteTask(Task task) {
		taskRepository.delete(task);
	}
	public void removeTaskMember(long taskId,long userId,String relation)
	{
		TaskMember taskMember = taskMemberRepository.findByUserIdAndRelationAndTaskId(userId, relation, taskId);
		taskMemberRepository.delete(taskMember);
	}
}
