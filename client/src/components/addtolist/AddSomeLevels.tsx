import { useState, useEffect } from "react";
import OrangeDelete from '../../assets/other/orange-delete-button.png';
import '../../styles/AddSome.css';

interface AddSomeLevelsProps {
    listName: any;
    finalizeGoals: any;
    selectedTab: any;
}

export default function AddSomeLevels(props: AddSomeLevelsProps) {

    const [goals, setGoals] = useState<any>([{name: '', list: props.listName, tab: props.selectedTab.name, type: 'Levels', color: 'purple', order_no: 1, active: true, complete: false, last_completed: null, level: 0}])

    const handleGoalNameChange = (index: any, value: any) => {
        const updatedGoals = goals.map((goal: any, i: any) => (i === index ? { ...goal, name: value } : goal));
        setGoals(updatedGoals);
    };

    const handleGoalColorChange = (index: any, value: any) => {
        const updatedGoals = goals.map((goal: any, i: any) => (i === index ? { ...goal, color: value } : goal));
        setGoals(updatedGoals);
    };

    function openColorBox(event: any) {
        const colorChoices = event.target.nextElementSibling;
        colorChoices.style.display = colorChoices.style.display === 'block' ? 'none' : 'block';
    }

    function removeItem(indexToRemove: any) {
        const updatedGoals = goals.filter((goal: any, index: any) => index !== indexToRemove);
        setGoals(updatedGoals);
    }

    useEffect(() => {
        props.finalizeGoals(goals);
      }, [goals])

    return (
        <>
        <table><tbody>
        <tr><th> </th><th>Goal name</th><th>Color</th>
        </tr>
        {goals.map((goal: any, index: any) => (
            <tr key={`goal-${index}`}>
                 <td className="remove-by-index" onClick={() => {removeItem(index)}}><img src={OrangeDelete} className="delete-icon" /></td>
                <td>
                    <input type="text" className={`name-goal name-simple ${goal.color}`} value={goal.name} onChange={(e) => handleGoalNameChange(index, e.target.value)}/>
                </td>
                <td>
                    <div className={`color-box ${goal.color}`} onClick={openColorBox}></div>
                    <div className="color-choices">
                        <div className="color-option purple" onClick={() => {handleGoalColorChange(index, 'purple')}}></div>
                        <div className="color-option pink" onClick={() => {handleGoalColorChange(index, 'pink')}}></div>
                    </div>
                </td>
            </tr>
        ))}
        </tbody></table>
        <button id="add-another-goal" onClick={() => setGoals([...goals, {name: '', list: props.listName, tab: props.selectedTab.name, type: 'Levels', color: 'purple', order_no: goals.length + 1, active: true, complete: false, last_completed: null, level: 0}])}> Add + </button>
        </>
    )
}