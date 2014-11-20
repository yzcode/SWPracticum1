package workcross.model;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SessionFactory;

import workcross.model.*;

public class UserManager {

	
	private SessionFactory sessionFactory;
	
	@Resource(name = "sessionFactory")
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public void addUser(String username, String raw_password, String email,
			String nickname) {
		User user = new User();
		user.setUsername(username);
		user.setPassword(raw_password);
		user.setNickname(nickname);
		user.setEmail(email);
		sessionFactory.getCurrentSession().save(user);
	}
}
