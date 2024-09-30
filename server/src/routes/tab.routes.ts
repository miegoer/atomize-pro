import { Router } from 'express';
import { saveTab, getAllTabs, deleteTab, deleteListPos, insertListPos } from '../controllers/tab.controller';

const router: Router = Router();

router.post('/tabs', saveTab);
router.get('/tabs', getAllTabs);
router.delete('/tabs/:tabName', deleteTab);
router.delete('/tabs/:tabName/position/:listName', deleteListPos);
router.post('/tabs/position', insertListPos)

export default router;
