# Quantum-Safe Password Manager

A secure password manager using quantum-safe encryption.

Quantum-Safe Password Manager
A secure password manager application that leverages quantum-safe encryption to protect your passwords. Built with a modern UI, this app allows users to register, log in, store, and manage passwords securely.
Features

Quantum-Safe Encryption: Uses simulated Kyber post-quantum cryptography for encrypting passwords.
User Authentication: Register and log in securely with username and password.
Password Management:
Add new passwords with website, username, and password details.
View encrypted passwords in a grid layout.
Reveal decrypted passwords using a master password.
Delete passwords securely.


Responsive UI: Split layout with a password grid on the left and an "Add Password" form on the right, optimized for both desktop and mobile.
User-Friendly Design:
Welcome message with tagline: "Welcome, ! Securely manage your passwords with quantum-safe encryption."
Profile dropdown with logout functionality.
Modal for entering master password to reveal decrypted passwords.



Screenshots
Below are some screenshots of the application:
Login screen for user authentication.
Dashboard showing the password grid and add password form.
Note: Replace screenshot1.png and screenshot2.png with the actual filenames of your screenshots if different.
Prerequisites

Node.js: Ensure you have Node.js installed (download from nodejs.org).
SQLite: The app uses SQLite for the database (no additional installation required as it’s bundled with Node.js).
Git: For version control and uploading to GitHub (download from git-scm.com).

Setup Instructions

Clone the Repository:
git clone https://github.com/chaitanyagarware/quantum-password-manager.git
cd quantum-password-manager


Install Dependencies:Install the required Node.js packages:
npm install


Set Up the Database:Run the SQL script to create the database and tables:

The setup.sql file is already included in the repository.
SQLite will automatically create the database file (passwords.db) when the app runs.


Run the Application:Start the backend server:
node server.js


The server will run at http://localhost:3000.


Access the App:

Open your browser and navigate to http://localhost:3000.
Register a new user or log in with existing credentials.



Usage

Register:

On the login screen, enter a username and password to register.
After successful registration, log in with the same credentials.


Add a Password:

On the dashboard, use the "Add Password" form on the right.
Enter the website, username, password, and master password.
Click "Add Password" to save it securely.


View Passwords:

The password grid on the left displays your saved passwords.
Each card shows the website, username, and encrypted password.


Reveal a Password:

Click on a password card to reveal the decrypted password.
Enter your master password in the modal and click "Reveal".


Delete a Password:

Click the "✕" button on a password card to delete it.



Project Structure

server.js: Backend server using Express.js and SQLite.
setup.sql: SQL script to set up the database and tables.
public/: Frontend files.
index.html: Main HTML file for the UI.
styles.css: CSS styles for the app.
script.js: JavaScript for frontend functionality.



Technologies Used

Backend: Node.js, Express.js, SQLite.
Frontend: HTML, CSS, JavaScript.
Encryption: Simulated Kyber post-quantum cryptography (base64 encoding for demonstration).

Troubleshooting

Server Not Running: Ensure Node.js is installed and run node server.js in the project directory.
Styles Not Loading: Clear browser cache (DevTools > Network > Disable cache, refresh) or verify styles.css is in the public folder.
Database Issues: Delete passwords.db and restart the server to recreate the database.
Console Errors: Check the browser console (Inspect > Console) for errors and share them if needed.

Contributing
Feel free to fork this repository, make improvements, and submit pull requests. For major changes, please open an issue to discuss your ideas.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Note: If you don’t have a LICENSE file, you can create one by adding a file named LICENSE with the MIT License text or choose another license.


# Quantum-Safe Password Manager

A secure password manager using quantum-safe encryption.

## Screenshots
![Login Screen](screenshots/Screenshot1.png)
![Dashboard](screenshots/Screenshot2.png)

![Dashboard](screenshots/Screenshot3.png)

