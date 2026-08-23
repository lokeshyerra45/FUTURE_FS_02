let followups = [];

document.addEventListener("DOMContentLoaded", () => {
    if (!requireLogin()) {
        return;
    }

    const followupForm = document.getElementById("followupForm");
    const searchInput = document.getElementById("search");
    const refreshButton = document.getElementById("refreshFollowups");

    followupForm.addEventListener("submit", addFollowup);
    searchInput.addEventListener("input", render);
    refreshButton.addEventListener("click", loadFollowups);

    loadFollowups();
});

async function loadFollowups() {
    try {
        const data = await api("/followups");

        followups = Array.isArray(data) ? data : [];

        render();

    } catch (error) {
        console.error("Error loading follow-ups:", error);

        showToast(
            "Could not load follow-ups. Is Spring Boot running?",
            "error"
        );
    }
}

function render() {
    const searchInput = document.getElementById("search");
    const followupCount = document.getElementById("followupCount");
    const followupTableBody =
        document.getElementById("followupTableBody");

    const searchValue = searchInput.value.toLowerCase();

    const rows = followups.filter((followup) => {
        return (
            String(followup.leadId ?? "").includes(searchValue) ||
            String(followup.notes ?? "")
                .toLowerCase()
                .includes(searchValue)
        );
    });

    followupCount.textContent =
        `${rows.length} follow-up${rows.length === 1 ? "" : "s"}`;

    followupTableBody.innerHTML =
        rows.map((followup) => `
            <tr>
                <td>${escapeHtml(followup.followupId)}</td>
                <td>${escapeHtml(followup.leadId)}</td>
                <td>${escapeHtml(followup.followupDate)}</td>
                <td>${escapeHtml(followup.notes)}</td>
                <td>
                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteFollowup(${followup.followupId})">
                        Delete
                    </button>
                </td>
            </tr>
        `).join("") ||
        `
            <tr>
                <td colspan="5" class="empty">
                    No follow-ups scheduled.
                </td>
            </tr>
        `;
}

async function addFollowup(event) {
    event.preventDefault();

    const saveButton = document.getElementById("saveFollowup");

    const leadIdInput = document.getElementById("leadId");
    const followupDateInput =
        document.getElementById("followupDate");
    const notesInput = document.getElementById("notes");

    const leadId = leadIdInput.value;
    const followupDate = followupDateInput.value;
    const notes = notesInput.value;

    if (!leadId) {
        showToast("Please enter a lead ID.", "error");
        return;
    }

    if (!followupDate) {
        showToast("Please select a follow-up date.", "error");
        return;
    }

    const payload = {
        leadId: Number(leadId),
        followupDate: followupDate,
        notes: notes
    };

    setLoading(saveButton, true);

    try {
        await api("/followups", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        showToast("Follow-up scheduled");

        event.target.reset();

        await loadFollowups();

    } catch (error) {
        console.error("Error creating follow-up:", error);

        showToast(
            error.message || "Unable to schedule follow-up.",
            "error"
        );

    } finally {
        setLoading(saveButton, false);
    }
}

async function deleteFollowup(id) {
    if (!confirm("Delete this follow-up?")) {
        return;
    }

    try {
        await api(`/followups/${id}`, {
            method: "DELETE"
        });

        showToast("Follow-up deleted");

        await loadFollowups();

    } catch (error) {
        console.error("Error deleting follow-up:", error);

        showToast(
            error.message || "Unable to delete follow-up.",
            "error"
        );
    }
}