import express from 'express';
import { usersControllers } from '../controllers';
import authenticate, { validations } from '../middlewares';

const {
  fetchAllUsers,
  fetchUser,
  editUserDetails,
  deleteUser,
  createUser,
  login
} = usersControllers;

const { verifyUser } = authenticate;

const userRouter = express.Router();

userRouter.route('/register')
  .post(validations.register, createUser)

userRouter.route('/login')
  .post(login);

userRouter.route('/allusers')
  .get(verifyUser, fetchAllUsers);

userRouter.route('/:id')
  .all(verifyUser)
  .get(fetchUser)
  .put(editUserDetails)
  .delete(deleteUser)




export default userRouter;
