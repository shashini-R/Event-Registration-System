const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to registrations.json
const filePath = path.join(__dirname, "registrations.json");

// Create registrations.json if it doesn't exist
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

// Home Route
app.get("/", (req, res) => {
    res.send("Event Registration Backend Running");
});

// Register for an Event
app.post("/", (req, res) => {

    const newRegistration = req.body;

    const registrations = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    registrations.push(newRegistration);

    fs.writeFileSync(
        filePath,
        JSON.stringify(registrations, null, 2)
    );

    res.json({
        success: true,
        message: "Registration Successful!"
    });

});

// View All Registrations
app.get("/registrations", (req, res) => {

    const registrations = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    res.json(registrations);

});

// Update Registration
app.put("/registrations/:index", (req, res) => {

    const index = parseInt(req.params.index);

    let registrations = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    if (index < 0 || index >= registrations.length) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    registrations[index] = req.body;

    fs.writeFileSync(
        filePath,
        JSON.stringify(registrations, null, 2)
    );

    res.json({
        success: true,
        message: "Registration Updated Successfully!"
    });

});

// Delete Registration
app.delete("/registrations/:index", (req, res) => {

    const index = parseInt(req.params.index);

    let registrations = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    if (index < 0 || index >= registrations.length) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    registrations.splice(index, 1);

    fs.writeFileSync(
        filePath,
        JSON.stringify(registrations, null, 2)
    );

    res.json({
        success: true,
        message: "Registration Deleted Successfully!"
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});