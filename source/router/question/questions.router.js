import express from 'express'
import QuestionsController from '../../controller/user/users.controller.js'
import authMiddleware from '../../midddlewares/auth.middleware.js';

const router = express.Router();

const questionsController = new QuestionsController();

router.post('/question/:userId', questionsController.createQuestion);

router.get('/question', questionsController.findAllQuestions);

router.get('/question/:questionId', questionsController.findQuestionById);

router.put('/question/:questionId', questionsController.updateQuestion);

router.delete('/question/:questionId', questionsController.deleteQuestion);

export default router;