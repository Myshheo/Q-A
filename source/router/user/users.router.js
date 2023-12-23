import express from 'express'
import { UsersController } from '../../controller/user/users.controller.js'
// import authMiddleware from '../../midddlewares/auth.middleware.js';

const router = express.Router();

const usersController = new UsersController();

router.post('/signup', usersController.createUser);

router.post('/signin', usersController.signinUser);

router.put('/upgrade/:userId', usersController.upgradeUser);

export default router;