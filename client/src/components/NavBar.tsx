import { Link } from 'react-router-dom';
import HomeButton from '../assets/navigation/home-button.png';
import CreateButton from '../assets/navigation/createnew-button.png';
// import PlanetButton from '../assets/navigation/planet-button.png';
import EditButton from '../assets/navigation/edit-button.png';
import '../styles/ProgressBar.css';
import '../styles/NavBar.css';

interface NavBarProps {
    tabs: any
    goalXPBar: any
    currentXP: any
}

export default function NavBar(props: NavBarProps) {

    const formattedDate: any = formatDate(new Date())

    return (
        <>
        <div className="nav-container">
            <div className="home">
                <Link to="/home"><img src={HomeButton} className="nav-icon"/></Link>
            </div>
            <div className='categories'>
                {props.tabs.length > 0 && props.tabs.map((tab: any) => {
                    if (tab.name) {
                        const hyphenatedName = tab.name.replace(/\s+/g, '-');
                        return <Link to={`/${hyphenatedName}`} key={tab.name}><img src={tab.icon} className="nav-icon"/></Link>;
                    }
                    return null;
                })}
            </div>
            <div className={`${props.tabs.length ? 'categories' : null}`}>
                {/* <img src={PlanetButton} className="nav-icon" /> */}
                <Link to="/create-new"><img src={CreateButton} className="nav-icon" /></Link>
                <Link to="/edit"><img src={EditButton} className="nav-icon" /></Link>
            </div>
            <div className="date-display">{formattedDate}</div>
            <div className="barBox" id="nav-completion-bar-box">
                <div className="progress-container" id="nav-completion-bar">
                    <div className='progress-bar xpbar-fill' style={{ width: `${(props.currentXP / props.goalXPBar) * 100}%` }}></div>
                </div>
            </div>
        </div>
        {/* <span className="hover-text">{hoveredText}</span> */}
        </>
    )
}

const formatDate = (date: any) => {
    const dateFormat: any = date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    const parts: any = dateFormat.split(' ');
    const dayOfWeek: any = parts[0];
    const restOfDate: any = parts.slice(1).join(' ');
    return `${dayOfWeek}, ${restOfDate}`;
}
