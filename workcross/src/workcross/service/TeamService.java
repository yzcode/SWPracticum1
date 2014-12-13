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
import workcross.repository.TeamMemberRepository;
import workcross.repository.TeamRepository;
import workcross.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TeamService {

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private TeamMemberRepository teamMemberRepository;

	@Autowired
	private UserRepository userRepository;

	@PersistenceContext
	public EntityManager em;

	public Team addTeam(String teamName, String description) {
		Team team = new Team();
		team.setTeamname(teamName);
		team.setDescription(description);
		return teamRepository.save(team);

	}

	public TeamMember addUserToTeam(User user, Team team) throws Exception {
		if (user == null || team == null)
			throw new Exception("User or Team is null");
		TeamMember teamMember = new TeamMember();
		teamMember.setUserId(user.getId());
		teamMember.setTeamId(team.getId());
		return teamMemberRepository.save(teamMember);
	}

	public TeamMember addUserToTeam(User user, Team team, String role)
			throws Exception {
		if (user == null || team == null)
			throw new Exception("User or Team is null");
		TeamMember teamMember = new TeamMember();
		teamMember.setUserId(user.getId());
		teamMember.setTeamId(team.getId());
		teamMember.setRole(role);
		return teamMemberRepository.save(teamMember);
	}

	public List<Team> getUserTeams(User user) {
		Query query = em
				.createQuery("select teamId from TeamMember where userId=:userId");
		query.setParameter("userId", user.getId());
		List<Long> teamIds = query.getResultList();
		if (!teamIds.isEmpty())
			return teamRepository.findByIdIn(teamIds);
		else
			return new ArrayList<Team>();
	}

	public List<Long> getTeamUserIds(Team team) {
		Query query = em
				.createQuery("select userId from TeamMember where teamId=:teamId");
		query.setParameter("teamId", team.getId());
		List<Long> userIds = query.getResultList();
		return userIds;
	}

	public List<User> getTeamUsers(Team team) {

		List<Long> userIds = getTeamUserIds(team);
		if (!userIds.isEmpty())
			return userRepository.findByIdIn(userIds);
		else
			return new ArrayList<User>();
	}

	public Team getTeamById(long id) {
		return teamRepository.findById(id);
	}

}
