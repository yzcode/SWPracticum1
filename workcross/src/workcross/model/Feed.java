package workcross.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "feed")
public class Feed extends BaseModel {

	/**
	 *
	 */
	private static final long serialVersionUID = -1467828501059130055L;

	@Column(name = "objectType", nullable = false)
	private String objectType;

	@Column(name = "objectId", nullable = false)
	private long objectId;

	@Column(name = "userId", nullable = false)
	private long userId;

	@Column(name = "is_read", nullable = false, columnDefinition = "tinyint(1) default 0")
	private Boolean read = false;

	@Column(name = "message", nullable = false, length = 250)
	private String message;

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

	public Boolean getRead() {
		return read;
	}

	public void setRead(Boolean read) {
		this.read = read;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Feed(String objectType, long objectId, long userId, String message) {
		super();
		this.objectType = objectType;
		this.objectId = objectId;
		this.userId = userId;
		this.message = message;
	}

	public Feed() {
		super();
	}

}
