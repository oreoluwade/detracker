import Sequelize from 'sequelize';
import models from '../models';

const { User } = models;

export default {
  async createUser (req, res) {
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

  async getUser (req, res) {
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
  }
}
