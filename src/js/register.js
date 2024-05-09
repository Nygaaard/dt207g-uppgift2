// Register new user
export async function registerUser(firstname, lastname, username, password) {
  try {
    // Validate input
    if (!firstname || !lastname || !username || !password) {
      throw new Error("Alla fält måste fyllas i.");
    }

    if (username.length < 5) {
      const errMessageRegEl = document.getElementById("errMessageReg");
      errMessageRegEl.textContent =
        "Användarnamn måste vara minst 5 tecken långt.";
      throw new Error("Username must be at least 5 characters long.");
    }

    if (password.length < 8) {
      const errMessageRegEl = document.getElementById("errMessageReg");
      errMessageRegEl.textContent =
        "Lösenordet måste vara minst 8 tecken långt.";
      throw new Error("Password must be at least 8 characters long.");
    }

    const url = "http://localhost:3000/api/register";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        password,
      }),
    });

    // If register succeeded
    if (!response.ok) {
      throw new Error("Failed to register new user.");
    }

    // Return result
    const data = await response.json();
    alert("Du är nu registrerad!");
    const firstnameEl = document.getElementById("firstname");
    const lastnameEl = document.getElementById("lastname");
    const usernameEl = document.getElementById("username");
    const passwordEl = document.getElementById("password");

    firstnameEl.value = "";
    lastnameEl.value = "";
    usernameEl.value = "";
    passwordEl.value = "";

    return data;
  } catch (error) {
    console.error("Error register new user:", error.message);
    throw error;
  }
}
