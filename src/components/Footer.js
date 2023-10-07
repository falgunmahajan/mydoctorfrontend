import { Outlet } from '@mui/icons-material'
import { AppBar } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor:"#eeeeee",color:"black", p:5, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      This is some content in sticky footer
    </AppBar>
  )
}

export default Footer
