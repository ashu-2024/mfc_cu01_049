document.addEventListener("DOMContentLoaded", function () {
    const themeSelector = document.getElementById("themeSelector");
    
    // Load theme from sessionStorage if available
    const savedTheme = sessionStorage.getItem("selectedTheme") || "light";
    document.body.className = savedTheme;
    themeSelector.value = savedTheme;

    // Change theme dynamically when dropdown changes
    themeSelector.addEventListener("change", function () {
        const selectedTheme = themeSelector.value;
        document.body.className = selectedTheme;
        sessionStorage.setItem("selectedTheme", selectedTheme);
    });
});
