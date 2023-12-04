import React, { useState } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { TextField } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
import toast from 'react-hot-toast'


function AddProduct({ handleClose, AddRow, getTotalStock, getTotalStockValue }) {

    const { setLoader } = useContext(sharedContext);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        part_no: '',
        description: '',
        MRP: '',
        std_pkg: '',
        master_pkg: '',
        qty: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(formData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/product/createNewProduct`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == 409) {
                    setMessage(result.message)
                }
                if (result.message == 'Success') {
                    clearFields()
                    handleClose()
                    AddRow(result.data)
                    getTotalStock()
                    getTotalStockValue()
                    toast.success('Product Added successfully')
                }
                setLoader(false)
            })
            .catch(error => {
                console.log('error', error)
                toast.error('Error while adding product')
                setLoader(false)
            });
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const clearFields = () => {
        setFormData(
            {
                part_no: '',
                description: '',
                MRP: '',
                std_pkg: '',
                master_pkg: '',
                qty: '',
            }
        );
    }


    return (
        <div className='AddProduct__wrap'>
            <Loader />
            <div className='AddproductCard'>
                <h2 className='font-bold'>New Product</h2>
                <div>
                    <form className='deatails__Box' >
                        <div className='fields__Box'>
                            <div className='deatails__Fld'>
                                <p>Product Name/Description</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.description}
                                    onChange={onChangeInput}
                                    placeholder='Enter Product Name'
                                    required
                                    autoComplete="off"
                                    name='description'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Part No</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.part_no}
                                    onChange={onChangeInput}
                                    placeholder='Enter Part No'
                                    required
                                    autoComplete="off"
                                    name='part_no'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>MRP/Pc</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.MRP}
                                    onChange={onChangeInput}
                                    placeholder='Enter MRP Per Piece'
                                    required
                                    autoComplete="off"
                                    name='MRP'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Std Pkg</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.std_pkg}
                                    onChange={onChangeInput}
                                    placeholder='Enter Std Pkg'
                                    required
                                    autoComplete="off"
                                    name='std_pkg'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Master Pkg</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.master_pkg}
                                    onChange={onChangeInput}
                                    placeholder='Enter Master Pkg'
                                    required
                                    autoComplete="off"
                                    name='master_pkg'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Quantity</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.qty}
                                    onChange={onChangeInput}
                                    placeholder='Enter Quantity'
                                    required
                                    autoComplete="off"
                                    name='qty'
                                />
                            </div>
                        </div>
                        <div style={{ color: 'red' }}>{message}</div>
                        <div className='Btns__container'>
                            {/* <div className='dcrd__Btn' onClick={handleDiscardClick} name='add'>
                                <button >Discard</button>
                            </div> */}
                            <div className='sbt__Btn' onClick={handleSubmit}>
                                <button>Add Product</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct