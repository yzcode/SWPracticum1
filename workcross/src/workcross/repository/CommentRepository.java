package workcross.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import workcross.model.*;

public interface CommentRepository extends CrudRepository<Comment, Long> {
	
	List <Comment> findByObjectTypeAndObjectId(String objectType,long objectId);
	
}
