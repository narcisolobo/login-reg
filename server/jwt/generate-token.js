import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;

/** 
  * @desc This function generates a JSON Web Token.
  * I chose to modularize it in its own file,
  * as I use it in two controller functions.
*/
const generateToken = id => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '3d' });
};

export default generateToken;
