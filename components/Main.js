import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import Drawer from './Drawer';
import Loader from './Loader';
import baseurl from '../data/baseurl'
import Image from 'next/image';
import totalOrdersImg from '../utils/totalOrders.svg'
import totalSalesImg from '../utils/totalSales.svg'
import totalStockImg from '../utils/totalStock.svg'
import totalStockValueImg from '../utils/totalStockValue.svg'

const Main = () => {
  const [current, setCurrent] = useState('');

  const { totalOrders, setTotalOrders, totalSales, setTotalSales, totalStock, setTotalStock, totalStockValue, setTotalValue, setLoader, rows, setRows } = useContext(sharedContext);

  const columns = [
    {
      field: 'product_id',
      headerName: 'ID',
      width: 160,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'part_no',
      headerName: 'Prat No',
      width: 160,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'MRP',
      headerName: 'MRP/Pc',
      type: 'number',
      width: 150,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'std_pkg',
      headerName: 'Std Pkg',
      type: 'number',
      width: 110,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'master_pkg',
      headerName: 'Master Pkg',
      type: 'number',
      width: 110,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'qty',
      headerName: 'Quantity',
      type: 'number',
      width: 110,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
  ];

  useEffect(() => {
    getProducts()
    getOrdersCount()
    getTotalSales()
    getTotalStock()
    getTotalStockValue()
  }, [])

  const getProducts = () => {
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/product/getProducts`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          setRows(result.data)
        }
        setLoader(false)
      })
      .catch(error => {
        console.log("error", error.message)
        setLoader(false)
      });
  }


  const getOrdersCount = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/orders/getOrdersCount`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          setTotalOrders(result.count)
        }
      })
      .catch(error => {
        console.log("error", error.message)
      });
  }


  const getTotalSales = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/orders/getTotalSales`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          setTotalSales(result.total_sales)
        }
      })
      .catch(error => {
        console.log("error", error.message)
      });
  }


  const getTotalStock = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/product/getTotalStock`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          setTotalStock(result.count)
        }
      })
      .catch(error => {
        console.log("error", error.message)
      });
  }


  const getTotalStockValue = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/product/getTotalStockValue`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          setTotalValue(result.value)
        }
      })
      .catch(error => {
        console.log("error", error.message)
      });
  }

  const [isAddProductDrawerOpen, setOpenAddProductDrawer] = useState(false);

  const toggleAddProductDrawer = (event, open, button) => {
    console.log(button)
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setOpenAddProductDrawer(false)
      return;
    }
    setOpenAddProductDrawer(open)
    setCurrent(button)
  };

  const AddRow = (item) => {
    setRows([...rows, item])
  }


  return (
    <div className="p-4 mt-20 bg-grey-500">
      {/* Your Data Grid Table */}
      <Loader />
      <Drawer
        anchor="right"
        toggleDrawer={toggleAddProductDrawer}
        isOpen={isAddProductDrawerOpen}
        current={current}
        AddRow={AddRow}
        getProducts={getProducts}
        getOrdersCount={getOrdersCount}
        getTotalSales={getTotalSales}
        getTotalStock={getTotalStock}
        getTotalStockValue={getTotalStockValue}
      />
      <div className='bg-white  m-4 p-4 rounded-md'>
        <div className='font-bold mb-5'>Overview</div>
        <div className='flex flex-col md:flex-row gap-5 p-2 justify-around flex-wrap '>
          <div className='flex flex-col items-center gap-2'>
            <span className='m-2 p-0.5 rounded-sm flex items-center'>
              <Image
                alt="totalOrdersImg"
                src={totalOrdersImg}
                quality={100}
                width={35}
                height={35}

              /></span>
            <span className='flex flex-col md:flex-row items-center font-medium md:gap-3'><span>Total Orders :</span><span>{totalOrders}</span></span>
          </div>
          <div className='flex flex-col items-center gap-2'
          >
            <span className='m-2 p-0.5 rounded-sm flex items-center'>
              <Image
                alt="totalSalesImg"
                src={totalSalesImg}
                width={35}
                height={35}
              />
            </span>
            <span className='flex flex-col md:flex-row items-center font-medium md:gap-3' ><span>Total Sales :</span><span>₹{totalSales}</span></span></div>
          <div className='flex flex-col items-center gap-2'>
            <span className='m-2 p-0.5 rounded-sm flex items-center'>
              <Image
                alt="totalStockImg"
                src={totalStockImg}
                width={35}
                height={35}
              /></span>
            <span className='flex flex-col md:flex-row items-center font-medium md:gap-3'><span>Total Stock :</span><span>{totalStock}</span></span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span className='m-2 p-0.5 rounded-sm flex items-center'>
              <Image
                alt="totalStockValueImg"
                src={totalStockValueImg}
                width={35}
                height={35}
              /></span>
            <span className='flex flex-col md:flex-row items-center font-medium md:gap-3'><span>Total Stock Value :</span><span>₹{totalStockValue}</span></span>
          </div>
        </div>
      </div>
      <div className='mainborder rounded-md'>
        <div className='flex justify-end'>
          <div className='p-4 flex gap-6 items-center flex-wrap'>
            <span className='sbt__Btn ' style={{ backgroundColor: 'none' }} >
              <button style={{ width: 'max-content' }} onClick={(event) => toggleAddProductDrawer(event, true, 'add')} name="add">Add Product</button>
            </span>
            <span className='eds__Btn'>
              <button className='button' onClick={(event) => toggleAddProductDrawer(event, true, 'upload')} style={{ width: 'max-content' }} name="upload">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M5.5 7.5V6.5C5.5 3.73858 7.73858 1.5 10.5 1.5C13.2614 1.5 15.5 3.73858 15.5 6.5V7.5C17.7091 7.5 19.5 9.2909 19.5 11.5C19.5 12.9806 18.6956 14.3084 17.5 15" stroke="#5D6679" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M6.74006 7.6959C6.34965 7.5688 5.93285 7.5 5.5 7.5C3.29086 7.5 1.5 9.2909 1.5 11.5C1.5 12.9806 2.3044 14.3084 3.5 15" stroke="#5D6679" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10.5 9.5V18.5" stroke="#5D6679" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M13.5 12.5L10.5 9.5L7.5 12.5" stroke="#5D6679" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className='normal-case'> Upload Data</span>
              </button>
            </span>
          </div>
        </div>
        <Box sx={{ width: '100%', height: '80vh', backgroundColor: 'white' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              ...rows.initialState,
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row.product_id}
            autoPageSize
            pageSizeOptions={[5, 10, 25]}
            disableSelectionOnClick
            sx={{
              fontWeight: 500,
            }}
            className='datagrid'
          />
        </Box>
      </div>
    </div>
  );
};

export default Main;