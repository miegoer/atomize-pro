import express, { Router } from 'express';
import {
  saveGoals,
  saveTab,
  insertListPos,
  deleteListPos,
  getAllTabs,
  getAllGoals,
  deleteTab,
  deleteGoal,
  updateGoalStatus
} from './controllers/controllers';

const router: Router = express.Router();

router.post('/storedgoals', saveGoals);
router.get('/storedgoals', getAllGoals);
router.delete('/storedgoals', deleteGoal);

router.post('/storedgoals/status', updateGoalStatus);

router.post('/tabs', saveTab);
router.post('/tabs/position', insertListPos);

router.get('/tabs', getAllTabs);

router.delete('/tabs/:tabName', deleteTab);
router.delete('/tabs/:tabName/position/:listName', deleteListPos);

export default router;
