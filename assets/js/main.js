const apiurl = 'http://192.168.178.20:3000/api';

// Function to update the button content based on authentication status
function updateButtonContent(authenticated) {
    const btn = document.getElementById('btn');

    if (authenticated) {
        btn.innerHTML = `
            <button id="navbutton" class="btn btn-primary shadow" data-bs-toggle="offcanvas" type="button" title="Comming Soon" data-bs-target="#offcanvas-menu" >Dashbaord</button>
        `;
    } else {
        btn.innerHTML = `
            <button id="navbutton" class="btn btn-primary shadow ms-auto" data-bs-toggle="modal" type="button" title="Comming Soon" data-bs-target="#modal-1">Anmelden</button>
            <button id="navbutton" class="btn btn-primary shadow ms-auto" data-bs-toggle="modal" type="button" title="Comming Soon" data-bs-target="#modal-2">Account erstellen</button>
        `;
    } 
}

// Function to check authentication status
async function checkAuthentication() {
    try {
        // Make the authentication check request
        const response = await fetch(apiurl +'/auth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${'Token'}`,
            },
        });

        // Check if the response status is 200 (OK)
        if (response.status === 200) {
            updateButtonContent(true);
        } else {
            updateButtonContent(false);
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
    }
}

// Call the checkAuthentication function initially
checkAuthentication();

// Call the checkAuthentication function every 5 seconds
setInterval(checkAuthentication, 5000);



/*
    Login
*/

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailOrUsername = document.getElementById('emailOrUsername').value;
    const password = document.getElementById('password').value;
    const body = { emailOrUsername, password };
    try {
        const response = await fetch(apiurl +'/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            // Save the received refresh token to local storage for future use (you might consider more secure storage methods)
            localStorage.setItem('refreshToken', data.refreshToken);

            console.log('Login successful');
        } else {
            console.error('Login failed');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
});
