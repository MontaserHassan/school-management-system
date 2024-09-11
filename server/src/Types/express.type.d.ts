import { EmployeeInterface, TokenInterface, UserInterface } from '../Interfaces/index.interface';



declare global {
    namespace Express {
        interface Request {
            employee?: EmployeeInterface,
            token?: TokenInterface,
            user?: UserInterface
        }
        interface Response {
            data: any;
        }
    }
}