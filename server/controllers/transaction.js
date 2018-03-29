import models from '../models';

const { Users, Transactions } = models;

export default {
  async getUserTransactions(req, res) {
    try {
      const userExists = await Users.findOne({
        where: { id: req.params.id }
      })
      if (userExists) {
        const userTransactions = await Transactions.findAll({
          where: { userId: req.params.id }
        })
        if (userTransactions.length > 0) {
          return res.status(200).json(userTransactions)
        } else {
        return res.status(404).json({
            message: `No transactions found for user with ID: ${req.params.id}`
          })
        }
      }
      return res.status(404).json({
        error: `User with ID ${req.params.id} does not exist`
      })
    } catch (err) {
      return res.status(500).json({ err: 'An error occured' })
    }
  }
}
