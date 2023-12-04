import React, { useContext } from "react";

import Link from "next/link";
import { List } from "@mui/material";
import routes from "../data/routes";
import sharedContext from "../context/SharedContext";
import roles from "../data/roles";
import Image from "next/image";
import Home from '../utils/Home.svg'
import HomeAcv from '../utils/HomeAcv.svg'
import billing from '../utils/billing.svg'
import billingAcv from '../utils/billingAcv.svg'
import orders from '../utils/orders.svg'
import ordersAcv from '../utils/ordersAcv.svg'
import { useRouter } from 'next/router';


const SideBar = () => {

  const router = useRouter();
  const { userRole, setUserRole, setToken } = useContext(sharedContext)

  const getIcon = (item, isActive) => {
    switch (item) {
      case 'Dashboard': return <Image

        alt="Dashboard"
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
  return (
    <>
      <List className="flex flex-col justify-between" style={{
        height: '90vh', position: 'fixed'
      }}>
        <div>
          {roles[userRole]?.map((item, index) => (
            <div key={index} name={item} className={`p-4 flex items-center gap-4 ${router.pathname === routes[item] ? 'text-blue' : ''}`}>
              {getIcon(item, router.pathname === routes[item])}
              <Link href={`${routes[item]}`}>{item}</Link></div>
          ))}
        </div>
      </List>
    </>
  );
};

export default SideBar;