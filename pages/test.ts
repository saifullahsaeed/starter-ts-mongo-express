import {Router} from 'express';

const router = Router();


router.get ('/', (req, res) => {
    //console.log(req.user);
    res.send('Hello World');
}
);

export default router;