package com.library;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class ViewBooksServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html><body>");
        out.println("<h2>Book List</h2>");
        out.println("<table border='1'>");
        out.println("<tr><th>ID</th><th>Title</th><th>Author</th><th>Price</th></tr>");

        try {

            Connection con = DBConnection.getConnection();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("select * from books");

            while(rs.next()){
                out.println("<tr>");
                out.println("<td>"+rs.getInt("id")+"</td>");
                out.println("<td>"+rs.getString("title")+"</td>");
                out.println("<td>"+rs.getString("author")+"</td>");
                out.println("<td>"+rs.getDouble("price")+"</td>");
                out.println("</tr>");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        out.println("</table>");
        out.println("<br><a href='index.html'>Back</a>");
        out.println("</body></html>");
    }
}
