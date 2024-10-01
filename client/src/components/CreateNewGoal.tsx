import {React, useState} from "react";
import AddSomeSimple from "./addtolist/AddSomeSimple.tsx";
import AddSomeGoals from "./addtolist/AddSomeGoals.tsx";
import AddSomeBars from "./addtolist/AddSomeBars.tsx";

interface Tab {
    name: string;
    icon: string;
    col_one?: string;
    col_one_b?: string;
    col_two?: string;
    col_two_b?: string;
    col_three?: string;
    col_three_b?: string;
}

interface CreateNewGoal{
    tabs?: any; 
}

export default function CreateNewGoal({tabs}: CreateNewGoal) {

    // This component is not yet complete and will not run as expected.

    const [selectedTab, setSelectedTab] = useState<any>([]);
    const [selectedList, setSelectedList] = useState<any>('');
    const [goalName, setGoalName] = useState<any>('');
    const [goalColor, setGoalColor] = useState<any>('purple');
    const [template, setTemplate] = useState<any>('Simple List')

    const listTypes = ['Simple List', 'Levels', 'Sets', 'Progress Bar']

    const handleSelectTab = (selectedTabIcon: any) => {
        setSelectedTab(selectedTabIcon)
    }

    const handleSelectList = (listName:any) => {
        setSelectedList(listName);
    }

    const handleNameChange = (event:any) => { setGoalName(event.target.value) }

    const handleGoalColorChange = (value:any) => {
        setGoalColor(value)
    };

    const handleChooseTemplate = (template:any) => { setTemplate(template) }

    function openColorBox(event:any) {
        const colorChoices = event.target.nextElementSibling;
        colorChoices.style.display = colorChoices.style.display === 'block' ? 'none' : 'block';
    }
    
    const tabAttributes = ['col_one', 'col_one_b', 'col_two', 'col_two_b', 'col_three', 'col_three_b'];


    return (
        <div className="new-goal-container"><form>
            <div className="list-tab-details">
                <div className="left-col-create">
                    <span className="form-text">CHOOSE TAB:</span>
                    <div className="choose-tab-for-goal">
                        {tabs.length > 0 ? (tabs.map((tab: any) => (
                            <img key={tab.name} src={tab.icon}
                                className={`nav-icon ${selectedTab === tab ? 'chosen-tab-selected' : ''}`}
                                onClick={() => { handleSelectTab(tab); }}/>))) : (<p>No existing tabs!</p>)}</div></div>
                    <div className="right-col-create">
                        <span className="form-text">CHOOSE LIST:</span>
                        <div className="choose-list-for-goal">
                        {tabAttributes.map((attribute) => {
                            const value = selectedTab[attribute];
                            return value !== null ? (
                            <div className={`list-selector ${selectedList === value ? 'item-chosen' : null}`} onClick={()=>{handleSelectList(value)}} key={attribute}>
                                <span className="selector-text">{value}</span>
                            </div>
                            ) : null})}
                        </div>
                    </div>
                </div>
                <div className="template-options" id ="goal-direct">
                    {listTypes.map(type => (
                        <>
                        <span className={`${template === type ? 'template-item-chosen' : 'template-item'}`} onClick={() => handleChooseTemplate(type)}>{type}</span>

                        </>
                    ))}
                </div>
                <div className="new-goal-info">
            <table><tbody><tr>
        <th>Goal name</th><th>Color</th>
        </tr>
            <tr>
                <td>
                <input type="text" className={`name-goal name-simple ${goalColor}`} value={goalName} onChange={handleNameChange} />

                </td>
                <td>
                    <div className={`color-box ${goalColor}`} onClick={openColorBox} id="color-box-goal"></div>
                    <div className="color-choices">
                        <div className="color-option purple" onClick={() => {handleGoalColorChange('purple')}}></div>
                        <div className="color-option yellow-green" onClick={() => {handleGoalColorChange('yellow-green')}}></div>
                        <div className="color-option orange" onClick={() => {handleGoalColorChange('orange')}}></div>
                        <div className="color-option red" onClick={() => {handleGoalColorChange('red')}}></div>
                    </div>
                </td>
            </tr>
        </tbody></table>
                </div>
            </form>
            <button type="submit" id="create-goal-now">Create Goal</button>
        </div>
    )
}