import React, {useState, useEffect} from "react";
import Goal from "./Goal";
import {SetGoal} from "./interfaces/GoalType";

interface ListType {
    col_one: string;
    col_two: string;
    col_three: string;
}

interface ListProps {
    list: string; 
    tabGoals: any;
    tab: any;
}

export default function List({list, tabGoals, tab}: ListProps) {

    // Rendering and styling still incomplete

    // State to hold filtered goals
    const [listGoals, setListGoals] = useState<SetGoal[]>([]);

    let blockCount = 0;

    // Sort Goals by the list they belong to and count 'Levels' type goals 
    const sortGoals = () => {
        const thisListGoals = tabGoals.filter((goal: { list: string; }) => goal.list === list);
        setListGoals(thisListGoals);

        // Increment blockCount for each goal of type 'Levels'
        thisListGoals.map((goal: { type: string; }) => goal.type === 'Levels' ? blockCount++ : null);
    };

    useEffect(() => {
        sortGoals();
    }, [tabGoals, list]);

    return (
        <div className="list-container" 
        id = {`${tab.col_one === list ? 'col1' : 
                tab.col_two === list ? 'col2' : 'col3' }`}>
            
            <div id="list-heading">{list}</div>
            <div className="goal-content-container">
                {listGoals.map((goal,index) => <Goal key={index} goal={goal} />)}
            </div>

        </div>
    )
}