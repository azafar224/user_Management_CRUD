// update.js

document.addEventListener("DOMContentLoaded", () => {
  const updateUserForm = document.getElementById("updateUserForm");

  updateUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = parseInt(document.getElementById("age").value.trim());

    if (!id || !name || !email || !age) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        updateUserForm.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  });
});
