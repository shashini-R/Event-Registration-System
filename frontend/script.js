const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const registration = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("event").value
    };

    try {
        const response = await fetch("https://event-registration-system-1-tbuv.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registration)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            form.reset();
        } else {
            alert(result.message || "Registration failed.");
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
});