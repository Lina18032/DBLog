import React , { useState }  from 'react';
import SaveIcon from '@mui/icons-material/Save';
import {Button} from "@mui/material"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';





export default function AddDatabaseForm({ onClose ,onAdd }) {
  const [formData, setFormData] = useState({
    dbname: "",
    host: "",
    port: "",
    user: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [dbms, setDbms] = React.useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "dbms") {
    setDbms(value);
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};
const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  setStatusMessage("");

  const { dbname, host, port, user, password } = formData;
  let uri = "";
  if (dbms === "postgresql") {
    uri = `postgresql://${user}:${password}@${host}:${port}/${dbname}`;
  } else if (dbms === "mysql") {
    uri = `mysql+pymysql://${user}:${password}@${host}:${port}/${dbname}`;
  } else if (dbms === "sqlite") {
    uri = `sqlite:///${dbname}`;
  }  else if (dbms === "sqlserver" || dbms === "mssql") {
    const driver = "FreeTDS";
    uri = `mssql+pyodbc://${user}:${password}@${host}:${port}/${dbname}?driver=ODBC+Driver+17+for+SQL+Server&Encrypt=yes&TrustServerCertificate=yes`;


  }
 else {
    setStatusMessage("Unsupported DBMS selected.");
    setLoading(false);
    return;
  }

  fetch("http://localhost:5000/add-db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dbname,
      uri: uri,
    }),
  })
    .then(async (res) => {
      const result = await res.json();
      if (res.ok) {
        setStatusMessage("✅ Database connected successfully!");
        onAdd({
          name: dbname.toUpperCase(),
          status: "connected: manual add",
          disconnectTime: null,
        });
      } else {
        setStatusMessage(`❌ Failed: ${result.error || "Unknown error"}`);
      }
    })
    .catch((err) => {
      console.error("Error connecting:", err);
      setStatusMessage("❌ Error connecting to the database.");
    })
    .finally(() => setLoading(false));
};


 /*const handleSubmit = (e) => {
  e.preventDefault();

  const { dbms , dbname, host, port, user, password } = formData;
  const uri = `postgresql://${user}:${password}@${host}:${port}/${dbname}`;

  fetch("http://localhost:5000/add-db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dbname,   // 👈 used for naming the database card / key
      uri: uri        // 👈 this is what Flask needs
    }),
  })
    .then(async (res) => {
      const result = await res.json();
      if (res.ok) {
        setStatusMessage("✅ Database connected successfully!");
        onAdd({
          name: dbname.toUpperCase(),
          status: "connected: manual add",
          disconnectTime: null,
        });
      } else {
        setStatusMessage(`❌ Failed: ${result.error || "Unknown error"}`);
      }
    })
    .catch((err) => {
      console.error("Error connecting:", err);
      setStatusMessage("❌ Error connecting to the database.");
    });
};*/

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-[#0058a1]">Add New Database</h2>
          <Box sx={{ minWidth: 100 , minHeight: '10px' }}>
            <FormControl fullWidth>
              <InputLabel>dbms</InputLabel>
                <Select
                  name="dbms"
                  value={dbms}
                  label="dbms"
                  onChange={handleChange}>
                <MenuItem value="postgresql" color='black'>postgresql</MenuItem>
                <MenuItem value="mysql">MySQL</MenuItem>
                <MenuItem value="sqlite">SQLite</MenuItem>
                <MenuItem value="sqlserver">SQL Server</MenuItem>
                </Select>
            </FormControl>
          </Box>
      <br />
      <input type="text" name="dbname" placeholder="Database Name" onChange={handleChange} className="input-field" required />
      <br />
      {dbms !== "sqlite" && (
        <>
      <input type="text" name="host" placeholder="Host" onChange={handleChange}  className="input-field" required />
      <br />
      <input type="text" name="port" placeholder="Port" onChange={handleChange}  className="input-field" required />
      <br />
      <input type="text" name="user" placeholder="Username" onChange={handleChange}  className="input-field" required />
      <br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange}  className="input-field" required />
      </>
      )}

      <br />
       {statusMessage && (
        <p className="text-sm text-center" style={{ color: statusMessage.startsWith("✅") ? "green" : "red" }}>
          {statusMessage}
        </p>
      )}
<div className="flex justify-end w-full mt-4">
      <div className="flex justify-end w-full mt-4">
        <Button
          type="submit"
          size="small"
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
          
          sx={{
            backgroundColor: '#0058a1',
            '&:hover': { backgroundColor: '#004a8a' },
            color: 'white'
          }}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
</div>
      </form>
  );
}
