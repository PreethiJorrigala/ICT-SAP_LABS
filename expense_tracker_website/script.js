let transactions = [];

function addTransaction() {
    const text = document.getElementById('text').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;

    if (text === '' || amount === '') {
        alert("Please enter description and amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        text,
        amount: Number(amount),
        type
    };

    transactions.push(transaction);
    updateUI();

    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
}

function updateUI() {
    const list = document.getElementById('transactionList');
    list.innerHTML = '';

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;

        const li = document.createElement('li');
        li.classList.add(t.type);
        li.innerHTML = `
                    ${t.text} <span>₹${t.amount}</span>
                    <button class="delete-btn" onclick="deleteTransaction(${t.id})">×</button>
                `;
        list.appendChild(li);
    });

    document.getElementById('income').innerText = income;
    document.getElementById('expense').innerText = expense;
    document.getElementById('balance').innerText = income - expense;
}