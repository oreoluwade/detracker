import express from 'express';
import { UsersController } from './controllers';
import authenticate from './middlewares';

const {
  fetchAllUsers,
  fetchUser,
  editUserDetails,
  deleteUser,
  createUser,
  login
} = UsersController;

const { verifyUser } = authenticate;

const router = express.Router();

router.route('/user/:id')
  .all(verifyUser)
  .get(fetchUser)
  .put(editUserDetails)
  .delete(deleteUser)

router.route('/register')
  .post(createUser)

router.route('/users')
  .get(verifyUser, fetchAllUsers);

router.route('/login')
  .post(login);

export default router;
