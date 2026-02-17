interface Dog {
    void talk();

    void walk();
}

public class Interface implements Dog {

    public void talk() {
        System.out.println("Dog is talking");
    }

    public void walk() {
        System.out.println("Dog is walking");
    }

    public static void main(String args[]) {
        Interface i = new Interface();
        i.talk();
        i.walk();
    }
}
