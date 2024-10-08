import React, { useState, useEffect } from "react";
import Delete from '../../assets/other/delete-button.png';
import OrangeDelete from '../../assets/other/orange-delete-button.png';
import '../../styles/AddSome.css';

export default function AddSomeBars({listName, finalizeGoals, selectedTab}) {

    const [goals, setGoals] = useState([{name: '', list: listName, tab: selectedTab.name, type: 'Progress Bar', color: 'turq-gradient', order_no: 1, active: true, complete: false, last_completed: null, current: 0, goal_number: 0, units: ''}])

    const handleGoalNameChange = (index, value) => {
        const updatedGoals = goals.map((goal, i) => (i === index ? { ...goal, name: value } : goal));
        setGoals(updatedGoals);
        console.log(goals);
    };

    const handleGoalNumberChange = (index, value) => {
        const updatedGoals = goals.map((goal, i) => (i === index ? { ...goal, goal_number: value } : goal));
        setGoals(updatedGoals);
    };

    const handleGoalUnitsChange = (index, value) => {
        const updatedGoals = goals.map((goal, i) => (i === index ? { ...goal, units: value } : goal));
        setGoals(updatedGoals);
    };

    const handleGoalColorChange = (index, value) => {
        const updatedGoals = goals.map((goal, i) => (i === index ? { ...goal, color: value } : goal));
        setGoals(updatedGoals);
    };

    function openColorBox(event) {
        const colorChoices = event.target.nextElementSibling;
        colorChoices.style.display = colorChoices.style.display === 'block' ? 'none' : 'block';
    }

    function removeItem(indexToRemove) {
        const updatedGoals = goals.filter((goal, index) => index !== indexToRemove);
        setGoals(updatedGoals);
    }

    useEffect(() => {
        finalizeGoals(goals);
      }, [goals])

    return (
        <>
        <table><tbody>
        <tr>
        <th> </th><th>Goal name</th><th>Daily Goal</th><th>Units</th><th>Fill</th>
        </tr>
        {goals.map((goal, index) => (
            <tr key={`goal-${index}`}>
                <td className="remove-by-index" onClick={() => {removeItem(index)}}><img src={OrangeDelete} className="delete-icon" /></td>
                <td><input type="text" className={`rounded-input name-small-input bar-input ${goal.color}`} value={goal.name} onChange={(e) => handleGoalNameChange(index, e.target.value)}/></td>
                <td>
                    <input type="number" className={`small-input rounded-input ${goal.color}`} value={goal.goal_number} onChange={(e) => handleGoalNumberChange(index, e.target.value)}></input>
                </td>
                <td>
                    <input type="text" className={`small-input rounded-input ${goal.color}`} value={goal.units} onChange={(e) => handleGoalUnitsChange(index, e.target.value)}></input>
                </td>
                <td>
                    <div className={`color-box ${goal.color}`} value={goal.color} onClick={openColorBox}></div>
                    <div className="color-choices">
                        <div className="color-option turq-gradient" onClick={() => {handleGoalColorChange(index, 'turq-gradient')}}></div>
                        <div className="color-option orange-gradient" onClick={() => {handleGoalColorChange(index, 'orange-gradient')}}></div>
                        <div className="color-option purple-gradient" onClick={() => {handleGoalColorChange(index, 'purple-gradient')}}></div>
                        <div className="color-option yellow-gradient" onClick={() => {handleGoalColorChange(index, 'yellow-gradient')}}></div>
                    </div>
                </td>
            </tr>
        ))}
        </tbody></table>
        <button id="add-another-goal" onClick={() => setGoals([...goals, {name: '', list: listName, tab: selectedTab.name, type: 'Progress Bar', color: 'turq-gradient', order_no: goals.length + 1, active: true, complete: false, last_completed: null, current: 0, goal_number: 0, units: ''}])}> Add + </button>
        </>
    )
}