export interface TabTypes {
  name: string;
  icon: string;
  col_one?: string;
  col_one_b?: string;
  col_two?: string;
  col_two_b?: string;
  col_three?: string;
  col_three_b?: string;
  order_no?: number;
}

export interface GoalTypes {
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
