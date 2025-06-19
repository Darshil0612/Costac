document.addEventListener("DOMContentLoaded", () => {
    fetchSalesData("http://localhost:5001/api/sales-time", "sales-time");
    fetchSalesData("http://localhost:5001/api/sales-date", "sales-date");
    fetchSalesData("http://localhost:5001/api/sales-category", "sales-category");
});

function fetchSalesData(apiUrl, tableId) {
    const tableBody = document.getElementById(`${tableId}-body`);
    const tableHeader = document.getElementById(`${tableId}-header`);

    if (!tableBody || !tableHeader) {
        console.error(`Error: Table elements for ${tableId} not found.`);
        return;
    }

    console.log(`Fetching data from ${apiUrl}...`);

    tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Data received from ${apiUrl}:`, data);
            populateTable(data, tableId);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            tableBody.innerHTML = "<tr><td colspan='5' style='color: red;'>Error loading data.</td></tr>";
        });
}

function populateTable(data, tableId) {
    console.log(`Populating table: ${tableId} with data:`, data);

    if (!data || data.length === 0) {
        document.getElementById(`${tableId}-body`).innerHTML = "<tr><td colspan='5'>No data available.</td></tr>";
        return;
    }

    // Clear previous data
    const tableHeader = document.getElementById(`${tableId}-header`);
    const tableBody = document.getElementById(`${tableId}-body`);
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    // Create table headers dynamically
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    // Populate table rows with limited data
    data.forEach(row => {
        const tr = document.createElement("tr");
        headers.forEach(header => {
            const td = document.createElement("td");
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}
