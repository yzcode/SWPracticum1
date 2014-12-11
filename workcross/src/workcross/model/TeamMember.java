package workcross.model;

import javax.persistence.*;

@Entity
@Table(name = "team_member", uniqueConstraints = { @UniqueConstraint(columnNames = {
		"teamId", "userId" }) })
public class TeamMember extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5622782603325749082L;

	@Column(name = "teamId")
	long teamId;

	@Column(name = "userId")
	long userId;

	@Column(name = "role", length = 10)
	String role;

	public long getTeamId() {
		return teamId;
	}

	public void setTeamId(long teamId) {
		this.teamId = teamId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
