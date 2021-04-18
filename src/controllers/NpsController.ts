import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class NpsController{
    async execute(request:Request, response:Response){
        const {survey_id} = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveys = await  surveysUsersRepository.find({
            where:{survey_id, value:Not(IsNull())}
        });

        const detratores = (surveys).filter(survey =>
            survey.value>= 0 && survey.value<= 6
        ).length;

        const passive = surveys.filter(survey =>
            survey.value>=7 && survey.value<=8 
        ).length;

        const promotores = surveys.filter(survey => 
            survey.value>= 9 && survey.value<= 10
        ).length;  

        const totalAnswer = surveys.length;

        const calculoNPS = Number((((promotores - detratores) / totalAnswer) * 100).toFixed(2));

        return response.json({
            detratores,
            passive,
            promotores,
            totalAnswer,
            nps:calculoNPS
        })
    }
}

export {NpsController};