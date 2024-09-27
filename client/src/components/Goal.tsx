import React from "react";
import SimpleGoal from "./templates/SimpleGoal.tsx";
import ProgressBar from "./templates/ProgressBar.tsx";
import LevelsBlock from "./templates/LevelsBlock.tsx";
import Sets from "./templates/Sets.tsx";

interface GoalProps {
    goal: {
        type: 'Simple List' | 'Progress Bar' | 'Levels' | 'Sets';
        [key: string]: any;
    };
    blockCount?: number;
}

export default function Goal({ goal, blockCount }: GoalProps) {

    return (
        <div className="goal-container">
            {goal.type === 'Simple List' ?
                <SimpleGoal goal={goal} /> :
                goal.type === 'Progress Bar' ?
                    <ProgressBar goal={goal} /> :
                    goal.type === 'Levels' ?
                        <LevelsBlock goal={goal} /> :
                        goal.type === 'Sets' ?
                            <Sets goal={goal} /> : null}
        </div>
    );
}