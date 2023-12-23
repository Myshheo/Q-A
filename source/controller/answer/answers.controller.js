import { AnswersService } from '../../service/answer/answers.service.js'

export class AnswersController {
    answersService = new AnswersService();

    createAnswer = async (req, res, next) => {
        const userId = res.locals.user;
        const { questionId } = req.params;
        try {
            const createdAnswer = await this.answersService.createAnswer(
                questionId,
                userId,
                req.body
            );

            return res.status(200).json({ message: "답변 작성에 성공하였습니다.", data: createdAnswer })
        } catch (error) {
            next(error);
        }
    };

    findAllAnswer = async (req, res, next) => {
        // userId 조회가 필요한가? => 필요하다 
        // 만약 매니저일 시 user의 nickname을 볼 수 있으나 학생일 시 불가능하게 작성이 필요하다.
        // const userId = res.locals.user;
        const { questionId } = req.params;

        try {
            const answers = await this.answersService.findAllAnswers(questionId);

            return res.status(200).json({ message: "조회에 성공했습니다.", data: answers })
        } catch (error) {
            next(error);
        }
    };

    findAnswerById = async (req, res, next) => {
        const { questionId, answerId } = req.params;

        try {
            const answer = await this.answersService.findAnswerById(questionId, answerId);

            return res.status(200).json({ message: "조회에 성공했습니다.", data: answer })
        } catch (error) {
            next(error);
        }
    }

    updateAnswer = async (req, res, next) => {
        const userId = res.locals.user;
        const { questionId, answerId } = req.params;

        try {
            const updatedAnswer = await this.answersService.updateAnswer(
                userId,
                questionId,
                answerId,
                req.body
            )
            return res.status(200).json({ data: updatedAnswer })
        } catch (error) {
            next(error)
        }
    };

    deletedAnswer = async (req, res, next) => {
        const userId = res.locals.user;
        const { questionId, answerId } = req.params;

        try {
            const deletedAnswer = await this.answersService.deleteAnswer(
                userId,
                questionId,
                answerId
            )

            return res.status(200).json({ data: deletedAnswer })
        } catch (error) {
            next(error)
        };
    };
};