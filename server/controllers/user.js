import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;

const secretKey = process.env.SECRET || 'detrackersecret';

export default {
  async createUser(req, res) {
    try {
      const userExists = await User.findOne({
        where: { username: req.body.username }
      })
      if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
      }
      const user = await User.create(req.body);
      const token = jwt.sign({ email: user.email }, secretKey);
      return res.status(201).json({
        message: 'User creation Successful!',
        token,
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: 'Unknown error occured' });
    }
  },

  async fetchUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error : 'ID should be a number' })
      }
      const user = await User.findById(req.params.id);
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
      return res.status(500).json({ error: 'An Unknown error occured' });
    }
  },

  async fetchAllUsers(req, res) {
    try {
      const users = await User.findAll()
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
      return res.status(500).json({error: 'An unknown error occured'});
    }
  },

  async editUserDetails(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error : 'ID should be a number' })
      }
      const user = await User.findById(req.params.id);
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
      return res.status(500).json({ error: 'An Unknown error occured' });
    }
  },

  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({ error : 'ID should be a number' })
      }
      const user = await User.destroy({
        where: { id },
      });
      if (user === 1) {
        return res.status(200).json({ message: 'User Removed' });
      }
      return res.status(404).json({ message: 'No user with the given ID' });
    } catch (err) {
      return res.status(500).json({ error: 'An Unknown error occured' });
    }
  }
}
