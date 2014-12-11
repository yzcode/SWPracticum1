package workcross.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "task")
public class Task extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4392436816333091974L;

	@Column(name = "projectId",nullable = false)
	private long projectId;

	@Column(name = "entryId",nullable = true)
	private long entryId;

	@Column(name = "taskName", nullable = false)
	private String taskName;

	@Column(name = "completed", nullable = false)
	private Boolean completed = false;

	@Column(name = "archive", nullable = false)
	private Boolean archive = false;
	 
	@Column(name = "expireDate", nullable = true)
	private Date expireDdate;

	@Lob
	@Column(name = "description", nullable = true)
	private String description;

	@Column(name = "pos", nullable = false)
	private double pos = 65535.0;
	
	@Transient
	private List<User> members;
	
	@Transient
	private List<User> watcher;
	
	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public long getEntryId() {
		return entryId;
	}

	public void setEntryId(long entryId) {
		this.entryId = entryId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	public Date getExpireDdate() {
		return expireDdate;
	}

	public void setExpireDdate(Date expireDdate) {
		this.expireDdate = expireDdate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPos() {
		return pos;
	}

	public void setPos(double pos) {
		this.pos = pos;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Boolean getArchive() {
		return archive;
	}

	public void setArchive(Boolean archive) {
		this.archive = archive;
	}

	public List<User> getMembers() {
		return members;
	}

	public void setMembers(List<User> members) {
		this.members = members;
	}

	public List<User> getWatcher() {
		return watcher;
	}

	public void setWatcher(List<User> watcher) {
		this.watcher = watcher;
	}

	public Task() {
		super();
	}
	
	public Task(long projectId, long entryId, String taskName,
			String description, double pos) {
		super();
		this.projectId = projectId;
		this.entryId = entryId;
		this.taskName = taskName;
		this.description = description;
		this.pos = pos;
	}

	
}
