import React from "react";
import SimpleGoal from "./templates/SimpleGoal";
import ProgressBar from "./templates/ProgressBar";
import LevelsBlock from "./templates/LevelsBlock";
import Sets from "./templates/Sets";
import {GoalAll} from "./interfaces/GoalType";

export default function Goal({goal}: GoalAll) {

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