package workcross.model;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SessionFactory;

import workcross.model.*;
import org.springframework.security.crypto.password.*;
public class UserManager {

	private static final String SITE_WIDE_SECRET = "my-secret-key";
	public static final PasswordEncoder passwordEncoder = new StandardPasswordEncoder(
			SITE_WIDE_SECRET);
	private SessionFactory sessionFactory;

	@Resource(name = "sessionFactory")
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public void addUser(String username, String raw_password, String email,
			String nickname) {
		User user = new User();
		user.setUsername(username);
		user.setRawPassword(raw_password);
		user.setNickname(nickname);
		user.setEmail(email);
		sessionFactory.getCurrentSession().save(user);
	}
	public User getUserByUsername(String username)
	{
		String hql = "from User where username = ? ";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter(0, username);
		return  (User)query.uniqueResult();
	}
}
