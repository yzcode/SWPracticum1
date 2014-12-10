<%@ page language="java" import="java.util.*" import="java.io.*"  pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%
	String filename = getServletContext().getRealPath("/views/MainFrm.html");
	System.out.println(filename);
	java.io.File file = new java.io.File(filename);
	java.io.FileReader fileReader;

	if (file.exists()) {
		InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
		BufferedReader br = new BufferedReader(isr); 
		String line = null;
		PrintWriter printWriter = response.getWriter();
		while ((line=br.readLine()) != null)
		{
			//line = line.replaceAll("../static/", "/workcross/static/");
			printWriter.write(line + "\n");
		}
		br.close();
		isr.close();
	}
	
%>
