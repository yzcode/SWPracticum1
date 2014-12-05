package workcross.repository;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import workcross.model.Team;
import workcross.model.User;

public interface TeamRepository extends CrudRepository<Team, Long>{
	Team findById(long id);
	List<Team> findByIdIn(List<Long> ids);
}
