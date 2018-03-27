import Sequelize from 'sequelize';
import models from '../models';

const { User } = models;

export default {
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json({ user, message: 'User creation Successful' });
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        return res.status(409).json({ error: 'User already exists' });
      }
      return res.status(500).json({ error: 'Unknown error occured' });
    }
  },

  async getUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error : 'ID should be a number' })
      }
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user with the given ID' });
      }
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ error: 'An Unknown error occured' });
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

      return res.status(200).json({ updatedUser, message: 'Details updated!' });
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        return res.status(409).json({ error: 'Username/email already in use' });
      }
      return res.status(500).json({ error: 'An Unknown error occured' });
    }
  },

  async fetchAllUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users[0]) {
        return res.json({ users })
      }
      return res.status(404).json({
        message: 'No users created yet',
        createNewUser: `<a href='http:localhost:8081/register'>Add new User</a>`
      });
    } catch (err) {
      return res.status(500).json({error: 'An unknown error occured'});
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
