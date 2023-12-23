import { AnswersRepository } from '../../repository/answer/answers.repository'
import { QuestionsRepository } from '../../repository/question/questions.repository.js'

export class AnswersService {
    answersRepository = new AnswersRepository();
    questionsRepository = new QuestionsRepository();

    createAnswer = async (questionId, userId, bodyObj) => {
        const selectedQuestion = await this.questionsRepository.findQuestionById(questionId);
        if (!selectedQuestion) { throw new Error("해당 질문 글이 존재하지 않습니다.") }
        // userId를 통해서 매니저인지 확인하는 로직 필요.
        try {
            const newAnswer = new Answer(
                questionId,
                userId,
                bodyObj.content
            );

            const createdAnswer = this.answersRepository.createAnswer(newAnswer);

            return {
                questionId: createdAnswer.questionId,
                userId: createdAnswer.userId,
                content: createdAnswer.content,
                selectedYn: createdAnswer.selectedYn,
                createdAt: createdAnswer.createdAt,
                updatedAt: createdAnswer.updatedAt
            }
        } catch (error) {
            next(error)
        }
    }

    findAllAnswers = async (questionId) => {
        const answers = await this.answersRepository.findAllAnswers(questionId);

        return answers.map((answer) => {
            return {
                questionId: answer.QuestionId,
                userId: answer.UserId,
                content: answer.content,
                selectedYn: answer.selectedYn,
                createdAt: answer.createdAt,
                updatedAt: answer.updatedAt
            };
        });
    };

    findAnswerById = async (questionId, answerId) => {
        const answer = await this.answersRepository.findAnswerById(answerId);

        return {
            questionId: answer.QuestionId,
            userId: answer.UserId,
            content: answer.content,
            selectedYn: answer.selectedYn,
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt
        };
    };

    updateAnswer = async (userId, questionId, answerId, bodyObj) => {
        const selectedQuestion = await this.questionsRepository.findQuestionById(questionId);
        if (!selectedQuestion) {
            return res.status(400).json({ message: "해당 질문 글이 존재하지 않습니다." })
        }

        const selectedAnswer = await this.answersRepository.findAnswerById(answerId);
        if (!selectedAnswer) {
            return res.status(400).json({ message: "해당 답변 글이 존재하지 않습니다." })
        }
        if (selectedAnswer.UserId !== userId) {
            return res.status(400).json({ message: "해당 답변 글 작성자가 아닙니다." })
        }
        if (!bodyObj.content) {
            return res.status(400).json({ message: "변경 사항이 존재하지않습니다." });
        };

        const updateAnswer = new Answer(
            +selectedAnswer.QuestionId,
            +selectedAnswer.UserId,
            bodyObj.content ? bodyObj.content : selectedAnswer.content
        );

        const updatedAnswer = await this.answersRepository.updateAnswer(
            updateAnswer,
            answerId
        );

        return updatedAnswer;
    };

    deleteAnswer = async (userId, questionId, answerId) => {
        const selectedQuestion = await this.questionsRepository.findQuestionById(questionId);
        if (!selectedQuestion) {
            return res.status(400).json({ message: "해당 질문 글이 존재하지 않습니다." })
        };

        const selectedAnswer = await this.answersRepository.findAnswerById(answerId);
        if (!selectedAnswer) {
            return res.status(400).json({ message: "해당 답변 글이 존재하지 않습니다." })
        };
        if (selectedAnswer.UserId !== userId) {
            return res.status(400).json({ message: "해당 답변 글 작성자가 아닙니다." })
        };

        await this.answersRepository.deleteAnswer(answerId);

        return selectedAnswer
    }
}

class Answer {
    constructor(questionId, userId, content) {
        this.questionId = questionId;
        this.userId = userId;
        this.content = content;
    }
}