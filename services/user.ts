import 
    AuthController
 from '../pages/auth/login.controller';

import { Router} from 'express';


const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/signout', AuthController.signout);

export default router;