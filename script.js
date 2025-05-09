// Simulated Kyber post-quantum crypto
class QuantumSafeCrypto {
    constructor(masterPassword) {
        this.masterKey = this.deriveKey(masterPassword);
    }

    deriveKey(password) {
        return btoa(password);
    }

    decrypt(encryptedData) {
        try {
            const decoded = atob(encryptedData);
            return decoded.replace(this.masterKey, '');
        } catch (e) {
            return null;
        }
    }
}

let token = null;
let selectedPasswordId = null;
let loggedInUsername = null;
let passwords = []; // Global array to store passwords

// Register
async function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        alert('Registration successful! Please login.');
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// Login
async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        token = data.token;
        loggedInUsername = username;
        document.getElementById('auth').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('username-display').textContent = username;
        document.getElementById('profile-letter').textContent = username.charAt(0).toUpperCase();
        displayPasswords();
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// Toggle profile dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
}

// Logout
function logout() {
    token = null;
    loggedInUsername = null;
    passwords = [];
    document.getElementById('auth').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('passwordGrid').innerHTML = '';
    document.getElementById('username-display').textContent = '';
    document.getElementById('profile-letter').textContent = '';
    document.getElementById('profile-dropdown').classList.add('hidden');
}

// Add password
async function addPassword() {
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const masterPassword = document.getElementById('masterPassword').value;

    if (!website || !username || !password || !masterPassword) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/passwords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ website, username, password, masterPassword })
        });
        if (!response.ok) throw new Error('Failed to add password');
        document.getElementById('website').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('masterPassword').value = '';
        displayPasswords();
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// Display passwords
async function displayPasswords() {
    try {
        const response = await fetch('http://localhost:3000/api/passwords', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        passwords = await response.json();
        if (!response.ok) throw new Error(passwords.error);
        const passwordGrid = document.getElementById('passwordGrid');
        passwordGrid.innerHTML = '';

        passwords.forEach((entry, index) => {
            const div = document.createElement('div');
            div.className = 'password-card';
            div.innerHTML = `
                <div onclick="openModal(${entry.id})">
                    <span class="card-icon">${String.fromCharCode(65 + (index % 26))}</span>
                    <strong>${entry.website}</strong><br>
                    <span>Username: ${entry.username}</span>
                    <div class="encrypted-password">${entry.encrypted_password}</div>
                </div>
                <button class="delete-btn" onclick="deletePassword(${entry.id})"></button>
            `;
            passwordGrid.appendChild(div);
        });
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// Delete password
async function deletePassword(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/passwords/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to delete password');
        displayPasswords();
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// Open modal
function openModal(id) {
    selectedPasswordId = id;
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modalMasterPassword').value = '';
    const card = document.querySelector(`.password-card:nth-child(${passwords.findIndex(p => p.id === id) + 1}) .encrypted-password`);
    card.classList.add('visible');
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    selectedPasswordId = null;
    const cards = document.querySelectorAll('.password-card .encrypted-password');
    cards.forEach(card => card.classList.remove('visible', 'decrypted'));
}

// Reveal password
async function revealPassword() {
    const masterPassword = document.getElementById('modalMasterPassword').value;
    if (!masterPassword) {
        alert('Please enter master password.');
        return;
    }

    try {
        const entry = passwords.find(p => p.id === selectedPasswordId);
        if (!entry) throw new Error('Password not found');

        const crypto = new QuantumSafeCrypto(masterPassword);
        const decryptedPassword = crypto.decrypt(entry.encrypted_password);
        if (!decryptedPassword) {
            alert('Invalid master password.');
            return;
        }

        const card = document.querySelector(`.password-card:nth-child(${passwords.findIndex(p => p.id === selectedPasswordId) + 1}) .encrypted-password`);
        card.textContent = decryptedPassword;
        card.classList.remove('encrypted-password');
        card.classList.add('decrypted-password');
        closeModal();
    } catch (err) {
        alert('Error: ' + err.message);
    }
}