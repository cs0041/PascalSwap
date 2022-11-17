import React, { useState, useContext } from 'react'
import { ImCross } from 'react-icons/im'
import { BsArrowUpCircleFill } from 'react-icons/bs'
import { BiError } from 'react-icons/bi'
import { TransactionContext } from '../context/TransactionContext'

const ConfirmTxModal = (props) => {
  const { txNotification, isLoadingSwap,  isCancelTx } = useContext(TransactionContext)

  const { onClose } = props

  return (
    <>
      <div
        onClick={() => {
          props.onClose()
        }}
        className="flex flex-col  justify-center items-center  fixed top-[-500px] right-[16px] left-0 bottom-0 z-50 bg-black/[.5]"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-3  flex flex-col  modaltxblue-glassmorphism  min-w-[400px]  max-w-[400px] max-h-[350px] min-h-[350px]"
        >
          {!isLoadingSwap ? (
            isCancelTx ? (
              <>
                <div className="flex flex-row w-ful justify-between  mt-1 ">
                  <span className="text-white">Error</span>
                  <ImCross
                    fontSize={16}
                    color="#fff"
                    onMouseOver={({ target }) =>
                      (target.style.color = '#EF4444')
                    }
                    onMouseOut={({ target }) => (target.style.color = '#fff')}
                    onClick={() => {
                      props.onClose()
                    }}
                    className="cursor-pointer "
                  />
                </div>

                <div className="flex flex-row w-full items-center justify-center mt-10">
                  <BiError fontSize={64} color="#FF0000" />
                </div>

                <p className="text-white text-xl flex justify-center mt-10">
                  Transaction rejected
                </p>

                <button
                  onClick={() => {
                    props.onClose()
                  }}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 mt-10 text-white 
                        border-none outline-none w-full py-4 font-bold text-2xl rounded-xl transition-all"
                >
                  Dissmiss
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-row w-full justify-end mt-1 ">
                  <span></span>
                  <ImCross
                    fontSize={16}
                    color="#fff"
                    onMouseOver={({ target }) =>
                      (target.style.color = '#EF4444')
                    }
                    onMouseOut={({ target }) => (target.style.color = '#fff')}
                    onClick={() => {
                      props.onClose()
                    }}
                    className="cursor-pointer "
                  />
                </div>

                <div className="flex flex-row w-full items-center justify-center mt-10">
                  <BsArrowUpCircleFill fontSize={64} color="#fff" />
                </div>

                <p className="text-white text-xl flex justify-center mt-10">
                  Transaction submitted
                </p>

                <button
                  onClick={() => {
                    props.onClose()
                  }}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 mt-10 text-white 
                        border-none outline-none w-full py-4 font-bold text-2xl rounded-xl transition-all"
                >
                  Close
                </button>

                <a
                  className="text-blue-500 font-body text-sm  mt-2 flex justify-center"
                  href={`https://mumbai.polygonscan.com/tx/${txNotification}`}
                  target="_blank"
                >
                  View on Mumbai
                </a>
              </>
            )
          ) : (
            <>
              <div className="flex flex-row w-full justify-end mt-1 ">
                <span></span>
                <ImCross
                  fontSize={16}
                  color="#fff"
                  onMouseOver={({ target }) => (target.style.color = '#EF4444')}
                  onMouseOut={({ target }) => (target.style.color = '#fff')}
                  onClick={() => {
                    props.onClose()
                  }}
                  className="cursor-pointer "
                />
              </div>

              <div className="flex justify-center items-center mt-10">
                <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-blue-700" />
              </div>

              <div className="flex flex-col justify-center items-center mt-14 gap-6">
                <p className="text-white text-xl ">Waiting for confirmation</p>
                <p className="text-gray-400 text-sm ">
                  Confirm this transaction in your wallet
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ConfirmTxModal
