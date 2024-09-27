interface HomeOverviewProps {
    tabs: any
    goals: any
}


export default function HomeOverview(props: HomeOverviewProps) {

    // Home will show a simple overview of all tabs and the lists inside them.

    return (
        <div className="overview-container">
            {props.tabs.map((tab: any) => (
                <div className="tab-overview-box" key={tab.name}>
                    <h4 className="overview-header">{tab.name}</h4>
                    <div className="goals-overview">
                        {props.goals.map((goal: any) => 
                            goal.tab === tab.name ? <span key={goal.name}>O</span> : null
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}