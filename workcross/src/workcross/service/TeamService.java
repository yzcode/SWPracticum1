package workcross.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;

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
	
	
	public Team addTeam(String teamName,String description)
	{
		Team team = new Team();
		team.setTeamname(teamName);
		team.setDescription(description);
		return teamRepository.save(team);
		
	}
	
	public TeamMember addUserToTeam(User user ,Team team) throws Exception 
	{
		if (user == null || team == null)
			throw new Exception("User or Team is null");
		TeamMember teamMember = new TeamMember();
		teamMember.setUserId(user.getId());
		teamMember.setTeamId(team.getId());
		return teamMemberRepository.save(teamMember);
	}
	
	public List<Team> getUserTeams(User user)
	{
		List<TeamMember> teamMembers =  teamMemberRepository.findByUserId(user.getId());
		List<Long> teamIds = new ArrayList<Long>();
		for (TeamMember tm:teamMembers)
			teamIds.add(tm.getTeamId());
		return teamRepository.findByIdIn(teamIds);
	}
	
	public List<User> getTeamUsers(Team team)
	{
		List<TeamMember> teamMembers =  teamMemberRepository.findByTeamId(team.getId());
		List<Long> userIds = new ArrayList<Long>();
		for (TeamMember tm:teamMembers)
			userIds.add(tm.getUserId());
		return userRepository.findByIdIn(userIds);
	}
	
}
