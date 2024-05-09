const params = new URLSearchParams(window.location.search);
const user = params.get("username");

if (window.location.pathname.includes("/my-pages")) {
  document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    //If not authorized - send back to start page
    if (!token) {
      window.location.href = "index.html";
      return;
    }

    try {
      const userInfo = await getUserInfo(token);
      displayUserInfo(userInfo.find((e) => e.username === user));
    } catch (error) {
      console.error("Could not find user information:", error.message);
    }
  });
}

//Get user information
export async function getUserInfo(token) {
  const url = "http://localhost:3000/api/users";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw new Error("Could not find user information.");
  }

  return response.json();
}

//Display user information
export function displayUserInfo(userInfo) {
  const personalInfoEl = document.getElementById("personal-info");
  if (!personalInfoEl) {
    console.error("Could not find personal info.");
    return;
  }
  //Display personal information in DOM
  personalInfoEl.innerHTML = `
        <h2>Din information:</h2>
        <p><b>Förnamn:</b> ${userInfo.firstname}</p>
        <p><b>Efternamn:</b> ${userInfo.lastname}</p>
        <p><b>Användarnamn:</b> ${userInfo.username}</p>
        <br>
        <p class="created">Ditt konto skapades ${userInfo.created}</p>
      `;
}
