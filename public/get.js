// get.js

document.addEventListener("DOMContentLoaded", () => {
  const usersTableBody = document.getElementById("usersTableBody");

  // Fetch and display users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/users/get");
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const users = await response.json();
      usersTableBody.innerHTML = "";
      users.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
        `;
        usersTableBody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users.");
    }
  };

  fetchUsers();
});
