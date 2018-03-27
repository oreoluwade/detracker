import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;

const secretKey = process.env.SECRET || 'detrackersecret';


export default {
  verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided!' });
    }
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        res.status(500).json({ message: 'An error occured' });
      }
      req.decoded = decoded;
      next();
    });
  }
}
