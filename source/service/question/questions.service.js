import { QuestionsRepository } from '../../repository/question/questions.repository.js'

export class QuestionsService {
    questionsRepository = new QuestionsRepository();

    createQuestion = async (userId, bodyObj) => {
        const newQuestion = new Question(
            userId,
            bodyObj.title,
            bodyObj.content
        )

        const createdQuestion = this.questionsRepository.createQuestion(newQuestion);

        return {
            userId: createdQuestion.userId,
            title: createdQuestion.title,
            content: createdQuestion.content,
            createdAt: createdQuestion.createdAt,
            updatedAt: createdQuestion.updatedAt
        }
    };

    findAllQuestions = async () => {
        const questinos = await this.questionsRepository.findAllQuestions();

        return questinos.map((question) => {
            return {
                questionId: question.questionId,
                userId: question.UserId,
                title: question.title,
                updatedAt: question.updatedAt
            }
        });
    };

    findQuestionById = async (questionId) => {
        const question = await this.questionsRepository.findQuestionById(questionId);

        return {
            questionId: question.questionId,
            userId: question.UserId,
            title: question.title,
            content: question.content,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt
        };
    };

    updateQuestion = async (bodyObj, userId, questionId) => {
        const selectedQuestion = await this.questionsRepository.findQuestionById(questionId);
        if (!selectedQuestion) {
            return res.status(400).json({ message: "해당 질문 글이 존재하지 않습니다." })
        }
        if (!bodyObj.title && !bodyObj.content) {
            return res.status(400).json({ message: "변경 사항이 존재하지않습니다." });
        };

        if (selectedQuestion.UserId !== userId) {
            return res.status(400).json({ message: "해당 질문글 작성자가 아닙니다." });
        }

        const updateQuestion = new Question(
            +selectedQuestion.UserId,
            bodyObj.title ? bodyObj.title : selectedQuestion.title,
            bodyObj.content ? bodyObj.content : selectedQuestion.content
        );

        try {
            const updatedQuestion = await this.questionsRepository.updateQuestion(
                updateQuestion,
                questionId
            );
            return res.status(201).json({ message: "질문이 수정 되었습니다.", data: updatedQuestion })
        } catch (error) {
            return res.status(error.status).json(error)
        }
    };

    deleteQuestion = async (userId, questionId) => {
        const selectedQuestion = await this.questionsRepository.findQuestionById(questionId);
        if (!selectedQuestion) {
            return res.status(400).json({ message: "해당 질문 글이 존재하지 않습니다." })
        };
        if (selectedQuestion.userId !== userId) {
            return res.status(400).json({ message: "해당 질문글 작성자가 아닙니다." });
        };

        try {
            const deletedQuestion = await this.questionsRepository.deleteQuestion(questionId);

            return res.status(200).json({ message: "질문 삭제에 성공했습니다.", data: deletedQuestion })
        } catch (error) {
            return res.status(error.status).json(error)
        }

    }
}

class Qusetion {
    constructor(userId, title, content) {
        this.userId = userId;
        this.title = title;
        this.content = content;
    }
}