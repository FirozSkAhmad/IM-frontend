import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidenav from '../components/SideNav';
import sharedContext from '../context/SharedContext';
import { useContext } from "react";
import roles from '../data/roles'
import SideBar from '../components/SideBar';
import Loader from '../components/Loader';
import baseurl from '../data/baseurl'
import { TextField, Autocomplete } from '@mui/material';
import toast from 'react-hot-toast'
import easyinvoice from 'easyinvoice'


function Billing() {
    const { userRole, isSidenavOpen, setIsSidenavOpen, loader, setLoader } = useContext(sharedContext);


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

    const [clientName, setClientName] = useState("")

    const [products, setProducts] = useState([
        { part_no: '', description: '', order_qty: '', price: '' }
    ]);

    const [totalPrice, setTotalPrice] = useState(0);

    const addProduct = () => {
        setProducts([...products, { part_no: '', description: '', order_qty: '', price: '' }]);
    };

    const handleProductChange = async (index, fieldName, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][fieldName] = value;

        if (fieldName === 'part_no') {
            // Fetch product name based on selected part number
            try {
                const response = await fetch(`${baseurl?.url}/product/getProductNameByPNo/${value}`);
                if (response.ok) {
                    const obj = await response.json();
                    updatedProducts[index].description = obj.data[0]; // Assuming the API returns productName
                } else {
                    console.error('Failed to fetch product name');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (fieldName === 'order_qty') {
            // Fetch price based on part number and order quantity
            try {
                const partNo = updatedProducts[index].part_no; // Extract part_no from updatedProducts
                const response = await fetch(`${baseurl?.url}/billing/priceCalculator/${partNo}/${value}`);
                if (response.ok) {
                    const obj = await response.json();
                    updatedProducts[index].price = obj.data.price;
                } else {
                    console.error('Failed to fetch price');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        setProducts(updatedProducts);
        const newTotalPrice = updatedProducts.reduce((sum, product) => sum + parseFloat(product.price || 0), 0);
        setTotalPrice(newTotalPrice);
    };

    const handleRemoveProduct = (indexToRemove) => {
        setProducts(products.filter((_, index) => index !== indexToRemove));

        const newTotalPrice = products.reduce((sum, product) => sum + parseFloat(product.price || 0), 0);
        setTotalPrice(newTotalPrice);
    };

    const [availablePartNos, setAvailablePartNos] = useState([]);

    useEffect(() => {
        const fetchPartNos = async () => {
            try {
                const response = await fetch(`${baseurl?.url}/product/getProductNos`);
                if (response.ok) {
                    const obj = await response.json();
                    const partNumbers = obj.data.map(item => item.part_no)
                    setAvailablePartNos(partNumbers);
                } else {
                    console.error('Failed to fetch part numbers');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPartNos();
    }, []);

    const clearFields = () => {
        setProducts(
            [{ part_no: '', description: '', order_qty: '', price: '' }]
        )
        setTotalPrice(0)
        setClientName("")
    }

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    // Function to calculate due date after 15 days
    function calculateDueDate(currentDate) {
        const dueDate = new Date(currentDate);
        dueDate.setDate(dueDate.getDate() + 15);
        return dueDate;
    }

    const submitBill = async () => {
        try {
            const convertedProducts = products.map(product => {
                return {
                    quantity: parseInt(product.order_qty) || 0, // Assuming order_qty is a string representing an integer
                    description: product.description || 'Product', // Assuming a default description if none is provided
                    'tax-rate': 6, // Assuming a fixed tax rate of 6%
                    price: parseFloat(product.price) || 0.0 // Assuming price is a string representing a float
                };
            });

            const currentDate = new Date();
            const formattedCurrentDate = formatDate(currentDate);
            const formattedDueDate = formatDate(calculateDueDate(currentDate));

            const data = {
                // Your own data
                "sender": {
                    "company": "Sample Corp",
                    "address": "Sample Street 123",
                    "zip": "1234 AB",
                    "city": "Sampletown",
                    "country": "Samplecountry"
                },
                // Your recipient
                "client": {
                    "company": "Client Corp",
                    "address": "Clientstreet 456",
                    "zip": "4567 CD",
                    "city": "Clientcity",
                    "country": "Clientcountry"
                },
                "information": {
                    // Invoice number
                    "number": "2021.0001",
                    // Invoice data
                    "date": formattedCurrentDate,
                    // Invoice due date
                    "due-date": formattedDueDate
                },
                // The products you would like to see on your invoice
                // Total values are being calculated automatically
                "products": convertedProducts,
                // The message you would like to display on the bottom of your invoice
                "bottom-notice": "Kindly pay your invoice within 15 days.",
                // Settings to customize your invoice
                "settings": {
                    "currency": "INR",
                },
            };
            setLoader(true)
            const response = await fetch(`${baseurl?.url}/billing/createNewBill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_name: clientName,
                    products: products,
                    total_price: totalPrice
                }),
            });

            if (response.ok) {
                // Handle success
                console.log('Bill created successfully');
                const result = await easyinvoice.createInvoice(data);
                easyinvoice.download('myInvoice.pdf', result.pdf);
                setLoader(false)
                toast.success('Invoice downloaded successfully')
                clearFields()
            } else {
                // Handle error
                console.error('Failed to create bill');
                toast.error('Error in Billing')
                clearFields()
                setLoader(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                        <div className='flex flex-col gap-10 bg-white p-5 overflow-x-auto custom-scrollbar'>
                            <div className='flex justify-between gap-80'>
                                <div className='flex items-center gap-2'>
                                    <p className='font-semibold text-20'>Name:</p>
                                    <TextField className='text__Fld'
                                        status="text"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        placeholder='Enter Name'
                                        required
                                        autoComplete="off"
                                        name='description'
                                    />
                                </div>
                                <div className='sbt__Btn' onClick={addProduct}>
                                    <button>Add Product</button>
                                </div>
                            </div>
                            <div className='flex justify-between gap-5 heading-row'>
                                <div className='auto__Fld text-center font-semibold text-20'>Part Number</div>
                                <div className='text__Fld text-center font-semibold text-20'>Part Name</div>
                                <div className='text__Fld text-center font-semibold text-20'>Order Quantity</div>
                                <div className='text__Fld text-center font-semibold text-20'>Price</div>
                                <div className='sbt__Btn text-center font-semibold text-20'>Actions</div>
                            </div>
                            {products.map((product, index) => (
                                <div key={index} className='flex justify-between gap-5'>
                                    <Autocomplete
                                        className='auto__Fld'
                                        options={availablePartNos}
                                        value={product.part_no}
                                        onChange={(event, newValue) => handleProductChange(index, 'part_no', newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder='Select Part Number'
                                                variant='outlined'
                                                fullWidth
                                            />
                                        )}
                                    />
                                    <TextField
                                        className='text__Fld'
                                        status="text"
                                        value={product.description}
                                        onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                                        placeholder='Enter Product Name'
                                        required
                                        autoComplete="off"
                                        name='description'
                                    />
                                    <TextField
                                        className='text__Fld'
                                        status="text"
                                        value={product.order_qty}
                                        onChange={(e) => handleProductChange(index, 'order_qty', e.target.value)}
                                        placeholder='Enter Order Quantity'
                                        required
                                        autoComplete="off"
                                        name='order_qty'
                                    />
                                    <TextField
                                        className='text__Fld'
                                        status="text"
                                        value={product.price}
                                        placeholder='Price'
                                        disabled
                                        required
                                        autoComplete="off"
                                        name='price'
                                    />
                                    <button
                                        className='remove-btn '
                                        onClick={() => handleRemoveProduct(index)}
                                        style={{ color: 'red' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className='total-price flex gap-1'>
                                <p className='font-semibold text-20'>Total Price :</p>
                                <p>{totalPrice}</p>
                            </div>
                        </div>
                        <div className='sbt__Btn' onClick={submitBill}>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Billing
