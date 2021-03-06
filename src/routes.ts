import {Router} from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SurveyController } from './controllers/SurveyController';
import { SurveysUsersController } from './controllers/SurveysUsersController';
import {UserController} from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const surveyUserController = new SurveysUsersController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/user', userController.create);
router.post('/survey',surveyController.create);
router.get('/surveys',surveyController.show);

router.post('/sendMail',surveyUserController.execute);
router.get('/answers/:value', answerController.execute);
router.get('/nps/:survey_id', npsController.execute);

export {router};