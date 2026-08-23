document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginBtn = document.getElementById("loginBtn");
    const errorMessage = document.getElementById("errorMessage");

    togglePassword.addEventListener("change", () => {
        passwordInput.type = togglePassword.checked
            ? "text"
            : "password";
    });

    loginForm.addEventListener("submit", login);
    
    async function login(e) {
        e.preventDefault();

        errorMessage.textContent = "";
        setLoading(loginBtn, true);

        try {
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email) {
                throw new Error("Please enter your email.");
            }

            if (!password) {
                throw new Error("Please enter your password.");
            }

            const user = await api("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!user) {
                throw new Error("Invalid email or password.");
            }

            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            showToast("Signed in successfully");

            setTimeout(() => {
                location.href = "dashboard.html";
            }, 300);

        } catch (err) {
            errorMessage.textContent =
                err.message || "Unable to sign in.";

            showToast("Sign in failed", "error");

        } finally {
            setLoading(loginBtn, false);
        }
    }
});