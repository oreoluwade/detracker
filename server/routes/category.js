import express from 'express';
// import { CategoryController } from '../controllers';
import authenticate from '../middlewares';

const { verifyUser } = authenticate;

const categoryRouter = express.Router();

categoryRouter.route('/list')
  .get(verifyUser)


export default categoryRouter;
