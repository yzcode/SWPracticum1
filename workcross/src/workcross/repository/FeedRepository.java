package workcross.repository;


import java.util.List;
import org.springframework.data.repository.CrudRepository;
import workcross.model.*;

public interface FeedRepository  extends CrudRepository<Feed, Long>{
	Feed findById(long id);
	List<Feed> findByUserId(long userId);
}
