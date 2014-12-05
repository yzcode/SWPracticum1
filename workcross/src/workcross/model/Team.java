package workcross.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Team entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "team")
public class Team implements java.io.Serializable {

	// Fields

	@Id
	private Integer id;

	@Column(name = "teamname")
	private String teamname;
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

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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