import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Paper
} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';

const mockBackupData = [
  {
    id: 1,
    type: 'Full',
    dbName: 'my_database',
    startTime: '2024-07-30 02:00',
    endTime: '2024-07-30 02:10',
    status: 'Success',
    size: '450MB',
    path: '/backups/full_20240730.sql',
    triggeredBy: 'Scheduler',
  },
  {
    id: 2,
    type: 'Incremental',
    dbName: 'my_database',
    startTime: '2024-07-29 02:00',
    endTime: '2024-07-29 02:05',
    status: 'Success',
    size: '120MB',
    path: '/backups/incr_20240729.sql',
    triggeredBy: 'Scheduler',
  },
  {
    id: 3,
    type: 'Full',
    dbName: 'my_database',
    startTime: '2024-07-28 02:00',
    endTime: '2024-07-28 02:10',
    status: 'Failed',
    size: '--',
    path: 'N/A',
    triggeredBy: 'Manual',
  },
];

export default function BackupSection() {
  const latest = mockBackupData[0];

  return (
    
    <Box sx={{ backgroundColor: '#ffffff', borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <BackupIcon sx={{ color: '#0058a1', mr: 1 }} fontSize="small" />
        <Typography variant="h6" fontWeight="semiBold" color="#0058a1">
          Backup Information
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Latest Backup:
        </Typography>
        <Typography variant="body2">
          {latest.startTime} | {latest.type} |{' '}
          <Chip
            label={latest.status}
            color={latest.status === 'Success' ? 'success' : 'error'}
            size="small"
          />
        </Typography>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Backup History
      </Typography>

      <Table size="small" component={Paper} sx={{ backgroundColor: 'white' }}>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Triggered By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockBackupData.map((backup) => (
            <TableRow key={backup.id}>
              <TableCell>{backup.type}</TableCell>
              <TableCell>{backup.startTime}</TableCell>
              <TableCell>{backup.endTime}</TableCell>
              <TableCell>
                <Chip
                  label={backup.status}
                  color={backup.status === 'Success' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>{backup.size}</TableCell>
              <TableCell>{backup.path}</TableCell>
              <TableCell>{backup.triggeredBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="primary" size="small">
          Trigger Manual Backup
        </Button>
      </Box>
    </Box>
  );
}
