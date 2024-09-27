import {useState, useEffect, useRef} from "react";
import '../../styles/ProgressBar.css';
import { updateGoalProgress } from "../../ApiService";

export default function ProgressBar({ goal }: any) {
    const [current, setCurrent] = useState<any>(goal.current);
    const [progressToAdd, setToAdd] = useState<any>('');
    const progressBarRef: any = useRef(null);
    const progressTextRef: any = useRef(null);
  
    useEffect(() => {
      updateGoalProgress(goal.name, goal.type, current);
    }, [current]);
  
    function updateProgressBar(percentage: any) {
      if (progressBarRef.current && progressTextRef.current) {
        progressTextRef.current.textContent = `${current} / ${goal.goal_number} ${goal.units} — ${percentage.toFixed(2)}%`;
        if (percentage <= 100) {
          progressBarRef.current.style.width = `${percentage}%`;
        }
      }
    }
  
    function submitProgress() {
      setCurrent((prevCurrent: any) => {
        const newCurrent: any = prevCurrent + progressToAdd;
        const percentage: any = (newCurrent / goal.goal_number) * 100;
        updateProgressBar(percentage);
        return newCurrent;
      });
      setToAdd('');
    }
  
    function handleDayProgress(event: any) {
      const value: any = event.target.value;
      setToAdd(value === '' ? '' : Number(value));
    }
  
    useEffect(() => {
      const percentage: any = (current / goal.goal_number) * 100;
      updateProgressBar(percentage);
    }, [current]);
  
    return (
      <div className="fullBar">
        <div className="left-box-prog">
          <div className="goalName">{goal.name}</div>
          <div className="inputBox">
            <input
              type="number"
              className="progressIncrease"
              value={progressToAdd}
              onChange={handleDayProgress}
            />
            <button className="addProgress" onClick={submitProgress}>
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
            <span ref={progressTextRef} className="progress-text">
              {current} / {goal.goal_number} {goal.units} —{' '}
              {((current / goal.goal_number) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  