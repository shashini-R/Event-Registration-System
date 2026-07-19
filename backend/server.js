const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Event Registration Backend Running");
});

// Save Registration
app.post("/", (req, res) => {
    const newRegistration = req.body;

    const registrations = JSON.parse(
        fs.readFileSync("registrations.json", "utf8")
    );

    registrations.push(newRegistration);

    fs.writeFileSync(
        "registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    res.json({
        message: "Registration Successful!"
    });
});

// View Registrations
app.get("/registrations", (req, res) => {
    const registrations = JSON.parse(
        fs.readFileSync("registrations.json", "utf8")
    );

    res.json(registrations);
});
// Delete Registration
app.delete("/registrations/:index", (req, res) => {

    const index = parseInt(req.params.index);

    let registrations = JSON.parse(
        fs.readFileSync("registrations.json", "utf8")
    );

    registrations.splice(index, 1);

    fs.writeFileSync(
        "registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    res.json({
        message: "Registration Deleted Successfully!"
    });

});
// Update Registration
app.put("/registrations/:index", (req, res) => {

    const index = parseInt(req.params.index);

    const updatedRegistration = req.body;

    let registrations = JSON.parse(
        fs.readFileSync("registrations.json", "utf8")
    );

    registrations[index] = updatedRegistration;

    fs.writeFileSync(
        "registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    res.json({
        message: "Registration Updated Successfully!"
    });

});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});