package workcross.model;

import java.sql.Timestamp;

import javax.persistence.*;

/**
 * Team entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "team")
public class Team extends BaseModel {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = -3545568025433385025L;

	@Column(name = "teamname", nullable = false, length = 45)
	private String teamname;

	@Lob 
	@Column(name = "description")
	private String description;

	// Constructors

	/** default constructor */
	public Team() {
	}

	/** minimal constructor */
	public Team(String teamname) {
		this.teamname = teamname;
	}

	public Team(Integer id, String teamname, String description) {
		super();
		this.id = id;
		this.teamname = teamname;
		this.description = description;
	}

	// Property accessors

	public String getTeamname() {
		return this.teamname;
	}

	public void setTeamname(String teamname) {
		this.teamname = teamname;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}