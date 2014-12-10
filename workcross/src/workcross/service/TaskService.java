package workcross.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;

import workcross.model.*;
import workcross.repository.EntryRepository;
import workcross.repository.ProjectRepository;
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

	public Entry addEntry(long projectId, String entryName, double pos) {
		Entry entry = new Entry(projectId, entryName, pos);
		return entryRepository.save(entry);
	}

	public Task addTask(long projectId, long entryId, String taskName,
			String description, double pos) {
		Task task = new Task(projectId, entryId, taskName, description, pos);
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

	public List<Entry> getProjectEntrys(Project project) {
		return entryRepository.findByProjectId(project.getId());
	}
}
