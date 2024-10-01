import {useState, useEffect} from "react";
import { updateGoalProgress } from "../../ApiService";
import '../../styles/LevelsBlock.css'

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
    level: number
    }
}

export default function LevelsBlock({ goal }: GoalType) {
    const [progress, setProgress] = useState<number>(goal.level);
    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, progress);
    }, [progress]);

    const updateProgress = () => {
        setProgress((prev: number) => (prev < 3 ? prev + 1 : prev)); // only increase progress if less than 3
    };

    const goalClass: string = goal.color === 'pink' ? 'levels-block-pink' : 'levels-block-purple';

    return (
        <div className="fullBlock" data-testid='levelsBlock'>
            <div data-testid="levelsButton" className={goalClass} key={goal.name} onClick={updateProgress}>{goal.name}</div>
            <div className="lightTracker">
                <div data-testid="level3" className={`statusLight ${progress === 3 ? 'isDone' : 'isOff'}`}></div>
                <div data-testid="level2"  className={`statusLight ${progress === 3 ? 'isDone' : progress === 2 ? 'isPartway' : 'isOff'}`}></div>
                <div data-testid="level1"  className={`statusLight ${progress === 3 ? 'isDone' : progress === 2 ? 'isPartway' : progress === 1 ? 'isStarted' : 'isOff'}`}></div>
            </div>
        </div>
    );
}
