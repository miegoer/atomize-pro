import { useState, useEffect } from "react";
import AddSomeSimple from "./AddSomeSimple.tsx";
import AddSomeLevels from "./AddSomeLevels.tsx";
import AddSomeSets from "./AddSomeSets.tsx";
import AddSomeBars from "./AddSomeBars.tsx";
import '../../styles/AddSome.css';

interface AddSomeMixedProps {
    listName: any
    finalizeGoals: any
    selectedTab: any
}

export default function AddSomeMixed(props: AddSomeMixedProps) {

    // This component has not yet been updated to reflect changes in other goal AddSome components.

    const [goals, setGoals] = useState<any>([])

    const [firstBlock, setFirstBlock] = useState<any>('');
    const [secondBlock, setSecondBlock] = useState<any>('');
    const [thirdBlock, setThirdBlock] = useState<any>('');

    useEffect(() => {
        props.finalizeGoals(goals);
      }, [goals])

    return (
        <>
        { firstBlock ? <div className="section-header">{firstBlock}</div> : null }
        {!firstBlock ? <div className="first-block add"><div className="block-text">+ Add Block</div>
            <div className="goal-options">
                <span className="goal-option-button" onClick={() => setFirstBlock('Simple List')}>Simple List</span>
                <span className="goal-option-button" onClick={() => setFirstBlock('Progress Bar')}>Progress Bar</span>
                <span className="goal-option-button" onClick={() => setFirstBlock('Levels')}>Levels</span>
                <span className="goal-option-button" onClick={() => setFirstBlock('Set')}>Set</span>
            </div>
        </div> : null}
        { firstBlock === 'Simple List' ? <><AddSomeSimple listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/><br></br></> : firstBlock === 'Progress Bar' ? <AddSomeBars listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : firstBlock === 'Levels' ? <AddSomeLevels listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : firstBlock === 'Set' ? <AddSomeSets listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : null}
        { secondBlock ? <div className="section-header">{secondBlock}</div> : null }
        {!secondBlock ? <div className="second-block add"><div className="block-text">+ Add Block</div>
            <div className="goal-options">
                <span className="goal-option-button" onClick={() => setSecondBlock('Simple List')}>Simple List</span>
                <span className="goal-option-button" onClick={() => setSecondBlock('Progress Bar')}>Progress Bar</span>
                <span className="goal-option-button" onClick={() => setSecondBlock('Levels')}>Levels</span>
                <span className="goal-option-button" onClick={() => setSecondBlock('Set')}>Set</span>
            </div>
        </div> : null}
        { secondBlock === 'Simple List' ? <><AddSomeSimple listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/><br></br></> : secondBlock === 'Progress Bar' ? <AddSomeBars listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : secondBlock === 'Levels' ? <AddSomeLevels listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : secondBlock === 'Set' ? <AddSomeSets listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : null}
        { thirdBlock ? <div className="section-header">{thirdBlock}</div> : null }
        {!thirdBlock ? <div className="third-block add"><div className="block-text">+ Add Block</div>
            <div className="goal-options">
                <span className="goal-option-button" onClick={() => setThirdBlock('Simple List')}>Simple List</span>
                <span className="goal-option-button" onClick={() => setThirdBlock('Progress Bar')}>Progress Bar</span>
                <span className="goal-option-button" onClick={() => setThirdBlock('Levels')}>Levels</span>
                <span className="goal-option-button" onClick={() => setThirdBlock('Set')}>Set</span>
            </div>
        </div> : null}
        { thirdBlock === 'Simple List' ? <><AddSomeSimple listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/><br></br></> : thirdBlock === 'Progress Bar' ? <AddSomeBars listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : thirdBlock === 'Levels' ? <AddSomeLevels listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : thirdBlock === 'Set' ? <AddSomeSets listName={props.listName} selectedTab={props.selectedTab} finalizeGoals={props.finalizeGoals}/> : null}
        </>
    )
}