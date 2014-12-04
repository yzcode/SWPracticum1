package workcross.repository;

import org.springframework.data.repository.CrudRepository;

import workcross.model.User;


public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);
	User findById(Integer id);
}
