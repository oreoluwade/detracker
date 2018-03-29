import Sequelize, { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import models from '../models';

const { Users } = models;

const secretKey = process.env.SECRET || 'detrackersecret';

function jwtSignUser (payload) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(payload, secretKey, {
    expiresIn: ONE_WEEK
  })
}

export default {
  async createUser(req, res) {
    try {
      const usernameExists = await Users.findOne({
        where: { username: req.body.username }
      })
      const emailExists = await Users.findOne({
        where: { email: req.body.email }
      })
      if (usernameExists) {
        return res.status(409).json({ error: 'Username already in use' });
      } else if (emailExists) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      const user = await Users.create(req.body);
      return res.status(201).json({
        message: 'User creation Successful!',
        token: jwtSignUser({ username: user.username }),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (err) {
      console.log('NEW ERROR', err)
      return res.status(500).json({ error: 'An error occured' });
    }
  },

  async fetchUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error : 'ID should be a number' })
      }
      const user = await Users.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user with the given ID' });
      }
      return res.status(200).json({
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: 'An error occured' });
    }
  },

  async fetchAllUsers(req, res) {
    try {
      const users = await Users.findAll()
        .map(user => {
          return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      if (users[0]) {
        return res.json({
          totalNumberOfUsers: users.length,
          users
        })
      }
      return res.status(404).json({
        message: 'No users created yet',
        createNewUser: `<a href='http:localhost:8081/register'>Add new User</a>`
      });
    } catch (err) {
      return res.status(500).json({error: 'An error occured'});
    }
  },

  async editUserDetails(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error : 'ID should be a number' })
      }
      const user = await Users.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user with the given ID' });
      }
      const updatedUser = await user.update(req.body);

      return res.status(200).json({
        message: 'Details updated!',
        updatedUser: {
          username: updatedUser.username,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
        },
      });
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        return res.status(409).json({ error: 'User already exists' });
      }
      return res.status(500).json({ error: 'An error occured' });
    }
  },

  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({ error : 'ID should be a number' })
      }
      const user = await Users.destroy({
        where: { id },
      });
      if (user === 1) {
        return res.status(200).json({ message: 'User Removed' });
      }
      return res.status(404).json({ message: 'No user with the given ID' });
    } catch (err) {
      return res.status(500).json({ error: 'An error occured' });
    }
  },

  async login(req, res) {
    const { identifier, password } = req.body;
    try {
      const user = await Users.findOne({
        where: {
          [Op.or]: [
            { username: identifier },
            { email: identifier },
          ],
        },
      })
      if (!user) {
        return res.status(403).json({ message: 'Incorrect Login Information' });
      }
      if (!user.validPassword(password)) {
        console.log('Shall we see?', password)
        return res.status(403).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({
        message: 'Login Successful! Token expires in one week.',
        token: jwtSignUser({ username: user.username }),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: 'An error occured' });
    }
  },

  logout(req, res) {
    res.status(200).json({ message: 'Logged out successfully!' });
  },
}
