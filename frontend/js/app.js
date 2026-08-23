const API_BASE = "http://localhost:8080/api";

function getCurrentUser() {
    try {
        const user = sessionStorage.getItem("currentUser");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        return null;
    }
}

function requireLogin() {
    const user = getCurrentUser();

    if (!user) {
        location.href = "login.html";
        return null;
    }

    const sidebarUserName =
        document.getElementById("sidebarUserName");

    const sidebarUserRole =
        document.getElementById("sidebarUserRole");

    const sidebarAvatar =
        document.getElementById("sidebarAvatar");

    if (sidebarUserName) {
        sidebarUserName.textContent = user.name || "User";
    }

    if (sidebarUserRole) {
        sidebarUserRole.textContent = user.role || "USER";
    }

    if (sidebarAvatar) {
        sidebarAvatar.textContent =
            (user.name || "U").charAt(0).toUpperCase();
    }

    document.querySelectorAll("[data-admin-only]").forEach((element) => {
        if (user.role !== "ADMIN") {
            element.remove();
        }
    });

    const currentPage =
        location.pathname.split("/").pop();

    document.querySelectorAll("[data-page]").forEach((element) => {
        if (element.dataset.page === currentPage) {
            element.classList.add("active");
        }
    });

    return user;
}

function logout() {
    sessionStorage.removeItem("currentUser");
    location.href = "login.html";
}

function showToast(message, type = "success") {
    const toast =
        document.getElementById("toast") || createToast();

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    clearTimeout(window.__toast);

    window.__toast = setTimeout(() => {
        toast.className = "toast";
    }, 2800);
}

function createToast() {
    const toast = document.createElement("div");

    toast.id = "toast";
    toast.className = "toast";

    document.body.appendChild(toast);

    return toast;
}

function escapeHtml(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character])
    );
}

async function api(path, options = {}) {
    const response = await fetch(
        API_BASE + path,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        }
    );

    const text = await response.text();

    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch (error) {
        data = text;
    }

    if (!response.ok) {
        const message =
            data?.message ||
            data?.error ||
            "Request failed. Please try again.";

        throw new Error(message);
    }

    return data;
}

function setLoading(button, loading) {
    if (!button) {
        return;
    }

    button.disabled = loading;

    if (loading) {
        button.dataset.oldText = button.textContent;
        button.textContent = "Saving...";
    } else {
        button.textContent =
            button.dataset.oldText || button.textContent;
    }
}

function statusBadge(status) {
    const safeStatus = escapeHtml(status || "NEW");

    return `
        <span class="badge ${safeStatus}">
            ${safeStatus}
        </span>
    `;
}