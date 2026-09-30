import { fetchUsers } from "./api.js";

const loadBtn = document.getElementById("loadBtn");
const usersDiv = document.getElementById("users");
const searchInput = document.getElementById("search");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

let users = [];

loadBtn.addEventListener("click", loadUsers);

searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(text)
    );

    displayUsers(filteredUsers);
});

async function loadUsers() {

    loading.style.display = "block";
    error.textContent = "";
    usersDiv.innerHTML = "";

    try {

        const cachedUsers = localStorage.getItem("users");

        if (cachedUsers) {
            users = JSON.parse(cachedUsers);
        } else {
            users = await fetchUsers();
            localStorage.setItem("users", JSON.stringify(users));
        }

        displayUsers(users);

    } catch (err) {

        error.textContent = "Unable to load users.";

    } finally {

        loading.style.display = "none";

    }

}

function displayUsers(list) {

    usersDiv.innerHTML = "";

    list.forEach(user => {

        usersDiv.innerHTML += `
            <div class="card">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            </div>
        `;

    });

}