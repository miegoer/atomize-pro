import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import '../styles/Tab.css';
import List from "./List";

// Define interfaces for props and state

interface TabType {
  name: string;
  col_one?: string;
  col_one_b?: string;
  col_two?: string;
  col_two_b?: string;
  col_three?: string;
  col_three_b?: string;
}

interface GoalType {
  tab: string;
  list: string;
}

interface TabProps {
  tab: TabType;
  goals: any;
}

function BlankPage() {
    return (
      <div id="empty-page-prompt">
        <h4 id="empty-page-text">This page is empty!</h4>Would you like to add a new list now?
        <Link to="/create-new/list">
        <button id="empty-page-button">OK &rarr;</button>
        </Link>
      </div>
    );
  }

export default function Tab({tab, goals}: TabProps) {

    // Rendering and styling still incomplete

    const [tabGoals, setTabGoals] = useState([]);
    const [tabLists, setTabLists] = useState([]);

    const sortData = () => {
      const result: any = goals.filter((goal: { tab: string; }) => goal.tab === tab.name)
      setTabGoals(result);

      const uniqueLists: any = Array.from(new Set(result.map((goal: { list: any; }) => goal.list)));
        setTabLists(uniqueLists);
    }
        useEffect(() => {
        sortData();
    }, [goals, tab.name]);
    

    return (
      <>
        <h2 className="tab-header">⸻ {tab.name} ⸻</h2>
        {!tab.col_one && !tab.col_one_b && !tab.col_two && !tab.col_two_b && !tab.col_three && !tab.col_three_b ? <div className="blank-prompt-container"><BlankPage /></div> : 
            <div className="all-lists-container">
                {tabLists.map(list => <List key={tab.name} tab={tab} list={list} tabGoals={tabGoals}/>)}
            </div>}
      </>
    )
}