document.addEventListener("DOMContentLoaded", function () {
    const noteArea = document.getElementById("noteArea");
    const saveBtn = document.getElementById("saveBtn");
    const loadBtn = document.getElementById("loadBtn");
    const clearBtn = document.getElementById("clearBtn");

    // Load saved notes on page load
    if (localStorage.getItem("userNotes")) {
        noteArea.value = localStorage.getItem("userNotes");
    }

    // Save Notes
    saveBtn.addEventListener("click", function () {
        const noteText = noteArea.value.trim();
        if (noteText === "") {
            alert("Cannot save an empty note.");
            return;
        }
        localStorage.setItem("userNotes", noteText);
        alert("Notes saved successfully!");
    });

    // Load Notes
    loadBtn.addEventListener("click", function () {
        const savedNotes = localStorage.getItem("userNotes");
        if (savedNotes) {
            noteArea.value = savedNotes;
        } else {
            alert("No saved notes found.");
        }
    });

    // Clear Notes
    clearBtn.addEventListener("click", function () {
        localStorage.removeItem("userNotes");
        noteArea.value = "";
        alert("Notes cleared!");
    });
});
