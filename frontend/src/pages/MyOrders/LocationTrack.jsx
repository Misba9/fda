// import React, { useContext, useEffect, useState } from 'react'
// import './MyOrders.css'
// import axios from 'axios'
// import { StoreContext } from '../../Context/StoreContext';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {
  
//   const [data,setData] =  useState([]);
//   const {url,token} = useContext(StoreContext);

//   const fetchOrders = async () => {
//     const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//     setData(response.data.data)
//   }

//   useEffect(()=>{
//     if (token) {
//       fetchOrders();
//     }
//   },[token])

//   return (
//   )
// }

// export default MyOrders
