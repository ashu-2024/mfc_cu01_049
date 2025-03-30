const addButton = document.getElementById("addParagraph");
const removeButton = document.getElementById("removeParagraph");
const container = document.getElementById("container");

addButton.addEventListener("click", () => {
    const para = document.createElement("p");
    para.textContent = "This is a new paragraph.";
    container.appendChild(para);
});

removeButton.addEventListener("click", () => {
    const lastParagraph = container.lastElementChild;
    if (lastParagraph) {
        container.removeChild(lastParagraph);
    }
});
