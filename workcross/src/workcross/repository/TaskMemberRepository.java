package workcross.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import workcross.model.TaskMember;;
public interface TaskMemberRepository extends CrudRepository<TaskMember, Long> {
	List<TaskMember>findByTaskId(long taskId);
	List<TaskMember>findByUserId(long userId);
	List<TaskMember>findByTaskIdAndRelation(long taskId,String relation);
	List<TaskMember>findByUserIdAndRelation(long userId,String relation);
}
