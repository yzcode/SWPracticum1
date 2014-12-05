package workcross.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import workcross.model.User;


public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);

	User findById(long id);
	List<User> findByIdIn(List<Long> ids);
}
