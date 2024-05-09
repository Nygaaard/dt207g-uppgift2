export async function loginUser(username, password) {
  try {
    // If input is missing
    if (!username || !password) {
      const errMessageLogEl = document.getElementById("errMessageLog");
      if (!username) {
        errMessageLogEl.textContent = "Fyll i användarnamnet";
      } else {
        errMessageLogEl.textContent = "Fyll i lösenordet";
      }
      throw new Error("Alla fält måste fyllas i.");
    }

    const url = "http://localhost:3000/api/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // If wrong username/password
    if (!response.ok) {
      const errMessageLogEl = document.getElementById("errMessageLog");
      errMessageLogEl.textContent = "Fel användarnamn eller lösenord";
      throw new Error("Kunde inte logga in användare.");
    }

    // Return result
    const data = await response.json();
    const token = data.response.token;

    const validate = await validateUser(token);

    //Validate authorization
    if (validate.message === "Protected route") {
      alert("Du är inloggad!");

      window.location.href = `my-pages?username=${username}`;
    }
  } catch (error) {
    console.error("Fel vid inloggning:", error.message);
    throw error;
  }
}

export async function validateUser(token) {
  const url = "http://localhost:3000/api/secret";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Inloggningen misslyckades");
      }
      localStorage.setItem("token", token);

      return response;
    })
    .catch((error) => {
      console.error("Fel vid inloggning:", error.message);
    });
  return response.json();
}
