import HomePlanner from "./HomePage-Planner";
import HomeOverview from "./HomePage-Overview";
import { Routes, Route} from 'react-router-dom';
import '../styles/HomePage.css'

interface HomePageProps {
    tabs: any,
    goals: any
}

export default function HomePage(props: HomePageProps) {

    return (
        <div className="home-container">
            <Routes>
                <Route path="/plan" element={<HomePlanner />} />
                <Route path="/" element={<HomeOverview tabs={props.tabs} goals={props.goals}/>} />
            </Routes>
        </div>
    )
}