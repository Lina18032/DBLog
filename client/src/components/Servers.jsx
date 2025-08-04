import React, { useState } from 'react';
import ServerCard from './ServerCard';
import { Autocomplete, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import './Servers.css';
import AddServerForm from './AddServerForm';

const serverData = [
  { name: 'Server A', status: 'connected', lastChecked: '' },
  { name: 'Server B', status: 'disconnected', lastChecked: '2024-07-31 14:52' },
  { name: 'Server C', status: 'connected', lastChecked: '' },
];

function Servers({ selectedServer, setSelectedServer }) {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [servers, setServers] = useState([
  {
    name: 'Server A',
    ip: '192.168.0.1',
    role: 'Database',
    pingTime: '12 ms',
    location:'Cabine 1',
    status: 'connected',
    lastChecked: ''
  },
  {
    name: 'Server B',
    ip: '192.168.0.2',
    role: 'App',
    pingTime: 'timeout',
    location:'Cabine 2',
    status: 'disconnected',
    lastChecked: '2024-07-31 14:52'
  },
]);



  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="servers-container">
      <main className="servers-main">
        <div className="servers-header">
            <div>
                <Autocomplete
                    options={servers.map((server) => server.name)}
                    value={selectedServer}
                    onChange={(e, newValue) => setSelectedServer(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Servers" size="small" />
                    )}
                    sx={{
                        width: '200%',
                        maxWidth: { xs: '100%', sm: '400px', md: '500px', lg: '600px' },
                        '& .MuiInputBase-root': {
                            height: 36,
                            fontSize: 14,
                        },
                '& .MuiAutocomplete-option': {
                  fontSize: '0.9rem', // default
                  '@media (max-width:600px)': {
                  fontSize: '0.75rem', // smaller on small screens
                  },
                },
              }}

  />
</div>


          <Button
            variant="contained"
            sx={{ backgroundColor: '#0058A1' }}
            endIcon={<AddIcon />}
            onClick={() => setShowModal(true)}
          >
            Add Server
          </Button>
        </div>


        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="absolute top-[10px] right-[14px] text-[18px] text-[#0058A1] bg-white border-0 shadow-none outline-none"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <AddServerForm
                onClose={() => setShowModal(false)}
                onAdd={(newServer) => setServers((prev) => [...prev, newServer])}
              />
            </div>
          </div>
        )}


        <div className="server-grid">
            {servers.map((server, index) => (
                <ServerCard
  key={index}
  name={server.name}
  ip={server.ip}
  role={server.role}
  pingTime={server.pingTime}
  location = {server.location}
  status={server.status}
  disconnectTime={server.lastChecked}
/>

))}

        </div>
      </main>

      <div className="pagination-container">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#0058A1',
              color: 'white',
            },
          }}
        />
      </div>
    </div>
  );
}

export default Servers;
