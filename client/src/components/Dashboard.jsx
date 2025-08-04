import React from 'react';
import DashboardCard from './DashboardCard';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';



const serverStatus = [
  {
    id: 0,
    value: 7,
    label: 'On',
    color: '#B2E2B2', // soft green
  },
  {
    id: 1,
    value: 3,
    label: 'Off',
    color: '#F9C0C0', // soft red
  },
];

const valueFormatter = (value) => `${value} servers`;


const dbStats = [
  { name: 'db1', queries: 300 },
  { name: 'db2', queries: 180 },
  { name: 'db3', queries: 400 },
  { name: 'db4', queries: 120 },
  { name: 'db6', queries: 500 },
  { name: 'db7', queries: 320 },
  { name: 'db8', queries: 210 },
  { name: 'db9', queries: 100 },
  { name: 'db10', queries: 920 },
  { name: 'db5', queries:820 },
  { name: 'db5', queries: 230 },
  { name: 'db5', queries: 240 },
  { name: 'db5', queries: 250 },
  { name: 'db5', queries: 280 },
  { name: 'db5', queries: 210 },
  { name: 'db5', queries: 20 },
  { name: 'db5', queries: 120 },
  { name: 'db5', queries: 780 },
  { name: 'db5', queries: 670 },
  { name: 'db5', queries: 250 },
  { name: 'db5', queries: 350 },
  { name: 'db5', queries: 450 },
  { name: 'db5', queries: 330 },
  { name: 'db5', queries: 440 },

];

// Sort databases from most to least queries
const sortedStats = [...dbStats].sort((a, b) => b.queries - a.queries);

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <DashboardCard type="dbtotal" value={12} percentage={100} color="#BDE0FE" />
        <DashboardCard type="dbdisconnected" value={2} percentage={17} color="#FADADD" />
        <DashboardCard type="stotal" value={10} percentage={83} color="#BDE0FE" />
        <DashboardCard type="sdisconnected" value={10} percentage={83} color="#FADADD" />
      </div>


      <div style={styles.bottomSection}>
        <div style={styles.chartLeft}>
          <h3 style={styles.chartTitle}>Database Query Activity</h3>
          <ResponsiveContainer width="100%" height='100%' style={{ marginTop: '8px' }}>

            <BarChart data={sortedStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="queries" fill="#BDE0FE" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.rightPlaceholder}>
  <h3 style={styles.pieChartTitle}>Server Status</h3>
  <PieChart
    series={[
      {
        arcLabel: (item) => `${item.label}: ${item.value}`,
        data: serverStatus,
        innerRadius: 50,
        outerRadius: 100,
      },
    ]}
    sx={{
      [`& .${pieArcLabelClasses.root}`]: {
        fill: '#000',
        fontSize: 14,
      },
    }}
    height={300}
  />
</div>


      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    padding: '2vw',
    backgroundColor: '#F5F7FA',
    overflow: 'hidden',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  bottomSection: {
    flex: 0.9, 
    display: 'flex',
    gap: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '22px',
    overflow: 'hidden',
  },

  chartLeft: {
  width: '60%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign:'center',
},
  pieChartTitle: {
    marginBottom: '16px',
    marginTop: 0,
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    textAlign:'center',
  },

  chartTitle: {
    marginBottom: '16px',
    marginTop: 0,
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    textAlign:'center',
  },
  rightPlaceholder: {
    width: '40%',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
  },
};


export default Dashboard;
