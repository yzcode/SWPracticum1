package workcross.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import workcross.model.TeamMember;

public interface TeamMemberRepository extends CrudRepository<TeamMember, Long> {
	List<TeamMember> findByTeamId(long teamId);
	List<TeamMember> findByUserId(long userId);
	TeamMember findByTeamIdAndUserId(long teamId,long userId);
	List<TeamMember> findByUserIdAndRole(long userId,String role);
}
