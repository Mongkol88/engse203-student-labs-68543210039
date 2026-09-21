import { Router } from 'express';
import * as controller from '../controllers/requestController.js';

const router = Router();

router.get('/', controller.listUsers);
router.get('/:id', controller.getUsers);
router.get('/:id/requests', controller.getRequestByUser);

export default router;
