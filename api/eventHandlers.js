
// eventHandlers.js
import { login, register } from "./auth.js";
import { openModal } from "./modalHandler.js";

export function setupEventHandlers() {
  document.getElementById("openRegisterButton").addEventListener("click", () => {
    openModal("registerModal");
  });

  document.getElementById("loginButton").addEventListener("click", async () => {
    const phoneNumber = document.getElementById("login_phone_number").value.trim();
    const password = document.getElementById("login_password").value.trim();
    const loginError = document.getElementById("loginError");

    if (!phoneNumber || !password) {
      loginError.textContent = "Please fill in both fields.";
      return;
    }

    const { data, error } = await login(phoneNumber, password);
    loginError.textContent = error || data.length === 0 ? "Invalid login." : "";
    if (data.length > 0) alert(`Welcome back, ${data[0].first_name}!`);
  });

  document.getElementById("registerButton").addEventListener("click", async () => {
    const phoneNumber = document.getElementById("phone_number").value.trim();
    const password = document.getElementById("password").value.trim();
    const registerError = document.getElementById("registerError");

    if (!phoneNumber || !password) {
      registerError.textContent = "Please fill in all fields.";
      return;
    }

    const { error } = await register(phoneNumber, password);
    registerError.textContent = error ? "Registration failed." : "Account created!";
  });
}
