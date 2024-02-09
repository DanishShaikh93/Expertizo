import { UseSelector, useSelector } from "react-redux"
function Dashboard() {
    
    const theme = useSelector(state => state.theme);

    return (
      <div className="container" style={{background: theme}}>
        <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard