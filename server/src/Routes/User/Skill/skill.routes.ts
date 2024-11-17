
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { skillController } from '../../../Controllers/index.controller';
import { skillValidator } from '../../../Validations/skill.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const skillRouter = express.Router();


skillRouter.post('/', validation(skillValidator.createSkill), skillController.createSkill);

skillRouter.get('/', skillController.getAllSkills);
skillRouter.get('/:skillId', validation(skillValidator.getSkill), skillController.getSkillData);

skillRouter.patch('/', validation(skillValidator.updateSkill), skillController.updateSkillData);



export default skillRouter;