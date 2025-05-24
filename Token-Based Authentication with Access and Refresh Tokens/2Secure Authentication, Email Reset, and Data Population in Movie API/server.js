require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // to generate secure reset tokens

const app = express();
app.use(express.json());

// Simulated user "DB"
const users = [
  {
    id: '1',
    username: 'user1',
    email: 'user1@example.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    resetPasswordToken: null,
    resetPasswordExpires: null,
  },
];

// Nodemailer SMTP transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT, // e.g., 587
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password or app password
  },
});

// --- Password Reset Routes ---

// Forgot Password: generate token and send email
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    // To prevent email enumeration, respond with success message anyway
    return res.json({ message: 'If that email is registered, a reset link has been sent.' });
  }

  // Generate a secure token
  const resetToken = crypto.randomBytes(32).toString('hex');
  // Set token expiry (e.g., 1 hour from now)
  const expiry = Date.now() + 3600000;

  // Save token and expiry to user record
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = expiry;

  // Compose reset URL (assume front-end url or API endpoint)
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;

  // Email template
  const mailOptions = {
    from: `"Movie API Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <p>Hello ${user.username},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reset email:', error);
      return res.status(500).json({ message: 'Failed to send reset email' });
    }
    res.json({ message: 'Password reset email sent successfully' });
  });
});

// Reset Password: verify token and update password
app.post('/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!email || !token || !newPassword) {
    return res.status(400).json({ message: 'Email, token, and new password are required' });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or token' });
  }

  // Check token validity and expiration
  if (
    user.resetPasswordToken !== token ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < Date.now()
  ) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password and clear reset token and expiry
  user.passwordHash = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  res.json({ message: 'Password reset successfully. You can now login with your new password.' });
});

// --- (You can include the login and other routes from L0 here) ---

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
