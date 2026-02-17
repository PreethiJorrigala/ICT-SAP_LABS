import java.util.Scanner;

public class Activity2 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Step 1: Get user data
        System.out.println("Enter your name:");
        String name = sc.nextLine();

        System.out.println("Enter OTP:");
        String otp = sc.nextLine();

        System.out.println("Enter OTP expiry time (minutes):");
        String expiry = sc.nextLine();

        // Step 2: Build the SMS using StringBuilder
        StringBuilder sms = new StringBuilder();
        sms.append("Hello ").append(name).append(",\n");
        sms.append("Your OTP is ").append(otp).append(".\n");
        sms.append("It will expire in ").append(expiry).append(" minutes.\n");

        System.out.println("\nOriginal SMS:");
        System.out.println(sms);

        // Step 3: Manipulate the SMS
        // Example 1: Insert a note at the beginning
        sms.insert(0, "*****IMPORTANT*****\n");
        System.out.println("\nSMS after insert:");
        System.out.println(sms);

        // Example 2: Replace OTP with masked version
        String maskedOtp = otp.replaceAll(".", "*"); // mask OTP
        int otpStart = sms.indexOf(otp);
        sms.replace(otpStart, otpStart + otp.length(), maskedOtp);
        System.out.println("\nSMS after masking OTP:");
        System.out.println(sms);

        // Example 3: Reverse the SMS (just for demonstration)
        StringBuilder reversedSms = new StringBuilder(sms).reverse();
        System.out.println("\nReversed SMS (for fun):");
        System.out.println(reversedSms);
    }
}
