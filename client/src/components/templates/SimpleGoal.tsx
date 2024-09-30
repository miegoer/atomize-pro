import {useState, useEffect} from "react";
import '../../styles/SimpleGoal.css';
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
    }
}

export default function SimpleGoal({goal}: GoalType) {

    const [goalStatus, setGoalStatus] = useState<boolean>(goal.complete);

    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, goalStatus);
    }, [goalStatus]);

    const completeGoal = () => {
        if (!goalStatus) {
            setGoalStatus(true);
        }
    }

    const renderSimpleGoal = ({goal}: GoalType) => {
        const goalClass = goal.color === 'red' ? 'simple-red' : goal.color === 'purple' ? 'simple-purple' : 'simple-orange';
        return (
            <div className='simple-container' data-testid="simple-goal">
                <div className={`simpleBlock ${goalClass}`} data-testid="simple-goal-background" onClick={completeGoal}>
                    <div className={`statusLight-simple ${goalStatus ? 'isDone' : 'isOff'}`} data-testid='simple-goal-checkbox' key={goal.name}></div>
                    <div className="simpleGoalText" onClick={completeGoal}>{goal.name}</div>
                </div>
            </div>
        );
    };

    return (
        renderSimpleGoal({goal})
    )
}
