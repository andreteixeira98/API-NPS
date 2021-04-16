import {Router} from 'express';
import { SurveyController } from './controllers/SurveyController';
import {UserController} from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();

router.post('/user', userController.create);
router.post('/survey',surveyController.create);
router.get('/surveys',surveyController.show);

export {router};