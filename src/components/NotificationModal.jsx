import React, { useState, useContext } from 'react'
import { BsXSquareFill } from 'react-icons/bs'
import { TransactionContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/shortenAddress'
const NotificationModal = (props) => {
  const { onClose, txNotification } = props

  return (
    <>
      <div
        // onClick={() => {
        //   props.onClose()
        // }}
        className="flex flex-col  justify-center items-center  absolute top-10 right-10 "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" p-5  mt-20 flex flex-col  bg-gray-700 border-radius: 16px rounded-lg"
        >
          <div className="flex flex-row gap-20">
            <h1 className="text-white font-bold  text-xl mr-20">
              Transaction receipt
            </h1>
            <BsXSquareFill
              fontSize={32}
              color="#fff"
              onMouseOver={({ target }) => (target.style.color = '#EF4444')}
              onMouseOut={({ target }) => (target.style.color = '#fff')}
              onClick={() => {
                props.onClose()
              }}
              className="cursor-pointer hover:color-[#00000] transition ease-in-out"
            />
          </div>
          <a className="text-blue-500 font-body text-base underline mt-5" href={`https://mumbai.polygonscan.com/tx/${txNotification}`}  target="_blank">
            View on Mumbai: {shortenAddress(txNotification)}
          </a>
        </div>
      </div>
    </>
  )
}

export default NotificationModal
