import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TocRoundedIcon from '@mui/icons-material/TocRounded';
import DetailTab from './DetailTab';
import TableChartRoundedIcon from '@mui/icons-material/TableChart';
import {
  Typography,
  Box,
} from '@mui/material';

export default function Tables() {
      const tables = [
    { name: 'Users' },
    { name: 'Sales' },
    { name: 'Products' },
    { name: 'Invoices' },
    { name: 'Logs' },
    { name: 'Orders' },
  ];
  const mockMetadata = {
  rowCount: 12000,
  columnCount: 8,
  columns: ['id', 'name', 'email', 'created_at', 'updated_at', 'status', 'role', 'last_login'],
  indexes: ['id', 'created_at'],
  lastRecord: {id: 12000,name: 'John Doe',email: 'john.doe@example.com',created_at: '2025-07-30T10:00:00Z',updated_at: '2025-07-30T11:00:00Z',status: 'active',role: 'admin',last_login: '2025-07-30T09:00:00Z'},
};


  return (
    
    <div
      style={{
        width: '100%',         
        margin: '0 auto',  
        backgroundColor: '',
        borderRadius: '10px'
      }}
    >
    <Box display="flex" alignItems="center" mb={2}>
        <TableChartRoundedIcon fontSize="small" sx={{ color: '#0058A1' , mr :1}}/>
        <Typography variant="h6" fontWeight="semiBold" color="#0058a1">
          Tables Information
        </Typography>
    </Box>

    {tables.map((table, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
<Box display="flex" justifyContent="space-between" alignItems="center" width="98%">

  <Box display="flex" alignItems="center">
    <TocRoundedIcon fontSize='small' sx={{ mr: 1, mt: 0.3, color: '#0058a1' }} />
    <Typography component="span" fontWeight="semiBold">
      {table.name}
    </Typography>
  </Box>

  <Box display="flex" alignItems="center" gap={5}>
    <Typography variant="body2" color="text.secondary">
      Rows: 1234
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Updated: 2024-07-30
    </Typography>
  </Box>
</Box>

          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
                <DetailTab metadata={mockMetadata} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
