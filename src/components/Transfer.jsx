import React, { useContext, useState } from 'react'
import { TbCurrencyBitcoin } from 'react-icons/tb'
import { BsInfoCircle } from 'react-icons/bs'

import { TransactionContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/shortenAddress'


const Transfer = () => {
  const { currentAccount, isLoadingTransfer,sendTransfer } = useContext(TransactionContext)

  const [selectToken, setSelectToken] = useState('PUSD')
  const [amountSend, setAmountSend] = useState('')
  const [addressTo, setAddressTo] = useState('')
  const [addressToken,setAddressToken] = useState('0xE1338C1122a45735Fab37255Ec7EFbE182E1EeE7')

    document.title = 'Transfer | PascalSwap'
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col  items-start  mt-20 gap-20">
        <div className="flex flex-col flex-1 items-center w-full  ">
          <h1 className="text-3xl  text-white py-1">
            Send Crypto
          </h1>
          <h1 className="text-3xl  text-white py-1">
              across the world
          </h1>
          <div className="p-3  rounded-xl h-40 w-72  my-5 eth-card  min-w-[400px] min-h-[200px]">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex flex-row justify-between">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <TbCurrencyBitcoin fontSize={24} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">Wallet</p>
              </div>
            </div>
          </div>

          <div className="px-5 pb-5 min-w-[460px]  w-full flex flex-col justify-start items-center blue-glassmorphism mt-8">
            <div className="flex flex-row w-full mb-3">
              <div
                onClick={() => {
                  setSelectToken('PUSD')
                  setAddressToken('0xE1338C1122a45735Fab37255Ec7EFbE182E1EeE7')
                }}
                className={`cursor-pointer py-3 px-3 bg-blue-700   rounded-md max-w-[120px] flex justify-center items-center mt-5 text-white font-bold text-xs  border-[1px]
                                transition-all  ${
                                  selectToken == 'PUSD'
                                    ? 'border-white '
                                    : '  border-blue-700'
                                } `}
                                 >
                PUSD
              </div>
              <div
                onClick={() => {
                  setSelectToken('THB')
                  setAddressToken('0x16a60c8B5bD9ae75F59CdED7510Bb8c9e29527f7')
                }}
                className={`cursor-pointer py-3 px-4 bg-blue-700   rounded-md max-w-[120px] flex justify-center items-center ml-3 mt-5 text-white font-bold text-xs  border-[1px]
                                transition-all  ${
                                  selectToken == 'THB'
                                    ? 'border-white '
                                    : ' border-blue-700'
                                }`}
              >
                THB
              </div>
            </div>

            <span className="text-white  text-sm  font-bold text-left w-full">
              Address To
            </span>

            <div
              className="my-3 flex justify-between items-center flex-col w-full  bg-gray-900 border-[1px] border-gray-900 focus-within:border-gray-400  rounded-lg
              transition-all hover:border-gray-400"
            >
              <input
                required={true}
                placeholder="0x..."
                type="text"
                value={addressTo}
                onChange={(e) => {
                  setAddressTo(e.target.value)
                }}
                className="m-2 w-full rounded-sm py-2 px-3 outline-none bg-transparent text-white border-none text-base "
              />
            </div>
            <span className="text-white text-sm font-bold text-left w-full">{`Amount ${selectToken}`}</span>

            <div
              className="my-3 flex justify-between items-center flex-col w-full  bg-gray-900 border-[1px] border-gray-900 focus-within:border-gray-400  rounded-lg
              transition-all hover:border-gray-400"
            >
              <input
                required={true}
                placeholder={`0`}
                type="number"
                value={amountSend}
                onChange={(e) => {
                  setAmountSend(e.target.value)
                }}
                onKeyPress={(event) => {
                  if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
                className="m-2 w-full rounded-sm py-2 px-3 outline-none bg-transparent text-white border-none text-base "
              />
            </div>

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            <button
              disabled={isLoadingTransfer}
              type="button"
              onClick={() => {
                sendTransfer(addressToken, addressTo, amountSend)
              }}
              className={`text-white font-bold w-full mt-2 p-3  rounded-lg  ${
                isLoadingTransfer
                  ? 'cursor-not-allowed bg-gray-700'
                  : 'cursor-pointer bg-blue-700 hover:bg-blue-800'
              }`}
            >
              {isLoadingTransfer ? (
                <div className="flex justify-center items-center ">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white-700" />
                </div>
              ) : (
                'Send Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Transfer
