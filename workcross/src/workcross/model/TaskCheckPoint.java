package workcross.model;

import javax.persistence.*;

@Entity
@Table(name = "task_checkpoint")
public class TaskCheckPoint extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2912622171091734494L;

	@Column(name = "taskId",nullable = false)
	private long taskId;
	
	@Column(name = "name",length=50)
	private String name;
	
	@Column(name = "completed", nullable = false)
	private Boolean completed = false;

	public long getTaskId() {
		return taskId;
	}

	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	public TaskCheckPoint() {
		super();
	}
	
	public TaskCheckPoint(long taskId, String name, Boolean completed) {
		super();
		this.taskId = taskId;
		this.name = name;
		this.completed = completed;
	}	
}
