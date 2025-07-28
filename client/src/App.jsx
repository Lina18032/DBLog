import React, { useEffect, useState, useRef } from "react";
import DbStatusLogger from "./components/DbStatusLogger";
import AddDatabaseForm from "./components/AddDatabaseForm"
import "./App.css";
import Navbar from "./components/navbar";
import AddIcon from '@mui/icons-material/Add';
import {Button} from "@mui/material"
import Pagination from "@mui/material/Pagination";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function App() {
  const [databases, setDatabases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const prevStatuses = useRef({});
  const loggedFailures = useRef({}); 
  const [page, setPage] = useState(1) 
  const [totalPages, setTotalPages] = useState(1);
  const [dbNames, setDbNames] = useState([]);
  const [selectedDB, setSelectedDB] = useState(null);


const fetchStatus = async (currentPage = 1) => {
  try {
    const res = await fetch(`http://localhost:5000/check-dbs?page=${currentPage}`);
    const data = await res.json();
    const { results, pagination } = data;

    const dbList = Object.entries(results).map(([name, rawStatus]) => {
      const status = rawStatus.startsWith("connected") ? "connected" : "failed";
      const upperName = name.toUpperCase();
      const prev = prevStatuses.current[upperName];
      const isCurrentlyConnected = status === "connected";
      const wasPreviouslyConnected = prev?.startsWith("connected");

      if (!isCurrentlyConnected && wasPreviouslyConnected && !loggedFailures.current[upperName]) {
        const now = new Date().toLocaleString();
        loggedFailures.current[upperName] = now;
      }

      prevStatuses.current[upperName] = status;

      return {
        name: upperName,
        status,
        disconnectTime: loggedFailures.current[upperName] || null,
      };
    });

    setDatabases(dbList);
    setPage(pagination.page);
    setTotalPages(pagination.total_pages);
  } catch (error) {
    console.error("Error fetching databases:", error);
  }
};

useEffect(() => {
  fetchStatus(page);
}, [page]);

useEffect(() => {
  const interval = setInterval(() => {
    fetchStatus(page);
  }, 5000);
  return () => clearInterval(interval);
}, [page]);


useEffect(() => {
  fetch('http://localhost:5000/get-db-names')
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched DB names:", data); 
      setDbNames(data); 
    })
    .catch(console.error);
}, []);


  const handleChange = (event, value) => {
    setPage(value);
  };
  const fetchDatabases = (dbFilter) => {
  let url = `http://localhost:5000/check-dbs?page=${page}&search=${selectedDB}`;
  if (dbFilter) url += `&search=${dbFilter}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      setDatabases(transformData(data.results)); 
      setTotalPages(data.pagination.total_pages);
    });

    

};
return (
  <>
    <Navbar />

    <div className="flex flex-col min-h-screen">
      <main className="flex-grow text-center pt-[12vh] p-[1px] p-[1.5vw]">
        <div className="flex justify-between items-center mt-4">
          <div style={{ marginLeft: '1.5vw' }}>
            <Autocomplete
              options={databases.map((db) => db.name)}
              value={selectedDB}
              onChange={(e, newValue) => setSelectedDB(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Database" size="small" />
              )}
              sx={{
                width: '200%',
                maxWidth: { xs: '90%', sm: '400px', md: '500px', lg: '600px' },
                '& .MuiInputBase-root': {
                  height: 36,
                  fontSize: 14,
                },
              }}
            />
          </div>
          <div style={{ marginRight: '1.5vw' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#0058A1' }}
              endIcon={<AddIcon />}
              onClick={() => setShowModal(true)}
            >
              Add Database
            </Button>
          </div>
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
              <AddDatabaseForm
                onClose={() => setShowModal(false)}
                onAdd={(newDb) => setDatabases((prev) => [...prev, newDb])}
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 justify-items-center p-8 min-h-[65vh]">
          {databases
            .filter((db) => !selectedDB || db.name === selectedDB)
            .map((db) => (
              <DbStatusLogger
                key={db.name}
                name={db.name}
                status={db.status}
                disconnectTime={db.disconnectTime || null}
              />
            ))}
        </div>
      </main>
      <div className="p-2 flex justify-center pb-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#0058A1",
              color: "white",
            },
          }}
        />
      </div>
    </div>
  </>
);



}

export default App;
