let registrationsData = [];

async function loadRegistrations() {

    const response = await fetch("http://localhost:5000/registrations");

    const data = await response.json();

    registrationsData = data;

    displayRegistrations(registrationsData);

}

function displayRegistrations(data) {

    const table = document.getElementById("registrationTable");

    table.innerHTML = "";

    data.forEach((registration, index) => {

        table.innerHTML += `
        <tr>
            <td>${registration.name}</td>
            <td>${registration.email}</td>
            <td>${registration.phone}</td>
            <td>${registration.event}</td>
            <td>
    <button class="btn btn-danger btn-sm"
        onclick="deleteRegistration(${index})">
        Delete
    </button>
</td>
        </tr>
        `;

    });

}

async function deleteRegistration(index) {

    const confirmDelete = confirm("Are you sure you want to delete this registration?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/registrations/${index}`, {
        method: "DELETE"
    });

    alert("Registration Deleted!");

    loadRegistrations();

}

function searchRegistrations() {

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = registrationsData.filter(registration =>
        registration.name.toLowerCase().includes(search)
    );

    displayRegistrations(filtered);

}

loadRegistrations();