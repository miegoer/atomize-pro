import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AddSomeSimple from "./AddSomeSimple.jsx";
import AddSomeBars from "./AddSomeBars.tsx";
import AddSomeLevels from "./AddSomeLevels.tsx";
import AddSomeSets from "./AddSomeSets.jsx";
import AddSomeMixed from "./AddSomeMixed.tsx";
import {createGoal, insertListPosition} from '../../ApiService.tsx'

interface AddSomeGoalsProps {
    listName: any
    template: any
    selectedTab: any
    loadGoals: any
}

export default function AddSomeGoals(props: AddSomeGoalsProps) {

    const navigate = useNavigate(); // Must use at the top of the component

    const [finalGoals, setFinalGoals] = useState<any>([])

    const finalizeGoals = (childGoals: any) => {
        setFinalGoals(childGoals);
    }

    const findPath = () => {
        return props.selectedTab.name.replace(/\s+/g, '-');
    }

    const findColPosition = () => {
        if (!props.selectedTab.col_one) {
            return 'col_one'
        } else if (!props.selectedTab.col_two) {
            return 'col_two'
        } else if (!props.selectedTab.col_three) {
            return 'col_three';
        }
    }

    const handleSubmit = async (goals: any) => {
        console.log(goals)
        try {
            await Promise.all(goals.map((goal: any) => createGoal(goal)));
            console.log('All goals have been submitted successfully');
            try {
                const col = findColPosition();
                await insertListPosition(props.selectedTab.name, props.listName, col);
            } catch (error) {
                console.log('Error inserting list position:', error);
            }
            const path = findPath();
            navigate(`/${path}`);
            props.loadGoals();
            window.location.reload();
        } catch (error) {
            console.log('Error submitting goals:', error);
        }
    };

    return (
        <>
        <div className="add-some-goals-container">
            <div id="list-title">{props.listName}</div>
            {props.template === 'Simple List' ? <AddSomeSimple listName={props.listName} finalizeGoals={finalizeGoals} selectedTab={props.selectedTab}/> : props.template === 'Progress Bar' ? <AddSomeBars listName={props.listName} finalizeGoals={finalizeGoals} selectedTab={props.selectedTab}/> : props.template === 'Levels' ? <AddSomeLevels listName={props.listName} finalizeGoals={finalizeGoals} selectedTab={props.selectedTab}/> : props.template === 'Sets' ? <AddSomeSets listName={props.listName} finalizeGoals={finalizeGoals} selectedTab={props.selectedTab}/> : props.template === 'Mixed' ? <AddSomeMixed listName={props.listName} finalizeGoals={finalizeGoals} selectedTab={props.selectedTab}/> : null}
        </div>
        <button className="create-list-goals-button" id="submit-list-goals" onClick={()=> {handleSubmit(finalGoals)}}>Create List &rarr;</button>
     </>
    )
}