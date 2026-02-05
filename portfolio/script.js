function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = "";

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

    if (name === "") {
        errorMsg.textContent = "Please enter your name.";
        return false;
    }

    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Please enter a valid email address.";
        return false;
    }

    if (message.length < 10) {
        errorMsg.textContent = "Message must be at least 10 characters.";
        return false;
    }

    alert("Message sent successfully!");
    return true;
}