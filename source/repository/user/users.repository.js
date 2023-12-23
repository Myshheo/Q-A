import { prisma } from '../../utils/prisma/index.js'

export class UsersRepository {
    createUser = async (createObj) => {
        try {
            const createdUser = await prisma.users.create({
                data: {
                    ...createObj,
                },
            });

            return createdUser;
        } catch (error) {
            console.log(error)
        }
    }

    getUserEmail = async (email) => {
        try {
            const isExistUser = await prisma.users.findFirst({
                where: {
                    email,
                }
            })
            return isExistUser;
        } catch (error) {
            console.log(error)
        }

    }
};