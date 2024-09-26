import SimpleGoal from "./templates/SimpleGoal.tsx";
import ProgressBar from "./templates/ProgressBar.tsx";
import LevelsBlock from "./templates/LevelsBlock.tsx";
import Sets from "./templates/Sets.tsx";

export default function Goal({goal, blockCount}) {

    return (
        <div className="goal-container">
            {goal.type === 'Simple List' ? <SimpleGoal goal={goal}/> : goal.type === 'Progress Bar' ? <ProgressBar goal={goal}/> : goal.type === 'Levels' ? <LevelsBlock goal={goal}/> : goal.type === 'Sets' ? <Sets goal={goal}/> : null}
        </div>
    )
}