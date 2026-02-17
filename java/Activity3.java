import java.util.*;

// Custom Exception Class
class InvalidAgeException extends Exception {
    InvalidAgeException(String message) {
        super(message);
    }
}

// Main Class
public class Activity3 {

    // method to check age
    static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or above!");
        } else {
            System.out.println("Eligible");
        }
    }

    public static void main(String args[]) {

        Scanner sc = new Scanner(System.in);

        try {
            System.out.println("Enter age:");
            int age = sc.nextInt(); // may cause InputMismatchException

            checkAge(age); // may cause InvalidAgeException
        }

        // built-in exception
        catch (InputMismatchException e) {
            System.out.println("Invalid input! Please enter numbers only.");
        }

        // custom exception
        catch (InvalidAgeException e) {
            System.out.println("Custom Exception: " + e.getMessage());
        }

        finally {
            System.out.println("Program Ended");
        }
    }
}
