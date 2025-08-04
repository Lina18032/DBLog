import React from 'react';
import { Box, Button, TextField, Typography, Paper , IconButton, InputAdornment} from '@mui/material';
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFormViewHide, GrFormView } from "react-icons/gr";


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError(false);
        navigate('/dashboard');
      } else {
        setMessage(data.error || 'Login failed');
        setError(true);
      }
    } catch (err) {
      
      setMessage('An error occurred');
      setError(true);
    }

  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '90%', maxWidth: 400 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#0058a1' }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
