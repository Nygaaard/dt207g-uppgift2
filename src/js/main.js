import { registerUser } from "./register";
import { loginUser, validateUser } from "./login";

console.log("test");

const registerEl = document.getElementById("register");
const firstnameEl = document.getElementById("firstname");
const lastnameEl = document.getElementById("lastname");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const loginEl = document.getElementById("login");
const userNameLoginEl = document.getElementById("userNameLogin");
const passWordLoginEl = document.getElementById("passWordLogin");
const errMessageRegEl = document.getElementById("errMessageReg");

registerEl.addEventListener("click", function () {
  event.preventDefault();
  const firstnameValue = firstnameEl.value;
  const lastnameValue = lastnameEl.value;
  const usernameValue = usernameEl.value;
  const passwordValue = passwordEl.value;

  if (
    firstnameValue === "" ||
    lastnameValue === "" ||
    usernameValue === "" ||
    passwordValue === ""
  ) {
    errMessageRegEl.textContent = "Alla fält måste fyllas i.";
  }

  registerUser(firstnameValue, lastnameValue, usernameValue, passwordValue);
});

loginEl.addEventListener("click", async function () {
  event.preventDefault();
  const userNameLoginValue = userNameLoginEl.value;
  const passWordLoginValue = passWordLoginEl.value;

  const authorized = await loginUser(userNameLoginValue, passWordLoginValue);
});
