package workcross.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import workcross.model.*;
import workcross.repository.TeamRepository;
import workcross.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

	private static final String SITE_WIDE_SECRET = "my-secret-key";
	public static final PasswordEncoder passwordEncoder = new StandardPasswordEncoder(
			SITE_WIDE_SECRET);
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TeamRepository teamRepository;

	@PersistenceContext
	public EntityManager em;

	public User addUser(String username, String raw_password, String email,
			String nickname) {
		User user = new User();
		user.setUsername(username);
		user.setRawPassword(raw_password);
		user.setNickname(nickname);
		user.setEmail(email);
		return userRepository.save(user);
	}

	public User getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public List<Team> getUserTeamsByRole(User user, String role) {
		Query query = em
				.createQuery("select teamId from TeamMember where userId=:userId and role=:role");
		query.setParameter("userId", user.getId());
		query.setParameter("role", role);
		List<Long> teamIds = query.getResultList();
		if (!teamIds.isEmpty())
			return teamRepository.findByIdIn(teamIds);
		else
			return new ArrayList<Team>();
	}
}
