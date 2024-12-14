// cookies.js

document.addEventListener("DOMContentLoaded", () => {
  const setCookieForm = document.getElementById("setCookieForm");
  const getCookiesButton = document.getElementById("getCookiesButton");
  const cookiesDisplay = document.getElementById("cookiesDisplay");
  const clearCookieForm = document.getElementById("clearCookieForm");

  // Set Cookie
  setCookieForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("cookieName").value.trim();
    const value = document.getElementById("cookieValue").value.trim();
    const maxAgeInput = document.getElementById("cookieMaxAge").value.trim();
    const httpOnly = document.getElementById("cookieHttpOnly").checked;

    if (!name || !value) {
      alert("Cookie name and value are required.");
      return;
    }

    const options = {};
    if (maxAgeInput) options.maxAge = parseInt(maxAgeInput) * 1000; // Convert to milliseconds
    if (httpOnly) options.httpOnly = true;

    try {
      const response = await fetch("/cookies/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, value, options }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setCookieForm.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error setting cookie:", error);
      alert("An error occurred while setting the cookie.");
    }
  });

  // Get Cookies
  getCookiesButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/cookies/get");
      const result = await response.json();
      if (response.ok) {
        cookiesDisplay.textContent = JSON.stringify(result.cookies, null, 2);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error getting cookies:", error);
      alert("An error occurred while fetching cookies.");
    }
  });

  // Clear Cookie
  clearCookieForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("clearCookieName").value.trim();

    if (!name) {
      alert("Cookie name is required to clear a cookie.");
      return;
    }

    try {
      const response = await fetch("/cookies/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        clearCookieForm.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error clearing cookie:", error);
      alert("An error occurred while clearing the cookie.");
    }
  });
});
