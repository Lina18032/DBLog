import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Navbar from './navbar';
import InfoCard from './InfoCard';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNew';
import TableChartRoundedIcon from '@mui/icons-material/TableChart';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTime';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAlt';
import Tables from './Tables';
import BackupSection from './BackupSection';
import ReplicationSection from './ReplicationSection';
import DatabaseJobsAccordion from './JobsSection';
import LogsPage from './Logs';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Box sx={{ width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '5vh', flexWrap: 'wrap', padding: '4vh' }}>
      <InfoCard icon={<PowerSettingsNewRoundedIcon fontSize="large" sx={{ color: '#0058A1' }}/>} title="Database Status" sx={{ fontWeight: 'bold' }} value="connected" />
      <InfoCard icon={<TableChartRoundedIcon fontSize="large" sx={{ color: '#0058A1' }}/>} title="Table Count" value="8" />
      <InfoCard icon={<AccessTimeRoundedIcon fontSize="large" sx={{ color: '#0058A1' }}/>} title="Last record" value="3 minutes ago" />
      <InfoCard icon={<SyncAltRoundedIcon fontSize="large" sx={{ color: '#0058A1' }}/>} title="Replication Status" value="Up to date" />
    </div>
    <Box sx={{ width: '95%', pr:3 , pl:5}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Tables" {...a11yProps(0)}/>
          <Tab label="Backups" {...a11yProps(1)}/>
          <Tab label="Replication" {...a11yProps(2)}/>
          <Tab label="Jobs" {...a11yProps(3)}/>
          <Tab label="Logs" {...a11yProps(4)}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Tables></Tables>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BackupSection />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}><ReplicationSection /></CustomTabPanel>
      <CustomTabPanel value={value} index={3}><DatabaseJobsAccordion></DatabaseJobsAccordion></CustomTabPanel>
      <CustomTabPanel value={value} index={4}><LogsPage></LogsPage></CustomTabPanel>
    </Box>
    </Box>
  );
}