import { registerUser } from "./register";
import { loginUser } from "./login";
import { getUserInfo, displayUserInfo } from "./my-pages";

//Variables
const registerEl = document.getElementById("register");
const firstnameEl = document.getElementById("firstname");
const lastnameEl = document.getElementById("lastname");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const loginEl = document.getElementById("login");
const userNameLoginEl = document.getElementById("userNameLogin");
const passWordLoginEl = document.getElementById("passWordLogin");
const errMessageRegEl = document.getElementById("errMessageReg");

if (window.location.pathname === "/") {
  registerEl.addEventListener("click", function () {
    event.preventDefault();
    const firstnameValue = firstnameEl.value;
    const lastnameValue = lastnameEl.value;
    const usernameValue = usernameEl.value;
    const passwordValue = passwordEl.value;

    //Unvalid input
    if (
      firstnameValue === "" ||
      lastnameValue === "" ||
      usernameValue === "" ||
      passwordValue === ""
    ) {
      errMessageRegEl.textContent = "Alla fält måste fyllas i.";
    }
    //If input is valid
    registerUser(firstnameValue, lastnameValue, usernameValue, passwordValue);
  });

  loginEl.addEventListener("click", async function () {
    event.preventDefault();
    const userNameLoginValue = userNameLoginEl.value;
    const passWordLoginValue = passWordLoginEl.value;

    const authorized = await loginUser(userNameLoginValue, passWordLoginValue);

    //Authorization control
    if (authorized) {
      try {
        const token = localStorage.getItem("token");
        const userInfo = await getUserInfo(token);
        displayUserInfo(userInfo);
      } catch (error) {
        console.error("Could not find user information...");
      }
    }
  });
}
