import { useState, useEffect } from "react";
import OrangeDelete from '../../assets/other/orange-delete-button.png';
import '../../styles/AddSome.css';

interface AddSomeSetsProps {
    listName: any
    finalizeGoals: any
    selectedTab: any
}

export default function AddSomeSets(props: AddSomeSetsProps) {

    const [goals, setGoals] = useState<any>([{name: '', list: props.listName, tab: props.selectedTab.name, type: 'Sets', color: 'purple', order_no: 1, active: true, complete: false, last_completed: null, sets: undefined, reps: undefined, completed_sets: 0}])

    const handleChange = (index: any, field: any, value: any) => {
        const updatedGoals = goals.map((goal: any, i: any) => (i === index ? { ...goal, [field]: value } : goal));
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
        <table><tbody><tr>
        <th> </th><th>Goal name</th><th>Sets</th><th>Reps</th><th>Color</th>
        </tr>
        {goals.map((goal: any, index: any) => (
            <tr key={`goal-${index}`}>
                <td className="remove-by-index" onClick={() => {removeItem(index)}}><img src={OrangeDelete} className="delete-icon" /></td>
                <td><input type="text" className={`name-goal rounded-input name-small-input ${goal.color}`} value={goal.name} onChange={(e) => handleChange(index, 'name', e.target.value)}/></td>
                <td>
                    <input type="number" className="rounded-input small-input" value={goal.sets} onChange={(e) => handleChange(index, 'sets', e.target.value)}></input>
                </td>
                <td>
                    <input type="text" className="rounded-input small-input" value={goal.reps} onChange={(e) => handleChange(index, 'reps', e.target.value)}></input>
                </td>
                <td>
                    <div className={`color-box ${goal.color}`} onClick={openColorBox}></div>
                    <div className="color-choices">
                        <div className="color-option purple" onClick={() => {handleGoalColorChange(index, 'purple')}}></div>
                        <div className="color-option yellow-green" onClick={() => {handleGoalColorChange(index, 'yellow-green')}}></div>
                    </div>
                </td>
            </tr>
        ))}
        </tbody></table>
        <button id="add-another-goal" onClick={() => setGoals([...goals, {name: '', list: props.listName, tab: props.selectedTab.name, type: 'Sets', color: 'purple', order_no: goals.length + 1, active: true, complete: false, last_completed: null, sets: undefined, reps: undefined, completed_sets: 0}])}> Add + </button>
        </>
    )
}