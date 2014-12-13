package workcross.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import workcross.model.Entry;
import workcross.model.Task;
public interface TaskRepository extends CrudRepository<Task, Long> {

	Task findById(long id);
	List<Task> findByProjectId(long projectId);
	List<Task> findByProjectIdIn(List<Long> projectIds);
	List<Task> findByEntryId(long entryId);
}
