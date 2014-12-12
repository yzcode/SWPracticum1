package workcross.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import workcross.model.TaskCheckPoint;;

public interface TaskCheckPointRepository extends CrudRepository<TaskCheckPoint, Long> {
	List<TaskCheckPoint> findByTaskId(long taskId);
	TaskCheckPoint findById(long id);
}
