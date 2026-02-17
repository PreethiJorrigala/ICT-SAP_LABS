import java.util.*;

public class Activity1 {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter email");
        String email = sc.nextLine();
        if (email.contains("@")) {
            if (email.contains(".")) {
                int idx = email.indexOf('@');
                String username = email.substring(0, idx);
                int idx2 = email.indexOf('.');
                String domain = email.substring(idx + 1, idx2);
                System.out.println("Username : " + username);
                System.out.println("Domain : " + domain);
            } else {
                System.out.println("Email is invalid");
            }
        } else {
            System.out.println("Email doesn't contain '@'");
        }
    }
}
