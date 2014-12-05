package workcross.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "project")
public class Project extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5236455197959227883L;

	@Column(name = "name", length = 45)
	private String name;

	@Lob
	@Column(nullable = true)
	private String description;

	@Column(name = "teamId")
	private long teamId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getTeamId() {
		return teamId;
	}

	public void setTeamId(long teamId) {
		this.teamId = teamId;
	}

}
