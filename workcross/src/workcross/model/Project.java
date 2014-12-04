package workcross.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "project")
public class Project implements Serializable {

	@Id
	private int id;

	@Column(name = "name")
	private String name;

	@Column(nullable = true)
	private String description;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

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
	
	

}
