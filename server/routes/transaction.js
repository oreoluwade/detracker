import express from 'express';
import { transactionsControllers } from '../controllers';
import authenticate from '../middlewares';

const { verifyUser } = authenticate;
const { getUserTransactions } = transactionsControllers;

const transactionRouter = express.Router();

transactionRouter.route('/user/:id')
  .get(verifyUser, getUserTransactions)


export default transactionRouter;
