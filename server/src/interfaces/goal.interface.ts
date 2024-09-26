export interface GoalRequestBody {
  name: string;
  list: string;
  tab: string;
  color: string;
  order_no?: number;
  active?: boolean;
  complete?: boolean;
  last_completed?: string;
  type: string;
  current?: number;
  goal_number?: number;
  units?: string;
  level?: number;
  sets?: number;
  reps?: number;
  completed_sets?: number;
}
