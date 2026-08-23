let customers = [];

document.addEventListener("DOMContentLoaded", () => {
    if (!requireLogin()) {
        return;
    }

    const customerForm = document.getElementById("customerForm");
    const searchInput = document.getElementById("search");
    const refreshButton =
        document.getElementById("refreshCustomers");

    customerForm.addEventListener("submit", addCustomer);
    searchInput.addEventListener("input", render);
    refreshButton.addEventListener("click", loadCustomers);

    loadCustomers();
});

async function loadCustomers() {
    try {
        const data = await api("/customers");

        customers = Array.isArray(data) ? data : [];

        render();

    } catch (error) {
        console.error("Error loading customers:", error);

        showToast(
            "Could not load customers. Is Spring Boot running?",
            "error"
        );
    }
}

function render() {
    const searchInput = document.getElementById("search");
    const customerCount =
        document.getElementById("customerCount");
    const customerTableBody =
        document.getElementById("customerTableBody");

    const searchValue = searchInput.value.toLowerCase();

    const rows = customers.filter((customer) => {
        return [
            customer.name,
            customer.email,
            customer.phone,
            customer.address
        ].some((value) =>
            String(value ?? "")
                .toLowerCase()
                .includes(searchValue)
        );
    });

    customerCount.textContent =
        `${rows.length} customer${rows.length === 1 ? "" : "s"}`;

    customerTableBody.innerHTML =
        rows.map((customer) => `
            <tr>
                <td>${escapeHtml(customer.customerId)}</td>

                <td>
                    <strong>
                        ${escapeHtml(customer.name)}
                    </strong>
                </td>

                <td>${escapeHtml(customer.email)}</td>

                <td>${escapeHtml(customer.phone)}</td>

                <td>${escapeHtml(customer.address)}</td>

                <td>
                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteCustomer(${customer.customerId})">
                        Delete
                    </button>
                </td>
            </tr>
        `).join("") ||
        `
            <tr>
                <td colspan="6" class="empty">
                    No customers found.
                </td>
            </tr>
        `;
}

async function addCustomer(event) {
    event.preventDefault();

    const saveButton =
        document.getElementById("saveCustomer");

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const phoneInput =
        document.getElementById("phone");

    const addressInput =
        document.getElementById("address");

    const payload = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value
    };

    setLoading(saveButton, true);

    try {
        await api("/customers", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        showToast("Customer created successfully");

        event.target.reset();

        await loadCustomers();

    } catch (error) {
        console.error("Error creating customer:", error);

        showToast(
            error.message || "Unable to create customer.",
            "error"
        );

    } finally {
        setLoading(saveButton, false);
    }
}

async function deleteCustomer(id) {
    if (!confirm("Delete this customer?")) {
        return;
    }

    try {
        await api(`/customers/${id}`, {
            method: "DELETE"
        });

        showToast("Customer deleted");

        await loadCustomers();

    } catch (error) {
        console.error("Error deleting customer:", error);

        showToast(
            error.message || "Unable to delete customer.",
            "error"
        );
    }
}