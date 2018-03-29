import express from 'express';
import { transactionsControllers } from '../controllers';
import authenticate from '../middlewares';

const { verifyUser } = authenticate;
const { getUserTransactions, getAllTransactions, createTransaction } = transactionsControllers;

const transactionRouter = express.Router();

transactionRouter.route('/user/:id')
  .get(verifyUser, getUserTransactions)

transactionRouter.route('/all')
  .get(getAllTransactions)

transactionRouter.route('/create')
  .post(createTransaction)

export default transactionRouter;
