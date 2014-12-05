package workcross.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import workcross.model.*;

public interface ProjectRepository extends CrudRepository<Project, Long> {
	Project findById(long id);
	List<Project> findByTeamId(long teamid);
}
