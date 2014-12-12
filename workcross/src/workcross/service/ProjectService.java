package workcross.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import workcross.model.*;
import workcross.repository.ProjectRepository;
import workcross.repository.TeamMemberRepository;
import workcross.repository.TeamRepository;
import workcross.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectService {

	@Autowired
	ProjectRepository projectRepository;

	@PersistenceContext
	public EntityManager em;

	public Project addProject(String projectName, String description, Team team) {
		Project project = new Project();
		project.setName(projectName);
		project.setDescription(description);
		project.setTeamId(team.getId());
		return projectRepository.save(project);
	}

	public Project getProjectById(long id) {
		return projectRepository.findById(id);
	}

	public List<Project> getTeamProjects(Team team) {
		return projectRepository.findByTeamId(team.getId());
	}

	public List<Long> getTeamProjectIds(Team team) {
		Query query = em
				.createQuery("select id from Project where teamId=:teamId");
		query.setParameter("teamId", team.getId());
		return query.getResultList();
	}
}
