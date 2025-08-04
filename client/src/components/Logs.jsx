import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const logData = [
  {
    message: "Database backup completed successfully",
    type: "success",
    timestamp: "2024-07-29 02:00",
  },
  {
    message: "Log cleanup failed: permission denied",
    type: "error",
    timestamp: "2024-07-29 03:00",
  },
  {
    message: "Replication sync completed",
    type: "success",
    timestamp: "2024-07-29 04:00",
  },
  {
    message: "Reindex job failed due to timeout",
    type: "error",
    timestamp: "2024-07-28 01:00",
  },
];

const LogsPage = () => {
  return (
    <Box sx={{ backgroundColor: "#ffffff",  borderRadius: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
    <DescriptionOutlinedIcon fontSize="small" sx={{ color: "#0058a1", mr: 1 , mb : 2 }} />
      <Typography variant="h6" mb={2} sx={{ color: "#0058a1" }}>
        System Logs
      </Typography>
    </Box>
    <Box sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logData.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>
                <Chip
                  icon={
                    log.type === "error" ? (
                      <ErrorIcon sx={{ color: "red" }} />
                    ) : (
                      <CheckCircleIcon sx={{ color: "green" }} />
                    )
                  }
                  label={log.type.toUpperCase()}
                  color={log.type === "error" ? "error" : "success"}
                  size="small"
                />
              </TableCell>
              <TableCell>{log.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Box>
    </Box>

  );
};

export default LogsPage;
