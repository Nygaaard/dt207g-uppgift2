export async function loginUser(username, password) {
  try {
    // Validate input
    if (!username || !password) {
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

    // If register succeeds
    if (!response.ok) {
      throw new Error("Kunde inte logga in användare.");
    }

    // Return result
    const data = await response.json();
    const token = data.response.token;
    const validate = await validateUser(token);

    //Validate authorization
    if (validate.message === "Protected route") {
      alert("Du är inloggad!");
      window.location.href = "my-pages.html";
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
      // Här kan du lägga till kod för att hantera felaktig inloggning
    });
  return response.json();
}
