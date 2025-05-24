require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory user "database" (replace with real DB)
const users = [
  {
    id: '1',
    username: 'user1',
    email: 'user1@example.com',
    passwordHash: bcrypt.hashSync('password123', 10), // hashed password
  },
];

// Store refresh tokens here (for demo)
let refreshTokens = [];

// Helper to generate tokens
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ userId: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  refreshTokens.push(refreshToken);
  return refreshToken;
};

// Middleware to authenticate access token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // token expired or invalid
      return res.status(403).json({ message: 'Invalid or expired access token' });
    }
    req.user = user; // user info in token payload
    next();
  });
}

// Routes

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid username or password' });

  // Check password
  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({
    accessToken,
    refreshToken,
  });
});

// TOKEN refresh endpoint
app.post('/token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired refresh token' });

    // Generate new access token (no new refresh token here)
    const accessToken = generateAccessToken({ id: user.userId, username: user.username });
    res.json({ accessToken });
  });
});

// LOGOUT (invalidate refresh token)
app.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.sendStatus(204);
});

// PROTECTED route example
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data.` });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
