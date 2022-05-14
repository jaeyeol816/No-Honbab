import express from 'express';

import { matchController } from './controllers/match';	

const router = express.Router();

router.post('/register', matchController.post_register);
router.get('/status', matchController.get_status);
router.post('/delete', matchController.post_delete);

export default router;
