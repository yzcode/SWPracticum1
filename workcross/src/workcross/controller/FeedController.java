package workcross.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import workcross.model.*;
import workcross.service.FeedService;
import workcross.service.ProjectService;
import workcross.service.UserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class FeedController {

	@Autowired
	private UserService userService;

	@Autowired
	private FeedService feedService;

	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/api/feeds/", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> getUserFeeds(HttpSession httpSession) {
		Map<String, Object> result = new HashMap<String, Object>();
		User user = (User) httpSession.getAttribute("user");
		if (user == null)
			return result;
		List<Feed> feeds = feedService.getUserFeed(user);
		result.put("feeds", feeds);
		return result;
	}

	@RequestMapping(value = "/api/feeds/{feedId}/", method = RequestMethod.POST)
	@ResponseBody Feed setFeedread(HttpSession httpSession,
			@PathVariable(value = "feedId") long feedId, Boolean read) {
		return feedService.setFeedRead(feedId, read);
	}

}
