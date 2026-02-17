import java.util.*;

public class character {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter String");
        String s = sc.nextLine();
        System.out.println("Enter index");
        int n = sc.nextInt();
        System.out.println("Character at " + n + "nd index is " + s.charAt(n));
        System.out.println("Enter Sequence");
        String str = sc.next();
        if (s.contains(str))
            System.out.println("String contains entered character sequence");
        else
            System.out.println("String doesn't contain entered character sequence");
        StringBuilder sb = new StringBuilder(s);
        System.out.println("Enter character to be replaced");
        String s1 = sc.next();
        int idx = s.indexOf(s1);
        System.out.println("Enter character to replace");
        String s2 = sc.next();
        sb.replace(idx, idx + 1, s2);
        System.out.println("replaced String " + sb.toString());
    }
}
