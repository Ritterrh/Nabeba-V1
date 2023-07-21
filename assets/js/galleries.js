// client.js
const galleriesContainer = document.getElementById('galleriesContainer');
const galleryForm = document.getElementById('galleryForm');

// Function to render all galleries
async function fetchAndRenderGalleries() {
    try {
        const response = await fetch('/galleries');
        const galleries = await response.json();

        galleriesContainer.innerHTML = '';
        galleries.forEach((gallery) => {
            const galleryDiv = document.createElement('div');
            galleryDiv.innerHTML = `
                <h3>${gallery.title}</h3>
                <p>Tag: ${gallery.tag}</p>
                <img src="${gallery.frontIMG}" alt="${gallery.title}" style="max-width: 300px;">
            `;
            galleriesContainer.appendChild(galleryDiv);
        });
    } catch (error) {
        console.error('Error fetching galleries:', error);
    }
}

// Function to handle gallery creation form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(galleryForm);
    try {
        const response = await fetch('/galleries', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();

        console.log(data.message);
        galleryForm.reset();
        fetchAndRenderGalleries(); // Refresh the galleries after creation
    } catch (error) {
        console.error('Error creating gallery:', error);
    }
}

// Add event listener to the form submission
galleryForm.addEventListener('submit', handleFormSubmit);

// Fetch and render galleries on page load
fetchAndRenderGalleries();
