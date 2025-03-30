document.getElementById('postForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const responseDiv = document.getElementById('response');

    // Validate fields
    if (title === '' || body === '') {
        alert('Both fields are required.');
        return;
    }

    const postData = { title, body, userId: 1 };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        // Display response
        responseDiv.innerHTML = `
            <p><strong>Post ID:</strong> ${data.id}</p>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Body:</strong> ${data.body}</p>
        `;

        // Clear form fields
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';

    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = `<p style="color: red;">Failed to create post. Please try again.</p>`;
    }
});
