import {Router} from 'express';
import { SurveyController } from './controllers/SurveyController';
import { SurveysUsersController } from './controllers/SurveysUsersController';
import {UserController} from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const surveyUser = new SurveysUsersController();

router.post('/user', userController.create);
router.post('/survey',surveyController.create);
router.get('/surveys',surveyController.show);

router.post('/sendMail',surveyUser.execute);

export {router};