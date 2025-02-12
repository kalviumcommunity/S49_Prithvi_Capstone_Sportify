import React, { useState } from 'react';
import '../Css/Header.css';
import logo from '../../logo/logo.png';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import EventModal from './AddEventModal'; 
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const open = Boolean(anchorEl);

  // Handle opening and closing of the account menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle modal open/close
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Sportify Logo" className="logo-image" />
      </div>

      <nav className="nav">
        <button className="nav-button">Dashboard</button>

        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
          </Tooltip>
        </Box> 
        <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
        
      </nav>

      {/* Event Modal */}
      <EventModal visible={modalVisible} onClose={closeModal} />
    </header>
    </>
  );
  
}

export default Header;
