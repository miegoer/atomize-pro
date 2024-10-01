import { useState, useEffect} from "react";
import { updateGoalProgress } from "../../ApiService";

export default function Sets({goal}: any) {

    const [sets, setSets] = useState<any>(goal.sets);
    const [completedSets, setCompletedSets] = useState<any>(goal.completed_sets);

    const setSpacing = (numberOfSets: any) => {
        if (numberOfSets > 3) {
            return 'smaller-space';
        }}

        useEffect(() => {
        setSpacing(goal.sets);
    }, []);

    const handleCompleteSet = () => {
        if (completedSets < sets) {
            setCompletedSets((prev: any) => prev + 1);
        }
    }

    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, completedSets);
      }, [completedSets]);

    return (
        <div className="set-container">
            <div className="set-name-box">{goal.name}</div>
            <div className="set-tracker">
                {Array.from({ length: goal.sets }).map((_, index: any) => (
                 <div className={`set-circles ${index < completedSets ? 'complete-set' : ''}`}
                 key={index}
                 onClick={() => handleCompleteSet()}>
                    <span className="rep-number">{goal.reps}</span>
                </div>
                ))}
            </div>         
        </div>
    )
}