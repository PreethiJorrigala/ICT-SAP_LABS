package com.library;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class AddBookServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String title = request.getParameter("title");
        String author = request.getParameter("author");
        double price = Double.parseDouble(request.getParameter("price"));

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                "insert into books(title,author,price) values(?,?,?)");

            ps.setString(1, title);
            ps.setString(2, author);
            ps.setDouble(3, price);

            ps.executeUpdate();

            response.sendRedirect("viewBooks");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
