const btn = document.getElementById('btn');
const apiurl = 'https://192.168.178.20:3000';
async function checkAuthentication() {
    try {
        const response = await fetch(apiurl + '/auth');
        const data = await response.json();
        if (data.authenticated) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
}

// Usage example
checkAuthentication().then((authenticated) => {
    if (authenticated) {
        btn.innerHTML = `
        <button id="navbutton" class="btn btn-primary  shadow" data-bs-toggle="offcanvas" type="button" title="Comming Soon" data-bs-target="#offcanvas-menu" >Dashbaord</button>
        `;
    } else {
        btn.innerHTML = `
        <button id="navbutton" class="btn btn-primary  shadow ms-auto" data-bs-toggle="modal" type="button" title="Comming Soon" data-bs-target="#modal-1">Anmelden</button>
        <button id="navbutton" class="btn btn-primary  shadow ms-auto" data-bs-toggle="modal" type="button" title="Comming Soon" data-bs-target="#modal-2">Account erstellen</button>
        `;
    }
});