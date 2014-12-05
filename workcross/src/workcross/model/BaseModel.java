package workcross.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class BaseModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected long id;

	@Column(name = "lastModified", nullable = true)
	protected Date lastModified;

	@Column(name = "dateCreated", nullable = true)
	protected Date dateCreated;

	@PreUpdate
	@PrePersist
	public void updateTimeStamps() {
		lastModified = new Date();
		if (dateCreated == null) {
			dateCreated = new Date();
		}
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

}
