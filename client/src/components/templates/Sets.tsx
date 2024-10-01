import { useState, useEffect} from "react";
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
    sets: number
    reps: number
    completed_sets: number
    }
}

export default function Sets({goal}: GoalType) {

    const [sets, setSets] = useState<number>(goal.sets);
    const [completedSets, setCompletedSets] = useState<number>(goal.completed_sets);

    const setSpacing = (numberOfSets: number) => {
        if (numberOfSets > 3) {
            return 'smaller-space';
        }}

        useEffect(() => {
            setSpacing(goal.sets);
    }, []);

    const handleCompleteSet = () => {
        if (completedSets < sets) {
            setCompletedSets((prev: number) => prev + 1);
        }
    }

    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, completedSets);
      }, [completedSets]);

    return (
        <div className="set-container" data-testid="set-container">
            <div className="set-name-box">{goal.name}</div>
            <div className="set-tracker">
                {Array.from({ length: goal.sets }).map((_, index: number) => (
                 <div className={`set-circles ${index < completedSets ? 'complete-set' : ''}`}
                 key={index}
                 onClick={() => handleCompleteSet()}
                 data-testid={`set-button-${index}`}
                 >
                    <span className="rep-number">{goal.reps}</span>
                </div>
                ))}
            </div>         
        </div>
    )
}