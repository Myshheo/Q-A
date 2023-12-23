import prisma from '../../utils/prisma/index'

export class QuestionsRepository{
    createQuestion = async (createObj)=>{
        try{
            const createdQuestion = await prisma.Questions.create({
                data:{
                    ...createObj
                }
            });

            return createdQuestion;
        }catch(error){
            console.log(error)
        };
    };

    findAllQuestion =async()=>{
        try{
            const questions = await prisma.qeustions.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return questions;
        }catch(error){
            console.log(error)
        }
    };

    findQuestionById = async (questionId)=>{
        try{
            const question = await prisma.questions.findFirst({
                where:{
                    questionId: +questionId
                }
            });

            return question; 
        }catch(error){
            console.log(error)
        }

    };

    updateQuestion = async (updateObj,questionId)=>{
        try{
            const updatedQuestion = await prisma.questions.update({
                where:{
                    questionId: +questionId
                },
                data:{
                    ...updateObj
                }
            });
            return updatedQuestion;
        } catch(error){
            console.log(error)
        };
    };

    deleteQuestion = async questionId =>{
        try{
            const deletedQuestion = await this.prisma.questions.delete({
                where: {
                    qeustionId: +questionId
                }
            })

            return deletedQuestion;
        }catch(error){
            console.log(error)
        }
    }
};