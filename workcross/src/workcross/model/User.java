package workcross.model;

import java.sql.Timestamp;

import workcross.service.UserService;

import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import net.sf.ehcache.config.CacheConfiguration;

/**
 * User entity. @author MyEclipse Persistence Tools
 */

@Entity
@Table(name = "user")
public class User extends BaseModel {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 5925559784139229711L;

	@Column(name = "username",nullable = false,unique = true)
	private String username;

	@JsonIgnore
	@Column(name = "password")
	private String password;

	@Column(name = "nickname")
	private String nickname;

	@Column(name = "email")
	private String email;

	// Constructors

	/** default constructor */
	public User() {
	}

	/** minimal constructor */
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public User(Integer id, String username, String password, String nickname,
			String email) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.nickname = nickname;
		this.email = email;
	}

	// Property accessors

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setRawPassword(String password) {
		this.password = UserService.passwordEncoder.encode(password);
	}

	public boolean matchPassword(String password) {
		return UserService.passwordEncoder.matches(password, this.password);
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname() {
		return this.nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}