document.addEventListener("DOMContentLoaded", function() {
    let totalCollected = 0;
    const budget = 100000; // Set your Durga Puja budget here

    // Form submission handler
    document.getElementById("contributionForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the name and amount from the form
        let name = document.getElementById("name").value.trim();
        let amount = parseFloat(document.getElementById("amount").value);

        // Validation to ensure no empty values or invalid numbers
        if (name === "" || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid name and contribution amount.");
            return;
        }

        // Clear the form fields
        document.getElementById("name").value = '';
        document.getElementById("amount").value = '';

        // Add the contribution to the list
        let contributionList = document.getElementById("contributionList");
        let listItem = document.createElement("li");
        listItem.textContent = `${name} contributed ₹${amount}`;
        contributionList.appendChild(listItem);

        // Update total collected money
        totalCollected += amount;
        document.getElementById("totalCollected").textContent = totalCollected;


        compareWithBudget(totalCollected, budget);
    });


    function compareWithBudget(collected, budget) {
        let resultMessage = document.getElementById("resultMessage");
        if (collected >= budget) {
            resultMessage.textContent = "Congratulations! You have reached the budget goal!";
            resultMessage.style.color = "green";
        } else {
            let remaining = budget - collected;
            resultMessage.textContent = `You still need ₹${remaining} to reach the budget.`;
            resultMessage.style.color = "red";
        }
    }
});