package workcross.model;

import javax.persistence.*;

@Entity
@Table(name = "task_member", uniqueConstraints = { @UniqueConstraint(columnNames = {
		"taskId", "userId","relation" }) })
public class TaskMember extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1045581385390936374L;

	@Column(name = "taskId")
	long taskId;

	@Column(name = "userId")
	long userId;

	@Column(name = "relation", length = 10)
	String relation;

	public long getTaskId() {
		return taskId;
	}

	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

	public TaskMember(long taskId, long userId, String relation) {
		super();
		this.taskId = taskId;
		this.userId = userId;
		this.relation = relation;
	}

	public TaskMember() {
		super();
	}



	
}
