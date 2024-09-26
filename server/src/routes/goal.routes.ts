import { Router } from 'express';
import { saveGoals, getAllGoals, updateGoalStatus, deleteGoal } from '../controllers/goal.controller';

const router: Router = Router();

router.post('/storedgoals', saveGoals);
router.get('/storedgoals', getAllGoals);
router.delete('/storedgoals', deleteGoal);
router.post('/storedgoals/status', updateGoalStatus);

export default router;
