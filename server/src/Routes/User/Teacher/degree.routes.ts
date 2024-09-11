
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { studentDegreeController } from '../../../Controllers/index.controller';
import { studentDegreeValidator } from '../../../Validations/student-degree.validation';



const degreeRouter = express.Router();




export default degreeRouter;