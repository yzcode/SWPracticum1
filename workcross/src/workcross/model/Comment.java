package workcross.model;
import javax.persistence.*;

@Entity
@Table(name = "Comment")
public class Comment extends BaseModel {

	@Column(name = "objectType",nullable = false)
	private String objectType;
	
	@Column(name = "objectId",nullable = false)
	private long objectId;
	
	@Column(name = "userId",nullable = false)
	private long userId;
	
	@Lob
	@Column(name = "message",nullable = true)
	private String message = "";
	
	@Transient
	private User owner;

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public long getObjectId() {
		return objectId;
	}

	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Comment() {
		super();
	}
	
	public Comment(String objectType, long objectId, long userId, String message) {
		super();
		this.objectType = objectType;
		this.objectId = objectId;
		this.userId = userId;
		this.message = message;
	}

	
	
	
}
