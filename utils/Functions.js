import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import baseurl from '../data/baseurl'


const GetProducts = () => {
    const { token, setToken, setLoader, userRole, setUserRole, rows, setRows } = useContext(sharedContext);
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

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

const GetOrdersCount = () => {
    const { setTotalOrders, token, setToken, setLoader, userRole, setUserRole, rows, setRows } = useContext(sharedContext);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

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

const GetTotalSales = () => {
    const { setTotalSales, token, setToken, setLoader, userRole, setUserRole, rows, setRows } = useContext(sharedContext);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

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

const GetTotalStock = () => {
    const { setTotalStock, token, setToken, setLoader, userRole, setUserRole, rows, setRows } = useContext(sharedContext);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

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

const GetTotalStockValue = () => {
    const { setTotalValue, token, setToken, setLoader, userRole, setUserRole, rows, setRows } = useContext(sharedContext);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

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

export {
    GetProducts,
    GetOrdersCount,
    GetTotalSales,
    GetTotalStock,
    GetTotalStockValue
};