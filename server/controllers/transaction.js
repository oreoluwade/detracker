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
  },

  async getAllTransactions(req, res) {
    try {
      const transactionsList = await Transactions.findAll({
        limit: 10
      })
      if (transactionsList.length > 0) {
        return res.status(200).json(transactionsList)
      }
      return res.status(404).json({ message: 'No transactions created yet' })
    } catch (err) {
      return res.status(500).json({ error: 'An error occured' })
    }
  },

  async createTransaction(req, res) {
    try {
      if (req.body.userId) {
        const userExists = await Users.findOne({
          where: { id: req.body.userId }
        })
        if (userExists) {
          const newTransaction = await Transactions.create(req.body)
          return res.status(201).json(newTransaction)
        }
        return res.status(404).json({
          error: `User with userId ${req.body.userId} does not exist`
        })
      }
      return res.status(403).json({
        error: 'You must be Logged in to add a transaction'
      })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }
}
