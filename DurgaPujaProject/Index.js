document.addEventListener("DOMContentLoaded", function() {
    let totalCollected = 0;
    const budget = 100000;
    let contributions = [];
    let editingIndex = -1;

    document.getElementById("contributionForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let amount = parseFloat(document.getElementById("amount").value);

        if (editingIndex === -1) {

            contributions.push({ name, amount });

            totalCollected += amount;
        } else {

            let oldAmount = contributions[editingIndex].amount;
            totalCollected -= oldAmount;
            totalCollected += amount;

            contributions[editingIndex] = { name, amount };
            editingIndex = -1;
        }


        document.getElementById("name").value = '';
        document.getElementById("amount").value = '';

        updateContributionList();
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

    function updateContributionList() {
        let contributionList = document.getElementById("contributionList");
        contributionList.innerHTML = '';

        contributions.forEach((contribution, index) => {
            let listItem = document.createElement("li");
            listItem.textContent = `${contribution.name} contributed ₹${contribution.amount}`;


            listItem.addEventListener("click", function() {
                document.getElementById("name").value = contribution.name;
                document.getElementById("amount").value = contribution.amount;
                editingIndex = index;
            });

            contributionList.appendChild(listItem);
        });
    }

    document.getElementById("downloadCSV").addEventListener("click", function() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Name,Amount\n";

        contributions.forEach(function(row) {
            csvContent += `${row.name},${row.amount}\n`;
        });

        let excelURi = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", excelURi);
        link.setAttribute("download", "durga_puja_contributions.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});