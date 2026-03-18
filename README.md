Quantum-Safe Password Manager
A client-side password manager using real AES-GCM encryption with PBKDF2 key derivation — no backend, no server, no database. Runs entirely in the browser and deploys directly to GitHub Pages.
🔗 Live Demo: chaitanyagarware.github.io/quantum-password-manager

Screenshots
Show Image
Show Image
Show Image

Features

AES-GCM 256-bit Encryption — Every password is encrypted using the Web Crypto API with AES-GCM, a standard symmetric cipher used in TLS and modern secure systems.
PBKDF2 Key Derivation — Master passwords are never stored. Instead, they're run through PBKDF2 (200,000 iterations, SHA-256) to derive an encryption key, making brute-force attacks computationally expensive.
Zero Backend — No server, no database, no API calls. All data lives in the browser via localStorage.
Per-Entry Encryption — Each password entry is independently encrypted with its own random IV (initialization vector), so identical passwords produce different ciphertexts.
Client-Side Auth — User registration and login use PBKDF2-hashed credentials stored locally.
Password Strength Meter — Real-time visual feedback while entering passwords.
Auto-Hide on Reveal — Decrypted passwords are hidden again after 10 seconds.
Clipboard Copy — Decrypted password is automatically copied to clipboard on reveal.
Fully Responsive — Works on desktop and mobile.


Encryption Architecture
Master Password
      │
      ▼
 PBKDF2 (200k iterations, SHA-256)
      │
      ▼
 AES-GCM 256-bit Key
      │
      ▼
 Encrypt(plaintext password + random IV)
      │
      ▼
 Base64-encoded ciphertext → stored in localStorage
The encryption key is derived fresh each time from the master password — it is never stored anywhere. Without the correct master password, the ciphertext cannot be decrypted.

Tech Stack
LayerTechnologyEncryptionWeb Crypto API (AES-GCM, PBKDF2)FrontendHTML, CSS, Vanilla JavaScriptStorageBrowser localStorageHostingGitHub Pages
No npm. No build step. No dependencies.

Getting Started
Since this is a fully static app, there's nothing to install or run locally.
Run locally:
Just open index.html in any modern browser. That's it.
Deploy to GitHub Pages:

Fork or clone this repo
Go to repo Settings → Pages
Set source to main branch, / (root)
Hit Save — live in ~60 seconds at https://<your-username>.github.io/quantum-password-manager


Usage
Register
Enter a username and password on the login screen. Your credentials are hashed with PBKDF2 and stored locally — nothing is transmitted anywhere.
Add a Password
Fill in the website, username, password, and your master password. Click "Encrypt & Save". The entry is encrypted with AES-GCM before being stored.
Reveal a Password
Click "Reveal" on any password card, enter your master password, and the plaintext is decrypted client-side. It auto-copies to your clipboard and hides itself after 10 seconds.
Delete a Password
Click "Delete" on any card to permanently remove it from the vault.

Important Notes

This is a portfolio/demonstration project. Passwords are stored in localStorage, which is scoped to the browser and device. Clearing browser data will delete your vault. Do not use this as your primary password manager for sensitive accounts.

The project demonstrates practical application of post-quantum-safe cryptographic primitives (AES-GCM is quantum-resistant for symmetric encryption) and client-side security design — no trusted third party ever handles your data.

Project Structure
quantum-password-manager/
├── index.html        # Entire application (self-contained)
├── Screenshot1.png
├── Screenshot2.png
├── Screenshot3.png
└── README.md

Contributing
Feel free to fork, improve, and open a pull request. For major changes, open an issue first to discuss the idea.

License
MIT License — see LICENSE for details.

Built by Chaitanya Garware · MS Cybersecurity, UAB
