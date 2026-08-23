document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const roleInput = document.getElementById("role");
    const signupBtn = document.getElementById("signupBtn");
    const errorMessage = document.getElementById("errorMessage");

    signupForm.addEventListener("submit", registerUser);

    async function registerUser(e) {
        e.preventDefault();

        errorMessage.textContent = "";
        setLoading(signupBtn, true);

        try {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const role = roleInput.value;

            if (!name) {
                throw new Error("Please enter your full name.");
            }

            if (!email) {
                throw new Error("Please enter your email.");
            }

            if (!password) {
                throw new Error("Please enter a password.");
            }

            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters.");
            }

            if (!role) {
                throw new Error("Please select a role.");
            }

            await api("/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                })
            });

            showToast("Account created successfully");

            setTimeout(() => {
                location.href = "login.html";
            }, 500);

        } catch (err) {
            errorMessage.textContent =
                err.message || "Registration failed.";

            showToast("Registration failed", "error");

        } finally {
            setLoading(signupBtn, false);
        }
    }
});