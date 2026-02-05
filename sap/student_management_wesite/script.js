const students = [];
const msg = document.getElementById("msg");
const tableBody = document.getElementById("tableBody");

function calculateGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const rollNo = document.getElementById("rollNo").value.trim();
    const marks = Number(document.getElementById("marks").value);

    msg.textContent = "";
    msg.className = "";

    if (!name || !email || !rollNo || isNaN(marks)) {
        msg.textContent = "❌ All fields are required";
        msg.className = "error";
        return;
    }

    if (marks < 0 || marks > 100) {
        msg.textContent = "❌ Marks must be between 0 and 100";
        msg.className = "error";
        return;
    }

    const grade = calculateGrade(marks);
    students.push({ name, email, rollNo, marks, grade });
    renderTable();

    msg.textContent = `✅ ${name} added successfully`;
    msg.className = "success";

    document.getElementById("studentForm").reset();
}

function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((s, index) => {
        tableBody.innerHTML += `
                    <tr>
                        <td>${s.name}</td>
                        <td>${s.email}</td>
                        <td>${s.rollNo}</td>
                        <td>${s.marks}</td>
                        <td class="grade">${s.grade}</td>
                        <td><span class="remove-btn" onclick="removeStudent(${index})">Remove</span></td>
                    </tr>
                `;
    });
}

function removeStudent(index) {
    students.splice(index, 1);
    renderTable();
    msg.textContent = "✅ Student removed successfully";
    msg.className = "success";
}