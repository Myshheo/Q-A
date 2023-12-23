import {UsersRepository} from "../../repository/user/users.repository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UsersService{
    usersRepositoy = new UsersRepository

    createUser = async(bodyObj) => {
        if(!bodyObj.email){return res.status(400).json({message:"이메일을 입력해주세요."})}
        if(bodyObj.password !== bodyObj.confirmPassword){return res.staus(400).json({message:"비밀번호와 비밀번호 확인이 일치하지 않습니다."})}
        
        const isExistUser = await this.UsersRepository.getUserEmail(bodyObj.email)
        if(isExistUser){return res.status(409).json({message:"이미 존재하는 이메일 입니다."})}
        
        const hashedPassword = await bcrypt.hash(bodyObj.password, 10);
        const newUser = new User(
            bodyObj.email,
            hashedPassword,
            bodyObj.nickname
        )

        const createdUser = await this.usersRepositoy.createUser(newUser);

        return {
            userId: createdUser.userId,
            email: createdUser.email,
            nickname: createdUser.nickname,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        };
    };

    signinUser = async bodyObj =>{
        if(!bodyObj.email){return res.status(400).json({message:"이메일을 입력해주세요."})}
        if(!bodyObj.password){return res.status(400).json({message:"비밀번호를 입력해주세요."})}

        const isExistUser = await this.UsersRepository.getUserEmail(bodyObj.email)
        if(!isExistUser){return res.status(400).json({message:"존재하지 않는 유저 입니다."})}
        if(!(await bcrypt.compare(bodyObj.password, isExistUser.password))){return res.status(409).json({message:"비밀번호가 일치하지않습니다."})}

        const token = jwt.sign(
            {userId: isExistUser.userId},
            'customized_secret_key'
        );
        
        res.cookie('authorization', `Bearer ${token}`);
        return res.status(200).json({message:"로그인 성공"})
    }; 

}

class User{
    constructor(email,password,nickname){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}