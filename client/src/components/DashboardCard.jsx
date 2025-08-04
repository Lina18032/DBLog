import React from 'react';
import { PieChart, Pie, Cell ,Legend} from 'recharts';
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';


const DashboardCard = ({ type, value, percentage, color }) => {
  const icons = {
    stotal: <StorageRoundedIcon style={styles.icon} />,
    dbtotal:<StorageRoundedIcon style={styles.icon} />,
    sdisconnected: <FaAngleDoubleDown style={styles.icon} />,
    dbdisconnected: <FaAngleDoubleDown style={styles.icon} />,
  };
  

  const pieData = [
    { name: 'Used', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  const COLORS = [color, '#f0f0f0'];

  const titles = {
    
    stotal: 'Total Servers',
    dbtotal:'Total Databases',
    sdisconnected: 'Down servers',
    dbdisconnected: 'Disconnected databases',
  };

  return (
    <div style={{ ...styles.card, backgroundColor: `${color}99` }}>

      <div style={styles.left}>
        <div style={styles.topRow}>
  {icons[type]}
  <div style={styles.label}>{titles[type]}</div>
</div>
<div style={styles.value}>{value}</div>


      </div>
      <div style={styles.right}>
        <PieChart width={80} height={80}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={30}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <div style={styles.percentage}>{percentage}%</div>
      </div>
    </div>
  );
};

const styles = {


  card: {
    width: '29vw', 
    height: '20vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '10px',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },


  icon: {
    fontSize: 24, // Smaller icon to reduce emphasis
    opacity: 0.8,  // Slightly faded
  },
  left: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  paddingLeft: '8px',
  paddingTop: '8px',
  height: '100%', // Needed for margin auto to work
},



topRow: {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
},

label: {
  fontSize: '16px',
  color: '#666',
  fontWeight: '600',
},

value: {
  fontSize: '28px',
  fontWeight: '700',
  color: '#222',
  marginTop: 'auto', // Pushes it down to center vertically
  marginBottom: 'auto', // Optional: adds symmetry
},

right: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '16px', // Push pie chart lower
},


  percentage: {
    marginTop: '4px',
    fontWeight: 'bold',
  },
};

export default DashboardCard;
