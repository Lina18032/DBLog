import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography,
  Box,
} from '@mui/material';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAlt';


const ReplicationSection = ({ replications }) => {
  const mockReplications = [
    {
      mode: 'Asynchronous',
      status: 'Running',
      lagInSeconds: 3,
      primaryNode: 'db-primary-01',
      replicaNodes: ['db-replica-01', 'db-replica-02'],
      lastSyncTime: '2025-07-30T14:35:00Z',
    },
    {
      mode: 'Synchronous',
      status: 'Idle',
      lagInSeconds: 0,
      primaryNode: 'db-primary-02',
      replicaNodes: ['db-replica-03'],
      lastSyncTime: '2025-07-30T13:50:00Z',
    },
    {
      mode: 'Semi-Synchronous',
      status: 'Error',
      lagInSeconds: 120,
      primaryNode: 'db-primary-03',
      replicaNodes: ['db-replica-04', 'db-replica-05', 'db-replica-06'],
      lastSyncTime: '2025-07-30T12:20:00Z',
    },
  ];

  const dataList = replications || mockReplications;

  return (
    <>
    <div
      style={{
        width: '100%',               // Approx. full width
        margin: '0 auto',           // Center horizontally
        backgroundColor: '', // Light blue background
        borderRadius: '10px'
      }}
    >
    <Box display="flex" alignItems="center" mb={2}>

        <SyncAltRoundedIcon sx={{ color: '#0058a1', mr: 1 }} fontSize="small" />
        <Typography variant="h6" fontWeight="semiBold" color="#0058a1">
          Replication Information
        </Typography>
    </Box>
      {dataList.map((data, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="semiBold">
              Replication {index + 1}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Replication Mode</TableCell>
                    <TableCell>{data.mode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>{data.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lag (seconds)</TableCell>
                    <TableCell>{data.lagInSeconds}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Primary Node</TableCell>
                    <TableCell>{data.primaryNode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Replica Nodes</TableCell>
                    <TableCell>{data.replicaNodes.join(', ')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Sync Time</TableCell>
                    <TableCell>{new Date(data.lastSyncTime).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
      </div>
    </>
  );
};

export default ReplicationSection;
