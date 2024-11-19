
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import skillRouter from './Skill/skill.routes';



const authSkillRouter = express.Router();


authSkillRouter.use(checkRole(['director', 'admin',]),);
authSkillRouter.use('/', skillRouter);



export default authSkillRouter;