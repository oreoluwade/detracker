import express from 'express';
import { UsersController } from './controllers'

const router = express.Router();

router.route('/user/:id')
  .get(UsersController.getUser)

router.route('/register')
  .post(UsersController.createUser)

export default router;
