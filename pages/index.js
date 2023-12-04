import React, { useState } from 'react';
import Header from '../components/Header';
import Sidenav from '../components/SideNav';
import Main from '../components/Main';
import SharedContext from '../context/SharedContext';
import { useContext } from "react";
import SideBar from "../components/SideBar";

export default function Home() {

  const { userRole, isSidenavOpen, setIsSidenavOpen } = useContext(SharedContext);
  const [isDrawerOpen, setOpenDrawer] = useState(false);

  const toggleDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };
  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };


  return (

    <div className="md:flex h-screen w-full">

      {/* Sidenav (desktop mode) */}
      <div
        className={`hidden md:block md:w-1/5 bg-[#FFFFFF] mt-20`}
      >
        <Sidenav
          role={userRole}
          // navigation={roles[userRole]}
          isSidenavOpen={isSidenavOpen}
          toggleSidenav={toggleSidenav}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
        <SideBar />
      </div>

      {/* Content Container */}
      <div className="md:w-4/5">
        {/* Header */}
        <Header
          toggleSidenav={toggleSidenav}
          userRole={userRole}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />

        {/* Main Content */}

        <Main />
      </div>
    </div>
  );
}
