import { prisma } from '../../utils/prisma/index.js'

export class AnswersRepository {
    createAnswer = async (createObj) => {
        try {
            const createdAnswer = await this.answers.create({
                data: {
                    ...createObj
                }
            });

            return createdAnswer
        } catch (error) {
            console.log(error)
        };
    };

    findAllAnswers = async (questionId) => {
        try {
            const answers = await prisma.answers.findMany({
                where: {
                    questionId: +questionId
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return answers;
        } catch (error) {
            console.log(error)
        };
    };

    findAnswerById = async (answerId) => {
        try {
            const answer = await prisma.answers.findFirst({
                where: {
                    answerId: +answerId
                }
            })

            return answer;
        } catch (error) {
            console.log(error)
        }
    };

    updateAnswer = async (updateObj, answerId) => {
        try {
            const updatedAnswer = await this.prisma.answers.update({
                where: {
                    answerId: +answerId
                },
                data: {
                    ...updateObj
                }
            });
        } catch (error) {
            console.log(error)
        }
    };
    deleteAnswer = async answerId => {
        try {
            const deletedAnswer = await this.prisma.answers.delete({
                where: {
                    answerId: +answerId
                }
            })

            return deletedAnswer;
        } catch (error) {
            console.log(error)
        }
    }
}