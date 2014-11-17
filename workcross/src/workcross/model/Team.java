package workcross.model;

import java.sql.Timestamp;

/**
 * Team entity. @author MyEclipse Persistence Tools
 */

public class Team implements java.io.Serializable {

	// Fields

	private Integer id;
	private String teamname;
	private String description;
	private Timestamp createTime;
	private Timestamp updateTime;

	// Constructors

	/** default constructor */
	public Team() {
	}

	/** minimal constructor */
	public Team(String teamname) {
		this.teamname = teamname;
	}

	/** full constructor */
	public Team(String teamname, String description, Timestamp createTime,
			Timestamp updateTime) {
		this.teamname = teamname;
		this.description = description;
		this.createTime = createTime;
		this.updateTime = updateTime;
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

	public Timestamp getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Timestamp getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

}