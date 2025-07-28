import React from 'react'
import {AppBar , Stack, Toolbar ,Typography , Box ,Avatar} from "@mui/material"


const Navbar = () => {
  return (
    <AppBar >
        <Toolbar sx={{ backgroundColor :'#FFFFFF' }}>
            <Box component="img" src="/casnosLogo.png" alt="Logo" sx={{ height: 40, mr: 2 }}/>
            <Typography variant='h5' component='div' sx={{color: '#0058A1' , marginRight: 'auto' }}>
                Database Logger
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginLeft: 'auto' }}>
                <Avatar alt="Admin Profile" src="/admin.png" sx={{ width: 32, height: 32 }}/>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
