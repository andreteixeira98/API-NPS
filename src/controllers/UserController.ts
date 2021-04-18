import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';

import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController{
    async create(resquest:Request, response:Response){
        const {name, email}= resquest.body;

        const schema = yup.object().shape({
            name: yup.string().required("name é obrigatorio"),
            email: yup.string().email("email invalido").required("email obrigatorio")
        })

        try{
            await schema.validate(resquest.body, {abortEarly:false});
        }catch(err){
            throw new AppError(err, 400);
        }
        const usersRepository =getCustomRepository(UsersRepository)

        const userAlreadyExists = await usersRepository.findOne({
            email 
        });

        if(userAlreadyExists) {
            throw new AppError("User already exists", 400);
        }
        const user = usersRepository.create({name, email});
        await usersRepository.save(user);
        return response.status(201).json(user);

    }
}
export { UserController };
