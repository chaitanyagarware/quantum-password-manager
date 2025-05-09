const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const JWT_SECRET = 'your_jwt_secret'; // Replace with secure key in production

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MySQL connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'password_manager'
});

// Simulated Kyber post-quantum crypto (placeholder)
class QuantumSafeCrypto {
    constructor(masterPassword) {
        this.masterKey = this.deriveKey(masterPassword);
    }

    deriveKey(password) {
        return Buffer.from(password).toString('base64');
    }

    encrypt(data) {
        return Buffer.from(data + this.masterKey).toString('base64');
    }

    decrypt(encryptedData) {
        try {
            const decoded = Buffer.from(encryptedData, 'base64').toString();
            return decoded.replace(this.masterKey, '');
        } catch (e) {
            return null;
        }
    }
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Register user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Add password
app.post('/api/passwords', authenticate, async (req, res) => {
    const { website, username, password, masterPassword } = req.body;
    if (!website || !username || !password || !masterPassword) {
        return res.status(400).json({ error: 'All fields required' });
    }

    const crypto = new QuantumSafeCrypto(masterPassword);
    const encryptedPassword = crypto.encrypt(password);

    try {
        const [result] = await pool.query(
            'INSERT INTO passwords (user_id, website, username, encrypted_password) VALUES (?, ?, ?, ?)',
            [req.userId, website, username, encryptedPassword]
        );
        res.status(201).json({ id: result.insertId, website, username, encryptedPassword });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get passwords
app.get('/api/passwords', authenticate, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM passwords WHERE user_id = ?', [req.userId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete password
app.delete('/api/passwords/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM passwords WHERE id = ? AND user_id = ?', [id, req.userId]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});