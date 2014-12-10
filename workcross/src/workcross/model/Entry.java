package workcross.model;
import javax.persistence.*;

@Entity
@Table(name = "entry")
public class Entry extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3175021405153646152L;

	@Column(name = "projectId")
	private long projectId;

	@Column(name = "entryName", nullable = false)
	private String entryName;

	@Column(name = "pos", nullable = false)
	private double pos = 65535.0;

	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public String getEntryName() {
		return entryName;
	}

	public void setEntryName(String entryName) {
		this.entryName = entryName;
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

	
	public Entry() {
		super();
	}

	public Entry(long projectId, String entryName, double pos) {
		super();
		this.projectId = projectId;
		this.entryName = entryName;
		this.pos = pos;
	}
	
	
	
}
