import {useState, useEffect, useRef, ChangeEvent} from "react";
import '../../styles/ProgressBar.css';
import { updateGoalProgress } from "../../ApiService";

interface GoalType {
  goal:{
  name: string
  type: 'Simple List' | 'Progress Bar' | 'Levels' | 'Sets'
  list: string
  color: string
  active: boolean
  complete: boolean
  id: number
  last_completed: any
  order_no: number
  tab: string
  current: number
  goal_number: number
  units: number
  }
}

export default function ProgressBar({ goal }: GoalType) {
    const [current, setCurrent] = useState<number>(goal.current);
    const [progressToAdd, setToAdd] = useState<number | ''>('');
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const progressTextRef = useRef<HTMLSpanElement | null>(null);
  
    useEffect(() => {
      console.log('current', current);
      console.log('goal', goal);
      updateGoalProgress(goal.name, goal.type, current);
    }, [current]);
  
    function updateProgressBar(percentage: number) {
      if (progressBarRef.current && progressTextRef.current) {
        progressTextRef.current.textContent = `${current} / ${goal.goal_number} ${goal.units} — ${percentage.toFixed(2)}%`;
        if (percentage <= 100) {
          progressBarRef.current.style.width = `${percentage}%`;
        }
      }
    }
  
    function submitProgress() {
      setCurrent((prevCurrent: number) => {
        if (Number(prevCurrent) + Number(progressToAdd) > goal.goal_number) {
          updateProgressBar(100);
          return goal.goal_number;
        }
        const newCurrent: number =  Number(prevCurrent) + Number(progressToAdd);
        let percentage: number = (newCurrent / goal.goal_number) * 100;
        updateProgressBar(percentage);
        return newCurrent;
      });
      setToAdd('');
    }
  
    function handleDayProgress(event: ChangeEvent<HTMLInputElement>) {
      const value: any = event.target.value;
      setToAdd(value === '' ? '' : Number(value));
    }
  
    useEffect(() => {
      const percentage: number = (current / goal.goal_number) * 100;
      updateProgressBar(percentage);
    }, [current]);
  
    return (
      <div className="fullBar" data-testid="progress-bar">
        <div className="left-box-prog">
          <div className="goalName">{goal.name}</div>
          <div className="inputBox">
            <input
              type="number"
              className="progressIncrease"
              value={progressToAdd}
              onChange={handleDayProgress}
              data-testid="progress-value"
            />
            <button className="addProgress" onClick={submitProgress} data-testid="progress-button">
              +
            </button>
          </div>
        </div>
        <div className="barBox">
          <div className="progress-container">
            <div
              className={`progress-bar ${current >= goal.goal_number ? 'green-fill' : goal.color === 'orange-gradient'? 'orange-fill' : 'purple-gradient'}`}
              ref={progressBarRef}
              style={{ width: `${(current / goal.goal_number) * 100}%` }}
            ></div>
            <span ref={progressTextRef} className="progress-text" data-testid="progress-output">
              {current} / {goal.goal_number} {goal.units} —{' '}
              {((current / goal.goal_number) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  