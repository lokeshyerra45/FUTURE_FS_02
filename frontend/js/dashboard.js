document.addEventListener("DOMContentLoaded", async () => {
    const user = requireLogin();

    if (!user) {
        return;
    }

    const pageUser = document.getElementById("pageUser");

    if (pageUser) {
        pageUser.textContent = `${user.name} · ${user.role}`;
    }

    // Load dashboard statistics
    try {
        const data = await api("/dashboard");

        const totalLeads = document.getElementById("totalLeads");
        const newLeads = document.getElementById("newLeads");
        const convertedLeads =
            document.getElementById("convertedLeads");
        const totalCustomers =
            document.getElementById("totalCustomers");

        if (totalLeads) {
            totalLeads.textContent = data.totalLeads ?? 0;
        }

        if (newLeads) {
            newLeads.textContent = data.newLeads ?? 0;
        }

        if (convertedLeads) {
            convertedLeads.textContent = data.convertedLeads ?? 0;
        }

        if (totalCustomers) {
            totalCustomers.textContent = data.totalCustomers ?? 0;
        }

        const total = Number(data.totalLeads ?? 0);

        const statistics = [
            ["new", data.newLeads],
            ["contacted", data.contactedLeads],
            ["followup", data.pendingLeads],
            ["converted", data.convertedLeads]
        ];

        statistics.forEach(([name, value]) => {
            const count = Number(value ?? 0);

            const percentage = total > 0
                ? Math.round((count / total) * 100)
                : 0;

            const percentageElement =
                document.getElementById(`${name}Pct`);

            const barElement =
                document.getElementById(`${name}Bar`);

            if (percentageElement) {
                percentageElement.textContent = `${percentage}%`;
            }

            if (barElement) {
                barElement.style.width = `${percentage}%`;
            }
        });

    } catch (error) {
        console.error("Dashboard data error:", error);

        showToast(
            "Unable to load dashboard data. Is Spring Boot running?",
            "error"
        );
    }

    // Load recent leads
    try {
        const leads = await api("/leads");

        const leadTableBody =
            document.getElementById("leadTableBody");

        if (!leadTableBody) {
            return;
        }

        const recentLeads = Array.isArray(leads)
            ? leads.slice(-6).reverse()
            : [];

        leadTableBody.innerHTML =
            recentLeads.map((lead) => `
                <tr>
                    <td>${escapeHtml(lead.customerName)}</td>
                    <td>${escapeHtml(lead.email)}</td>
                    <td>${escapeHtml(lead.phone)}</td>
                    <td>${escapeHtml(lead.source)}</td>
                    <td>${statusBadge(lead.status)}</td>
                </tr>
            `).join("") ||
            `
                <tr>
                    <td colspan="5" class="empty">
                        No leads yet. Add your first lead.
                    </td>
                </tr>
            `;

    } catch (error) {
        console.error("Recent leads error:", error);

        const leadTableBody =
            document.getElementById("leadTableBody");

        if (leadTableBody) {
            leadTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty">
                        Could not load leads.
                    </td>
                </tr>
            `;
        }
    }
});