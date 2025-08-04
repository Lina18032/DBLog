import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";

const jobData = [
  {
    name: "Nightly Backup",
    type: "Backup",
    status: "Success",
    lastRun: "2024-07-29 02:00",
    nextRun: "2024-07-30 02:00",
  },
  {
    name: "Log Cleanup",
    type: "Cleanup",
    status: "Failed",
    lastRun: "2024-07-29 03:00",
    nextRun: "2024-07-30 03:00",
  },
  {
    name: "Reindex Tables",
    type: "Maintenance",
    status: "Success",
    lastRun: "2024-07-28 01:00",
    nextRun: "2024-08-04 01:00",
  },
];

const DatabaseJobs = () => {
  return (
    <Box sx={{ backgroundColor: "#ffffff",  borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ScheduleIcon fontSize="small" sx={{ color: "#0058a1", mr: 1 }} />
        <Typography variant="h6" fontWeight="semiBold" color="#0058a1">
          Scheduled Jobs
        </Typography>
      </Box>
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Job Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Run</TableCell>
              <TableCell>Next Run</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobData.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>{job.lastRun}</TableCell>
                <TableCell>{job.nextRun}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DatabaseJobs;
