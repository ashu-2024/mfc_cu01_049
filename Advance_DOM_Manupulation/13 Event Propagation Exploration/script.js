function handleClick(event) {
    alert(`Clicked: ${this.id}`);
}

// Selecting all divs
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");
const innerButton = document.getElementById("innerButton");

// Adding event listeners for bubbling phase (default)
div1.addEventListener("click", handleClick);
div2.addEventListener("click", handleClick);
div3.addEventListener("click", handleClick);

// Adding event listeners for capturing phase
div1.addEventListener("click", handleClick, true);
div2.addEventListener("click", handleClick, true);
div3.addEventListener("click", handleClick, true);

// Adding event listener to the button to stop propagation
innerButton.addEventListener("click", (event) => {
    alert("Button clicked! Stopping propagation.");
    event.stopPropagation();
});
