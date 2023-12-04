import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidenav from '../components/SideNav';
import sharedContext from '../context/SharedContext';
import { useContext } from "react";
import { Button } from '@mui/material';
import roles from '../data/roles'
import SideBar from '../components/SideBar';
import Loader from '../components/Loader';
import baseurl from '../data/baseurl'

function Orders() {
    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen, loader, setLoader } = useContext(sharedContext);

    const [approvalsList, setApprovalsList] = useState([]);

    const toggleSidenav = () => {
        console.log("called togglesidenav app")
        setIsSidenavOpen(!isSidenavOpen);
    };

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

    const [ordersData, setOrdersData] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = () => {
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/orders/getOrders`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data)
                if (result.status == 200) {
                    setOrdersData(result.data)
                }
                setLoader(false)
            })
            .catch(error => {
                console.log("error", error.message)
                setLoader(false)
            });
    }

    const [selectedClient, setSelectedClient] = useState(null);

    const handleClientClick = (clientIndex) => {
        // Set the selected client index when a client is clicked
        setSelectedClient(clientIndex);
    };

    const handleCloseClick = () => {
        // Reset the selected client when the close button is clicked
        setSelectedClient(null);
    };

    return (

        <div className="md:flex h-screen w-full">

            {/* Sidenav (desktop mode) */}
            <div
                className={`hidden md:block md:w-1/5 bg-[#FFFFFF] mt-20`}
            >
                <Sidenav
                    role={userRole}
                    navigation={roles[userRole]}
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
                    toggleDrawer={toggleDrawer}
                    isDrawerOpen={isDrawerOpen}
                />

                {/* Main Content */}
                {/* <Main /> */}
                <div className='bg-grey-500 p-4 overflow-scroll mt-20' style={{ height: '90vh' }}>
                    <Loader />
                    <div className='w-full text-left border-separate border-spacing-y-2.5'>
                        {ordersData?.map((orderData, index) => (
                            <div key={index} className='flex flex-col gap-10 bg-white p-5 mb-5 rounded-md overflow-x-auto custom-scrollbar'>
                                <div className='flex justify-between items-center gap-96'>
                                    <div className='flex gap-1 cursor-pointer noWhiteSpace' onClick={() => handleClientClick(index)} >
                                        <p className='font-bold text-20'>Name :</p>
                                        <p className='noWhiteSpace'>{orderData?.client_name}</p>
                                    </div>
                                    {selectedClient === index && <button className='bg-red-500 text-white px-2 py-1 rounded-md' onClick={handleCloseClick}>Close</button>}
                                </div>
                                {selectedClient === index &&
                                    orderData?.data?.map((data, index) => (
                                        <div key={index} className='p-5'>
                                            <div className='flex gap-1'>
                                                <p className='font-bold text-20'>Billing Id :</p>
                                                <p>{data?.billing_id}</p>
                                            </div>
                                            <div className='flex flex-col gap-10'>
                                                <p className='font-bold text-20'>Products:</p>
                                                <div className='flex justify-between gap-5 heading-row'>
                                                    <div className='text__Fld text-center font-bold text-20'>Part Number</div>
                                                    <div className='text__Fld text-center font-bold text-20'>Part Name</div>
                                                    <div className='text__Fld text-center font-bold text-20'>Order Quantity</div>
                                                    <div className='text__Fld text-center font-bold text-20'>Price</div>
                                                </div>
                                                {data?.products.map((product, index) => (
                                                    <div key={index} className='flex justify-between gap-5'>
                                                        <p className='text__Fld text-center'>{product.part_no}</p>
                                                        <p className='text__Fld text-center'>{product.description}</p>
                                                        <p className='text__Fld text-center'>{product.order_qty}</p>
                                                        <p className='text__Fld text-center'>₹{product.price}</p>
                                                    </div>
                                                ))}
                                                <div className='flex justify-between items-center gap-56'>
                                                    <div className='flex flex-col gap-1'>
                                                        <div className='flex gap-1'>
                                                            <p className='font-bold text-20 noWhiteSpace'>Ordered At :</p>
                                                            <p className='noWhiteSpace'>{data?.createdAt?.split('T')[0]}</p>
                                                        </div>
                                                        <div className='flex gap-1'>
                                                            <p className='font-bold text-20 noWhiteSpace'>Due Date :</p>
                                                            <p className='noWhiteSpace'>{data?.due_date}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-1'>
                                                        <p className='font-bold text-20 noWhiteSpace'>Total Price :</p>
                                                        <p className='noWhiteSpace'>₹{data?.total_price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Orders