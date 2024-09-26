import React from "react";
import SimpleGoal from "./templates/SimpleGoal.jsx";
import ProgressBar from "./templates/ProgressBar.jsx";
import LevelsBlock from "./templates/LevelsBlock.jsx";
import Sets from "./templates/Sets.jsx";

interface GoalProps{
        goal: {
            type: 'Simple List' | 'Progress Bar' | 'Levels' | 'Sets';
            [key: string]: any;
        };
        blockCount?: number;
}

export default function Goal({goal, blockCount}: GoalProps) {

    return (
        <div className="goal-container">
            {goal.type === 'Simple List' ? 
            <SimpleGoal goal={goal}/> :
            goal.type === 'Progress Bar' ?
            <ProgressBar goal={goal}/> :
            goal.type === 'Levels' ?
            <LevelsBlock goal={goal}/> :
            goal.type === 'Sets' ?
            <Sets goal={goal}/> : null}
        </div>
    );
}