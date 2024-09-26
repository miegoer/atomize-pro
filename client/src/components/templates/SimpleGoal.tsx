import {useState, useEffect} from "react";
import '../../styles/SimpleGoal.css';
import { updateGoalProgress } from "../../ApiService";

export default function SimpleGoal({goal}: any) {

    const [goalStatus, setGoalStatus] = useState<any>(goal.complete);

    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, goalStatus);
    }, [goalStatus]);

    const completeGoal = () => {
        if (!goalStatus) {
            setGoalStatus(true); // Set it to complete
        }
    }

    const renderSimpleGoal = (goal: any) => {
        const goalClass = goal.color === 'red' ? 'simple-red' : goal.color === 'purple' ? 'simple-purple' : 'simple-orange';
        return (
            <div className='simple-container'>
                <div className={`simpleBlock ${goalClass}`} onClick={completeGoal}>
                    <div className={`statusLight-simple ${goalStatus ? 'isDone' : 'isOff'}`} key={goal.name}></div>
                    <div className="simpleGoalText" onClick={completeGoal}>{goal.name}</div>
                </div>
            </div>
        );
    };

    return (
        renderSimpleGoal(goal)
    )
}
