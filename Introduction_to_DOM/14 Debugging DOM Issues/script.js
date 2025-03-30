const para = document.getElementById('message'); // Fixed incorrect id
const textButton = document.getElementById('textButton'); // Fixed incorrect method

textButton.addEventListener('click', () => { // Fixed incorrect method name
  para.textContent = 'New Message'; // Fixed incorrect property
});

const box = document.getElementById('box');
const colorButton = document.getElementById('colorButton');

colorButton.addEventListener('click', () => {
  box.style.backgroundColor = 'blue'; // Fixed typo in 'style'
});
