import { Router } from 'express';
import { saveTab, getAllTabs, deleteTab, deleteListPos } from '../controllers/tab.controller';

const router: Router = Router();

router.post('/tabs', saveTab);
router.get('/tabs', getAllTabs);
router.delete('/tabs/:tabName', deleteTab);
router.delete('/tabs/:tabName/position/:listName', deleteListPos);

export default router;
