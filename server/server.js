const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(express.json()); 

const DATA_DIR = path.join(__dirname, "data");

// Function to read CSV and limit rows
const readCSV = (fileName, limit, res) => {
    const filePath = path.join(DATA_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `File not found: ${fileName}` });
    }

    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
            if (results.length < limit) {
                results.push(data);
            }
        })
        .on("end", () => res.json(results))
        .on("error", (err) => {
            console.error("CSV Read Error:", err);
            res.status(500).json({ error: "Failed to read CSV file." });
        });
};

// Updated API routes with limits
app.get("/api/sales-time", (req, res) => readCSV("Time of day (totals).csv", 10, res));
app.get("/api/sales-date", (req, res) => readCSV("Sales by day.csv", 10, res));
app.get("/api/sales-category", (req, res) => readCSV("Sales category summary.csv", 5, res));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
