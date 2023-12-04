import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import Image from "next/image";
import Home from '../utils/Home.svg'
import HomeAcv from '../utils/HomeAcv.svg'
import billing from '../utils/billing.svg'
import billingAcv from '../utils/billingAcv.svg'
import orders from '../utils/orders.svg'
import ordersAcv from '../utils/ordersAcv.svg'
import Link from 'next/link';
import routes from '../data/routes';
import roles from '../data/roles';
import { useRouter } from 'next/router';


const Sidenav = ({ role, isSidenavOpen, toggleSidenav, toggleDrawer, isDrawerOpen }) => {

  const { userRole, token, setToken, setUserRole } = useContext(sharedContext)
  const getIcon = (item, isActive) => {
    switch (item) {
      case 'Dashboard': return <Image

        alt="Home"
        src={isActive ? HomeAcv : Home}
        quality={100}
        width={23}
        height={23}

      />; break;
      case 'Billing': return <Image

        alt="Billing"
        src={isActive ? billingAcv : billing}
        quality={100}
        width={23}
        height={23}

      />; break;
      case 'Orders': return <Image

        alt="Orders"
        src={isActive ? ordersAcv : orders}
        quality={100}
        width={23}
        height={23}

      />; break;

    }
  }
  const router = useRouter()

  return (
    <>
      <Drawer
        anchor="left"
        open={isSidenavOpen}
        onClose={toggleSidenav}
        variant="temporary"
        sx={{
          ".MuiDrawer-paper": {
            bgcolor: "white",
            width: '100%'
          },
        }}
        ModalProps={{ keepMounted: true }} // For better mobile performance
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
          <IconButton
            edge="end"
            aria-label="close"
            onClick={toggleSidenav}
            sx={{
              textAlign: "right",
            }}
            className="inline md:hidden"
          >
            <Close fontSize="large" />
          </IconButton>
        </div>

        <List>
          {roles[userRole]?.map((item, index) => (
            <div key={index} name={item} className={`p-4 flex items-center gap-4 ${router.pathname === routes[item] && 'text-blue'}`}>
              {getIcon(item, router.pathname === routes[item])}
              <Link href={`${routes[item]}`}>
                <a onClick={toggleSidenav}>{item}</a>
              </Link>
            </div>
          ))}
        </List>

      </Drawer>
    </>

  );
};

export default Sidenav;