/* 
  For those of you unfamiliar with async/await,
  I prefer its usage over the .then and .catch
  method of handling promises. It allows me to
  write asynchronous code as though it was 
  synchronous.
*/

import User from '../models/user-model.js';
import generateToken from '../jwt/generate-token.js';
import bcrypt from 'bcrypt';

/**
 * @desc    Registers a user.
 * @route   POST /api/users/register
 * @access  Public
 */
const register = async (req, res) => {
  // Try/catch block in async function.
  try {
    // Create new user.
    const newUser = await User.create(req.body);
    // Generate json web token.
    const token = generateToken(newUser._id);
    // I want to send the username
    // with the response, so I destructure it.
    const { username } = newUser;
    // Send response with username and jwt.
    res.status(201).json({ username, token });
  } catch (err) {
    // Catch any errors and send to client.
    console.log(err);
    res.status(400).json(err);
  }
};

/** 
 * @desc    Authenticates a user.
 * @route   POST /api/users/login
 * @access  Public
*/
const login = async (req, res) => {
  // Destructure the email and password from the request body.
  const { email, password } = req.body;

  // Try/catch block in async function.
  try {
    // Find user in database.
    const user = await User.findOne({ email });

    // If user not found, respond with error.
    if (!user) {
      const err = { login: 'Invalid credentials.' }
      return res.status(400).json(err);
    }

    // Compare password given vs. password in database.
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // If password incorrect, respond with error.
    if (!passwordIsCorrect) {
      const err = { login: 'Invalid credentials.' }
      return res.status(400).json(err);
    }

    // Success. Generate json web token.
    const token = generateToken(user._id);
    const username = user.username;

    // Log the user in. Send the user and the token.
    res.status(200).json({ username, token });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

/** 
 * @desc    I plan on using this as a protected route for
 * testing in the future. No purpose for now.
 * @route   GET /api/users/me
 * @access  To be private/protected
*/
const me = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(400).json(err);
  }
}

export { register, login, me };
