import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import tokenRouter from './token';

const router = Router();

router.use(registerRouter);
router.use(loginRouter);
router.use(tokenRouter);

export default router;
