
export interface GoalBase {
  id: number;
  name: string;
  list: string;
  tab: string;
  color: string;
  order_no: number;
  active: boolean;
  complete: boolean;
  last_completed: any; // Replace `any` with an appropriate type if possible
  type: 'Simple List' | 'Progress Bar' | 'Levels' | 'Sets';
  blockCount?: number;
}

export interface SimpleGoal extends GoalBase {
  type: 'Simple List';
  // No additional properties
}

export interface ProgBarGoal extends GoalBase {
  type: 'Progress Bar';
  current: number;
  goal_number: number;
  units: string;
}

export interface LevelGoal extends GoalBase {
  type: 'Levels';
  level: number;
}

export interface SetGoal extends GoalBase {
  type: 'Sets';
  sets: number;
  reps: number;
  completed_sets: number;
}

// Union type for all goal types
export type Goal = SimpleGoal | ProgBarGoal | LevelGoal | SetGoal;

export interface GoalAll {
  goal: Goal;
}