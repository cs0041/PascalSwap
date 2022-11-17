import React, { useState, useContext, useEffect } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import CountdownTimer from './CountdownTimer'

import polygon from '../../images/images/polygon.png'
import pusd from '../../images/images/crypto.png'
import thb from '../../images/images/tether.png'

const Faucet = () => {
  const { currentAccount, faucet, isLoadingFaucet, timeUnLockFaucet } =
    useContext(TransactionContext)
document.title = 'Facet | PascalSwap'
  return (
    <>
      <div className="flex  flex-col w-full justify-center items-center mt-20">
        <div className="p-5  max-w-[500px] min-w-[400px] flex flex-col w-full justify-start  blue-glassmorphism mb-10 ">
          <h1 className="text-white text-3xl font-bold  ">Get Gas</h1>

          <img
            src={polygon}
            color="000000"
            className="w-24 fixed right-0 top-0 "
          />

          <p className="text-gray-400 text-sm  mt-5  ">
            This faucet transfers Matic
          </p>
          <p className="text-gray-400 text-sm  ">
            for use as gas on Matic Mumbai testnets
          </p>
          <div
            onClick={() => window.open('https://faucet.polygon.technology/')}
            className="py-3 hover:bg-blue-800 bg-blue-700   rounded-md max-w-[100px] flex justify-center items-center  mt-5 text-white font-bold text-sm cursor-pointer
          "
          >
            Click
          </div>
        </div>

        <div className="p-5  max-w-[500px] min-w-[400px] flex flex-col w-full justify-start  blue-glassmorphism ">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-white text-3xl font-bold  ">Get Test Tokens</h1>
            <div className="flex flex-row">
              <img src={thb} className="w-14 " />
              <img src={pusd} className="w-14" />
            </div>
          </div>
          <p className="text-gray-400 text-sm  mt-5  ">
            This faucet transfers TestToken (PUSD, THB)
          </p>
          <p className="text-gray-400 text-sm  ">
            on Matic Mumbai testnets for use in PascalSwap
          </p>
          <h2 className="text-white  text-lg font-bold   mt-10">NetWork</h2>
          <div
            className="py-3 bg-blue-700   rounded-md max-w-[100px] flex justify-center items-center  mt-5 text-white font-bold text-sm
          "
          >
            Mumbai
          </div>

          <h2 className="text-white text-lg font-bold   mt-5">
            Token received
          </h2>
          <div className="flex flex-row w-full ">
            <div
              className="py-3 px-3 bg-blue-700   rounded-md max-w-[120px] flex justify-center items-center mt-5 text-white font-bold text-sm
                "
            >
              100 PUSD
            </div>
            <div
              className="py-3 px-4 bg-blue-700   rounded-md max-w-[120px] flex justify-center items-center ml-3 mt-5 text-white font-bold text-sm
                "
            >
              1000 THB
            </div>
          </div>

          <h2 className="text-white  text-lg font-bold   mt-5">
            Wallet Address
          </h2>
          <div
            className="py-3 px-4 bg-blue-700   rounded-md w-full flex justify-center items-center  mt-5 text-white font-bold text-sm
                "
          >
            {currentAccount ? currentAccount : 'Pls Connect Wallet'}
          </div>

          <button
            disabled={
              isLoadingFaucet ||
              Number(timeUnLockFaucet) > Math.floor(Date.now() / 1000)
            }
            onClick={faucet}
            className={`${
              isLoadingFaucet
                ? 'cursor-not-allowed bg-gray-700'
                : Number(timeUnLockFaucet) > Math.floor(Date.now() / 1000)
                ? 'cursor-not-allowed bg-gray-700'
                : 'cursor-pointer bg-blue-700 hover:bg-blue-800'
            }  mt-5   text-white border-none outline-none w-full py-3 font-bold text-2xl rounded-md  transition-all `}
          >
            {isLoadingFaucet ? (
              <div className="flex justify-center items-center ">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white-700" />
              </div>
            ) : Number(timeUnLockFaucet) > Math.floor(Date.now() / 1000) ? (
              <CountdownTimer
                countdownTimestampMs={Number(timeUnLockFaucet + '000')}
              />
            ) : (
              'Get Faucet'
            )}
          </button>
        </div>
      </div>
    </>
  )
}
export default Faucet
