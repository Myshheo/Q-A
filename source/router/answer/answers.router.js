import express from 'express'
import { AnswersController } from '../../controller/answer/answers.controller.js'
import authMiddleware from '../../midddlewares/auth.middleware.js';

const router = express.Router();

const answersController = new AnswersController();

router.post('/question/:questionId/answer', answersController.createAnswer);

router.get('/question/:questionId/answer', answersController.findAllAnswers);

router.get('/question/:questionId/answer/:answerId', answersController.findAnswerById);

router.put('/question/:questionId/answer/:answerId', answersController.updateAnswer);

router.delete('/question/:questionId/answer/:answerId', answersController.deleteAnswer);

export default router;