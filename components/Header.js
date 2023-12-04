import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  CssBaseline,
  useScrollTrigger,
  Avatar
} from "@mui/material";
import { Menu } from '@mui/icons-material';
import { useContext } from "react";
import PropTypes from "prop-types";
import sharedContext from '../context/SharedContext';
function ElevationScroll(props) {

  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = ({ toggleSidenav, props }) => {

  const { userRole } = useContext(sharedContext);

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }} className="header-stack">
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Toolbar style={{ padding: '10px', backgroundColor: 'white', width: '100%' }}>

            {/* Username and Avatar */}
            <div className="hidden md:flex items-center ml-auto">
              <div className="flex items-center gap-3">
                <span style={{ color: 'black' }}>{userRole}</span>
                <Avatar />
              </div>
            </div>

            <div className="md:hidden">
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={toggleSidenav}
                sx={{
                  textAlign: "right",
                }}
              >
                <Menu fontSize="large" />
              </IconButton>
            </div>

          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Stack>
  );
};

export default Header;
