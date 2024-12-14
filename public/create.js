// create.js

document.addEventListener("DOMContentLoaded", () => {
  const createUserForm = document.getElementById("createUserForm");

  createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = parseInt(document.getElementById("age").value.trim());

    if (!name || !email || !age) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        createUserForm.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user.");
    }
  });
});
