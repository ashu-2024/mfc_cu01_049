const item2 = document.getElementById("item2");

item2.addEventListener("click", () => {
    alert(item2.parentNode.textContent.trim());
    
    if (item2.previousElementSibling) {
        console.log("Previous Sibling:", item2.previousElementSibling.textContent);
    }

    if (item2.nextElementSibling) {
        console.log("Next Sibling:", item2.nextElementSibling.textContent);
    }
});
