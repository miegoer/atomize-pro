import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import CreateNew from './components/CreateNew.jsx';
import CreateNewList from './components/CreateNewList.jsx';
import CreateNewTab from './components/CreateNewTab.tsx';
import CreateNewGoal from './components/CreateNewGoal.jsx';
import MakeEdits from './components/MakeEdits.jsx';
import HomePage from './components/HomePage.tsx';
import Tab from './components/Tab.jsx';
import { fetchAllTabs, fetchAllGoals } from "./ApiService.tsx";
import './App.css'

function App() {

  const [tabs, setTabs] = useState<any>([]);
  const [goals, setGoals] = useState<any>([]);
  // const [lists, setLists] = useState<any>([]);

  const [goalXPBar, setGoalXPBar] = useState<any>(0);
  const [currentXP, setCurrentXP] = useState<any>(0);

  const calculateXPGoal = (goals: any) => {
    goals.map((goal: any) => goal.type === 'Simple List' ? setGoalXPBar((prev: any) => prev + 1) : goal.type === 'Levels' ? setGoalXPBar((prev: any) => prev + 3) : goal.type === 'Sets' ? setGoalXPBar((prev: any) => prev + goal.sets) : goal.type === 'Progress Bar' ? setGoalXPBar((prev: any) => prev + 10) : null);
    goals.map((goal: any) => goal.type === 'Simple List' && goal.complete ? setCurrentXP((prev: any) => prev + 1) : goal.type === 'Sets' ? setCurrentXP((prev: any) => prev + goal.completed_sets) : goal.type === 'Levels' ? setCurrentXP((prev: any) => prev + goal.level) : goal.type === 'Progress Bar' ? setCurrentXP((prev: any) => prev + Math.round(goal.current / goal.goal_number * 10)) : null)
  };

  const loadTabs = async () => {
    try {
      const fetchedTabs: any = await fetchAllTabs();
      if (fetchedTabs && fetchedTabs.length > 0) {
          setTabs(fetchedTabs);
      } else {
          setTabs([]);
      }
  } catch (error: any) {
      console.error("Error fetching tabs:", error);
      setTabs([]);
    }
  };

  const loadGoals = async () => {
    try {
        const fetchedGoals: any = await fetchAllGoals();
        if (fetchedGoals && Array.isArray(fetchedGoals.simple) && Array.isArray(fetchedGoals.progbars) && Array.isArray(fetchedGoals.levels) && Array.isArray(fetchedGoals.sets)) {
            const allGoals: any = [
                ...fetchedGoals.simple,
                ...fetchedGoals.progbars,
                ...fetchedGoals.levels,
                ...fetchedGoals.sets
            ];
            setGoals(allGoals);
        } else {
            setGoals([]);
        }
    } catch (error: any) {
        console.error("Error fetching goals:", error);
        setGoals([]);
    }
};

    useEffect(() => {
      loadTabs();
      loadGoals();
    }, []);

    useEffect(() => {
      if (goals.length > 0) {
        calculateXPGoal(goals);
      }
    }, [goals]);

  return (
    <div className="wrapper">
      <NavBar goalXPBar={goalXPBar} currentXP={currentXP} tabs={tabs}/>
      <Routes>
        <Route path="/home/*" element={<HomePage tabs={tabs} goals={goals} />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/create-new/list" element={<CreateNewList loadGoals={loadGoals} tabs={tabs} />} />
        <Route path="/create-new/tab" element={<CreateNewTab tabs={tabs}/>} />
        <Route path="/create-new/goal" element={<CreateNewGoal tabs={tabs}/>} />
        <Route path="/edit" element={<MakeEdits tabs={tabs} goals={goals}/>} />
        {tabs.length > 0 && tabs.map((tab: any) => {
          if (tab.name) {
            const hyphenatedName = tab.name.replace(/\s+/g, '-');
            return <Route key={hyphenatedName} path={`/${hyphenatedName}`} element={<Tab tab={tab} goals={goals} />} />;
        }
          return null;
        })}
      </Routes>
    </div>
  )
}

export default App
