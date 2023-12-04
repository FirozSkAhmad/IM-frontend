import React, { useState, useEffect } from 'react'
import SharedContext from './SharedContext'

const SharedState = (props) => {

  const [userRole, setUserRole] = useState('USER');
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rows, setRows] = useState([])
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [totalStock, setTotalStock] = useState(0)
  const [totalStockValue, setTotalValue] = useState(0)





  useEffect(() => {
    if (window) {
      setUserRole(sessionStorage.getItem('userRole') || 'USER')
    }
  }, [])

  return (
    <SharedContext.Provider value={{
      'userRole': userRole, 'setUserRole': setUserRole, 'isSidenavOpen': isSidenavOpen, 'setIsSidenavOpen': setIsSidenavOpen, 'loader': loader, 'setLoader': setLoader, 'rows': rows, 'setRows': setRows
      , 'totalOrders': totalOrders, 'setTotalOrders': setTotalOrders, 'totalSales': totalSales, 'setTotalSales': setTotalSales, 'totalStock': totalStock, 'setTotalStock': setTotalStock,'totalStockValue': totalStockValue,'setTotalValue': setTotalValue
    }}>{
        props.children
      }</SharedContext.Provider>
  )
}

export default SharedState