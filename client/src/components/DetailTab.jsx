import { useState , useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';



export default function DetailTab({ tableName, metadata }) {
  const [trackEnabled, setTrackEnabled] = useState(false);
  const [trackRows, setTrackRows] = useState(false);
  const [trackingColumn, setTrackingColumn] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date()); // default to now

  const [selectedColumn, setSelectedColumn] = useState('');
  const [chartData, setChartData] = useState([]);
  const handleToggleChange = (event) => {
    setTrackRows(event.target.checked);
    if (!event.target.checked) {
      setSelectedColumn('');
    }
  };
  const generateDummyChartData = (monthDate) => {
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

  const data = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const formattedDate = date.toISOString().split('T')[0];
    const count = 10000 + Math.floor(Math.random() * 2000); // simulate data

    data.push({ date: formattedDate, count });
  }
  return data;
};

  const handleColumnChange = (event) => {
  const value = event.target.value;
  setSelectedColumn(value);
  setTrackEnabled(true);  
  setTrackingColumn(value);      
};
useEffect(() => {
  if (trackEnabled && trackingColumn) {
    const mockData = generateDummyChartData(currentMonth);
    setChartData(mockData);
  }
}, [trackEnabled, trackingColumn, currentMonth]);


  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {tableName}
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Number of Rows</TableCell>
              <TableCell>{metadata.rowCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Number of Columns</TableCell>
              <TableCell>{metadata.columnCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Columns</TableCell>
              <TableCell>{metadata.columns}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Indexed Columns</TableCell>
              <TableCell>{metadata.indexes.join(', ')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Last Record (ID)</TableCell>
              <TableCell>{metadata.lastRecord.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Last Record Details</TableCell>
              <TableCell>
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(metadata.lastRecord, null, 2)}
                </pre>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {metadata?.columns?.length > 0 && (
  <Box mt={3} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
    <FormControlLabel
      control={<Switch checked={trackRows} onChange={handleToggleChange} />}
      label="Track Rows"
      sx={{ margin: 0 }}
    />
    {trackRows && (
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Track with</InputLabel>
        <Select
          value={selectedColumn}
          onChange={handleColumnChange}
          label="Track with"
        >
          {metadata.columns.map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  </Box>
)}
{trackRows && selectedColumn && (
  <Box mt={4}>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <ArrowBackIos
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
        }
      />
      <Typography variant="subtitle1" fontWeight="bold">
        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Typography>
      <ArrowForwardIos
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
        }
      />
    </Box>

    <Box height={300}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1976d2"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Box>
)}

        </>
      )}
    
