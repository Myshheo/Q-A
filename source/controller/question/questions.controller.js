import { QuestionsService } from '../../service/question/questions.service.js'

export class QuestionsController {
    questionsService = new QuestionsService();

    createQuestion = async (req, res, next) => {
        const userId = res.locals.user

        try {
            const createdQuestion = await this.questionsService.createQuestion(userId, req.body);

            return res.status(200).json({ data: createdQuestion })
        } catch (error) {
            next(error);
        };
    };

    findAllQuestions = async (req, res, next) => {
        try {
            const questions = await this.questionsService.findAllQuetions();

            return res.status(200).json({ data: questions });
        } catch (error) {
            next(error);
        };
    };

    findQuestionById = async (req, res, next) => {
        const questionId = req.params;

        try {
            const question = await this.questionsService.findQuestionById(questionId);

            return res.status(200).json({ data: question });
        } catch (error) {
            next(error);
        };
    };

    updateQuestion = async (req, res, next) => {
        const userId = res.locals.user;
        const questionId = req.params;

        try {
            const updatedQuestion = await this.questionsService.updateQuestion(
                req.body,
                userId,
                questionId
            )
            return res.status(updatedQuestion.status).json(updatedQuestion);
        } catch (error) {
            next(error);
        }
    };
    deleteQuestion = async (req, res, next) => {
        const userId = res.locals.user;
        const questionId = req.params;

        try {
            const deletedQuestion = await this.questionsService.deleteQuestion(
                userId,
                questionId
            )
            res.status(deletedQeustion.status).json(deletedQuestion);
        } catch (error) {
            next(error)
        }
    }
};