// Funktion för att registrera en ny användare
export async function registerUser(firstname, lastname, username, password) {
  try {
    // Validera inmatning
    if (!firstname || !lastname || !username || !password) {
      throw new Error("Alla fält måste fyllas i.");
    }

    if (username.length < 5) {
      throw new Error("Användarnamnet måste vara minst 5 tecken långt.");
    }

    if (password.length < 8) {
      throw new Error("Lösenordet måste vara minst 8 tecken långt.");
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

    // Kontrollera om registreringen lyckades
    if (!response.ok) {
      throw new Error("Kunde inte registrera ny användare.");
    }

    // Returnera resultatet
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
    console.error("Fel vid registrering av ny användare:", error.message);
    throw error;
  }
}
