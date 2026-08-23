document.addEventListener("DOMContentLoaded", async () => {
    const user = requireLogin();

    if (!user) {
        return;
    }

    if (user.role !== "ADMIN") {
        showToast("Reports are available to administrators only.", "error");

        setTimeout(() => {
            location.href = "dashboard.html";
        }, 600);

        return;
    }

    const conversionRate = document.getElementById("conversionRate");
    const conversionBar = document.getElementById("conversionBar");

    try {
        const data = await api("/reports/summary");

        Object.keys(data).forEach((key) => {
            const element = document.getElementById(key);

            if (element) {
                element.textContent = data[key] ?? 0;
            }
        });

        const totalLeads = Number(data.totalLeads || 0);
        const convertedLeads = Number(data.convertedLeads || 0);

        const rate = totalLeads > 0
            ? Math.round((convertedLeads / totalLeads) * 100)
            : 0;

        if (conversionRate) {
            conversionRate.textContent = `${rate}%`;
        }

        if (conversionBar) {
            conversionBar.style.width = `${rate}%`;
        }

    } catch (error) {
        console.error("Reports loading error:", error);

        showToast("Unable to load reports.", "error");
    }
});