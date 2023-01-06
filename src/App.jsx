import { Navbar, Swap, Stake, Transfer, Faucet } from './components'
import {Link, Route, Routes, Navigate } from 'react-router-dom'

import React, { useState,useEffect, useContext } from 'react'
import { TransactionContext } from './context/TransactionContext'
import NotificationModal from './components/NotificationModal'
const App = () => {
 

  const { notification, txNotification, setNotification } =useContext(TransactionContext)

   useEffect(() => {
     const timeout = setTimeout(() => {
       console.log('notification close')
       setNotification(false)
     }, 5000)

     return () => clearTimeout(timeout)
   }, [notification])

  return (
    <div className="relative flex ">
      <div className="w-full h-full flex flex-col overflow-y-scroll  bg-[#0D111C]   fixed">
        <Navbar />

        <div className=" flex flex-col ">
          <div className="flex-1  pb-40 justify-center items-center">
            <Routes>
              <Route path="/swap" element={<Swap />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/faucet" element={<Faucet />} />
              <Route path="/" element={<Navigate to="/swap" />} />
            
            </Routes>
          </div>
        </div>
      </div>
      {notification && (
        <NotificationModal
          onClose={() => setNotification(false)}
          txNotification={txNotification}
        />
      )}
    </div>
  )
}


export default App
