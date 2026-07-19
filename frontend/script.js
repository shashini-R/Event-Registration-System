const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const registration = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("event").value
    };

    try {
        const response = await fetch("https://event-registration-system-tbuv.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registration)
        });

        const result = await response.json();

        alert(result.message);

        form.reset();

    } catch (error) {
        alert("Unable to connect to the server.");
        console.error(error);
    }
});