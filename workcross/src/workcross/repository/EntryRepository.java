package workcross.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import workcross.model.*;

public interface EntryRepository extends CrudRepository<Entry, Long> {
	Entry findById(long id);
	List<Entry> findByProjectId(long projectId);
}
