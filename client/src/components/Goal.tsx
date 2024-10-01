import React from "react";
import SimpleGoal from "./templates/SimpleGoal";
import ProgressBar from "./templates/ProgressBar";
import LevelsBlock from "./templates/LevelsBlock";
import Sets from "./templates/Sets";

interface GoalProps{
        goal: {
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