import express from 'express';
import { UsersController } from './controllers'

const router = express.Router();

router.route('/user/:id')
  .get(UsersController.getUser)
  .put(UsersController.editUserDetails)
  .delete(UsersController.deleteUser)

router.route('/register')
  .post(UsersController.createUser)

router.route('/users')
  .get(UsersController.fetchAllUsers);

export default router;
