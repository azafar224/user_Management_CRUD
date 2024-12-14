// delete.js

document.addEventListener("DOMContentLoaded", () => {
  const deleteUserForm = document.getElementById("deleteUserForm");

  deleteUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value.trim();

    if (!id) {
      alert("Please enter the User ID.");
      return;
    }

    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/users/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        deleteUserForm.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  });
});
