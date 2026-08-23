let allLeads = [];

document.addEventListener("DOMContentLoaded", async () => {
    if (!requireLogin()) {
        return;
    }

    const leadForm = document.getElementById("leadForm");
    const searchInput = document.getElementById("search");
    const statusFilter = document.getElementById("statusFilter");
    const refreshButton = document.getElementById("refreshLeads");

    leadForm.addEventListener("submit", addLead);
    searchInput.addEventListener("input", render);
    statusFilter.addEventListener("change", render);
    refreshButton.addEventListener("click", loadLeads);

    await loadLeads();
});

async function loadLeads() {
    try {
        const data = await api("/leads");

        allLeads = Array.isArray(data) ? data : [];

        render();
    } catch (error) {
        console.error("Error loading leads:", error);

        showToast(
            error.message || "Could not load leads.",
            "error"
        );
    }
}

function render() {
    const searchInput = document.getElementById("search");
    const statusFilter = document.getElementById("statusFilter");
    const leadCount = document.getElementById("leadCount");
    const leadTableBody = document.getElementById("leadTableBody");

    const searchValue = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;

    const rows = allLeads.filter((lead) => {
        const matchesStatus =
            !statusValue || lead.status === statusValue;

        const matchesSearch = [
            lead.customerName,
            lead.email,
            lead.phone,
            lead.source,
            lead.assignedTo
        ].some((value) =>
            String(value ?? "")
                .toLowerCase()
                .includes(searchValue)
        );

        return matchesStatus && matchesSearch;
    });

    leadCount.textContent =
        `${rows.length} lead${rows.length === 1 ? "" : "s"}`;

    leadTableBody.innerHTML =
        rows.map((lead) => `
            <tr>
                <td>${escapeHtml(lead.leadId)}</td>

                <td>
                    <strong>
                        ${escapeHtml(lead.customerName)}
                    </strong>
                </td>

                <td>${escapeHtml(lead.phone)}</td>

                <td>${escapeHtml(lead.email)}</td>

                <td>${escapeHtml(lead.source)}</td>

                <td>${statusBadge(lead.status)}</td>

                <td>
                    ${escapeHtml(lead.assignedTo || "Unassigned")}
                </td>

                <td>
                    <div class="table-actions">
                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteLead(${lead.leadId})">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join("") ||
        `
            <tr>
                <td colspan="8" class="empty">
                    No leads match your filters.
                </td>
            </tr>
        `;
}

async function addLead(event) {
    event.preventDefault();

    const saveButton =
        document.getElementById("saveLead");

    const customerName =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("phone").value;

    const email =
        document.getElementById("email").value;

    const source =
        document.getElementById("source").value;

    const status =
        document.getElementById("status").value;

    const assignedTo =
        document.getElementById("assignedTo").value;

    const payload = {
        customerName: customerName,
        phone: phone,
        email: email,
        source: source,
        status: status,
        assignedTo: assignedTo
    };

    setLoading(saveButton, true);

    try {
        await api("/leads", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        showToast("Lead created successfully");

        event.target.reset();

        await loadLeads();

    } catch (error) {
        console.error("Error creating lead:", error);

        showToast(
            error.message || "Unable to create lead.",
            "error"
        );
    } finally {
        setLoading(saveButton, false);
    }
}

async function deleteLead(id) {
    if (!confirm("Delete this lead? This action cannot be undone.")) {
        return;
    }

    try {
        await api(`/leads/${id}`, {
            method: "DELETE"
        });

        showToast("Lead deleted");

        await loadLeads();

    } catch (error) {
        console.error("Error deleting lead:", error);

        showToast(
            error.message || "Unable to delete lead.",
            "error"
        );
    }
}