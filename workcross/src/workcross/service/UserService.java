package workcross.service;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SessionFactory;

import workcross.model.*;
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
	
	public void addUser(String username, String raw_password, String email,
			String nickname) {
		User user = new User();
		user.setUsername(username);
		user.setRawPassword(raw_password);
		user.setNickname(nickname);
		user.setEmail(email);
		userRepository.save(user);
	}

	public User getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}
