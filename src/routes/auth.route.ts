import { Router } from 'express';

/* CONTROLLERS */
import { signIn, signUp } from '../controllers/auth.controller';

/* LIBRARIES */
import validate, {
  signInValidation,
  signUpValidation,
} from '../libs/validation';

const authRouter = Router();

authRouter.post('/sign-up', signUpValidation, validate, signUp);
authRouter.post('/sign-in', signInValidation, validate, signIn);

export default authRouter;
