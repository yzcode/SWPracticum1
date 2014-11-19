package workcross.model;

import org.hibernate.Query;
import org.hibernate.SessionFactory;

public class UserManager {

	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
