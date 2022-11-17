import React, { useState, useContext, useEffect } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { TransactionContext } from '../context/TransactionContext'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import SettingModal from './SettingModal'
import ConfirmTxModal from './ConfirmTxModal'

import pusd from '../../images/images/crypto.png'
import thb from '../../images/images/tether.png'
const Swap = () => {
  const {
    isLoadingPrice,
    amountOut,
    amountIn,
    dataAmountOut,
    dataAmountIn,
    isLoadingBalnce,
    dataBalnce,
    dataBalncePool,
    swapRouter,
    setDataAmountOut,
    setDataAmountIn,
    setIsCancelTx,
  } = useContext(TransactionContext)
  //data input
  const [inputdata, setInputData] = useState('')
  const [outputdata, setOutputData] = useState('')
  const [inputTop, setInputTop] = useState(true)

  //setting
  const [showSettingModal, setShowSettingModal] = useState(false)
  const [slippageAmount, setSlippageAmount] = useState(0.1)
  const [deadlineMinutes, setDeadlineMinutes] = useState(20)

  //tx confirm
  const [showConfirmTxModal, setShowConfirmTxModal] = useState(false)

  // token Top
  const [addressTokenTop, setAddressTokenTop] = useState('0xE1338C1122a45735Fab37255Ec7EFbE182E1EeE7')
  const [symbolTokenTop, setSymbolTokenTop] = useState('PUSD')
  // token below
  const [addressTokenBelow, setAddressTokenBelow] = useState('0x16a60c8B5bD9ae75F59CdED7510Bb8c9e29527f7')
  const [symbolTokenBelow, setSymbolTokenBelow] = useState('THB')

  document.title = 'Swap | PascalSwap'



  return (
    <>
      <div className="flex w-full justify-center items-center mt-20 relative">
        <div className="p-2  max-w-[450px] min-w-[400px] flex flex-col justify-start items-center blue-glassmorphism ">
          <div className="flex flex-row justify-between w-full py-2 px-3 items-center mb-2">
            <div className=" text-white font-bold">Swap</div>
            <AiFillSetting
              fontSize={24}
              color="#fff"
              onMouseOver={({ target }) => (target.style.color = '#848484')}
              onMouseOut={({ target }) => (target.style.color = 'white')}
              onClick={() => {
                setShowSettingModal(true)
              }}
              className="cursor-pointer hover:text-red-400"
            />
          </div>
          <div className="mb-4 w-full">
            <div
              className="px-5 py-5 flex justify-between items-center flex-col w-full bg-gray-900 border-[1px] border-gray-900 focus-within:border-gray-400  rounded-[20px]
              transition-all hover:border-gray-400"
            >
              <div className="flex flex-row gap-5">
                <input
                  id="inputTop"
                  type="number"
                  placeholder="0"
                  value={
                    inputTop
                      ? inputdata
                      : dataAmountIn
                      ? Number(dataAmountIn).toFixed(6)
                      : ''
                  }
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onInput={(e) => {
                    amountOut(e.target.value, addressTokenTop)
                    setInputTop(true)
                    setInputData(e.target.value)
                  }}
                  className="w-full  flex-1 bg-transparent outline-none text-4xl text-white "
                />

                <button className=" gap-2 flex flex-row items-center bg-gray-700 py-2 px-4 rounded-xl font-poppins font-bold text-white cursor-default">
                  {symbolTokenTop}
                  <img
                    src={symbolTokenTop == 'PUSD' ? pusd : thb}
                    alt="logo"
                    className="w-8 "
                  />
                </button>
              </div>

              <div className="w-full  mt-3 ">
                <div className="flex flex-row justify-end gap-2">
                  <p className="text-white flex flex-row items-center gap-1">
                    Balance:
                    {isLoadingBalnce ? (
                      <svg
                        class="h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : dataBalnce ? (
                      <span className="text-white">
                        {Number(dataBalnce[addressTokenTop]).toFixed(4)}
                      </span>
                    ) : (
                      <span className="text-red">connecnt wallet</span>
                    )}
                  </p>

                  <span
                    onClick={() => {
                      setInputTop(true)
                      setInputData(dataBalnce[addressTokenTop])
                      amountOut(dataBalnce[addressTokenTop], addressTokenTop)
                    }}
                    className="text-blue-500 cursor-pointer hover:text-blue-700 transition-all"
                  >
                    Max
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div
              onClick={() => {
                const temp_addressTokenBelow = addressTokenBelow
                const temp_symbolTokenBelow = symbolTokenBelow
                setAddressTokenBelow(addressTokenTop)
                setSymbolTokenBelow(symbolTokenTop)
                setAddressTokenTop(temp_addressTokenBelow)
                setSymbolTokenTop(temp_symbolTokenBelow)

                setInputData('')
                setOutputData('')
                setInputTop(true)

                setDataAmountOut('')
                setDataAmountIn('')
              }}
              className="bg-gray-900 transition-all cursor-pointer rounded-full p-2 hover:bg-gray-600"
            >
              <AiOutlineArrowDown fontSize={20} color="#fff" />
            </div>
          </div>

          <div className="mb-4 w-full">
            <div
              className="px-5 py-5 flex justify-between items-center flex-col w-full bg-gray-900 border-[1px] border-gray-900 focus-within:border-gray-400  rounded-t-[20px]
              transition-all hover:border-gray-400"
            >
              <div className="flex flex-row  gap-5">
                <input
                  type="number"
                  placeholder="0"
                  value={
                    inputTop
                      ? dataAmountOut
                        ? Number(dataAmountOut).toFixed(6)
                        : ''
                      : outputdata
                      ? outputdata
                      : ''
                  }
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputTop(false)
                    setOutputData(e.target.value)
                    amountIn(e.target.value, addressTokenTop)
                  }}
                  className="w-full  flex-1 bg-transparent outline-none text-4xl text-white"
                />
                <button className=" gap-2 flex flex-row items-center bg-gray-700 py-2 px-4 rounded-xl font-poppins font-bold text-white cursor-default">
                  {symbolTokenBelow}
                  <img
                    src={symbolTokenBelow == 'PUSD' ? pusd : thb}
                    alt="logo"
                    className="w-8 "
                  />
                </button>
              </div>

              <div className="w-full  mt-3">
                <div className="flex flex-row justify-end ">
                  <p className="text-white flex flex-row items-center gap-1">
                    Balance:
                    {isLoadingBalnce ? (
                      <svg
                        class="h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : dataBalnce ? (
                      <span className="text-white">
                        {Number(dataBalnce[addressTokenBelow]).toFixed(4)}
                      </span>
                    ) : (
                      <span className="text-red">connecnt wallet</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full bg-gray-900 rounded-b-[15px] mt-[1px] py-3 px-5 justify-start items-center gap-2">
              {isLoadingPrice ? (
                <>
                  <svg
                    class="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-white text-xs">Fetching price...</p>
                </>
              ) : (
                <>
                  <BsInfoCircle fontSize={13} color="#fff" />
                  {inputTop ? (
                    dataAmountOut ? (
                      <p className="text-white text-xs">{`1 ${symbolTokenTop} = ${(
                        Number(dataAmountOut) / Number(inputdata)
                      ).toFixed(6)} ${symbolTokenBelow}`}</p>
                    ) : (
                      <p className="text-red-600 font-bold text-xs">
                        input amount or invalid
                      </p>
                    )
                  ) : dataAmountIn ? (
                    <p className="text-white text-xs">{`1 ${symbolTokenTop} = ${(
                      Number(outputdata) / Number(dataAmountIn)
                    ).toFixed(6)}  ${symbolTokenBelow}`}</p>
                  ) : (
                    <p className="text-red-600 font-bold text-xs">
                      input amount or invalid
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            disabled={
              (dataAmountOut == '' && dataAmountIn == '') ||
              Number(inputdata) > Number(dataBalnce[addressTokenTop])
            }
            onClick={() => {
              if (inputTop) {
                swapRouter(
                  addressTokenTop,
                  inputdata,
                  String(
                    Number(dataAmountOut) -
                      Number(dataAmountOut) * (Number(slippageAmount) / 100)
                  ),
                  String(Math.floor(Date.now() / 1000 + deadlineMinutes * 60))
                )
              } else {
                swapRouter(
                  addressTokenTop,
                  dataAmountIn,
                  String(
                    Number(outputdata) -
                      Number(outputdata) * (Number(slippageAmount) / 100)
                  ),
                  Math.floor(Date.now() / 1000 + deadlineMinutes * 60)
                )
              }

              setShowConfirmTxModal(true)
            }}
            className={` ${
              inputTop
                ? Number(inputdata) <= Number(dataBalnce[addressTokenTop])
                  ? dataAmountOut
                    ? 'cursor-pointer bg-blue-700 hover:bg-blue-800'
                    : dataAmountIn
                    ? 'cursor-pointer bg-blue-700 hover:bg-blue-800'
                    : 'cursor-not-allowed bg-gray-700'
                  : 'cursor-not-allowed bg-gray-700'
                : Number(outputdata) <=
                  Number(dataBalncePool[addressTokenBelow])
                ? dataAmountOut
                  ? 'cursor-pointer bg-blue-700 hover:bg-blue-800'
                  : dataAmountIn
                  ? 'cursor-pointer bg-blue-700 hover:bg-blue-800'
                  : 'cursor-not-allowed bg-gray-700'
                : 'cursor-not-allowed bg-gray-700'
            }
             mt-2   text-white border-none outline-none w-full py-7 font-bold text-2xl rounded-3xl transition-all `}
          >
            {inputTop
              ? Number(inputdata) <= Number(dataBalnce[addressTokenTop])
                ? 'Swap'
                : 'Insufficient balance'
              : Number(outputdata) <= Number(dataBalncePool[addressTokenBelow])
              ? 'Swap'
              : 'Insufficient Pool balance'}
          </button>

          <div className="flex flex-row w-full justify-between items-center rounded-xl bg-gray-900 text-sm text-gray-300 mt-5 p-3">
            <div>
              <p>Minimum received</p>
              <p>Price Impact</p>
              <p>Liquidity Provider Fee</p>
            </div>
            <div>
              <p className="  flex justify-end">
                {isLoadingPrice ? (
                  <>
                    <svg
                      class="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </>
                ) : inputTop ? (
                  Number(
                    Number(dataAmountOut) -
                      Number(dataAmountOut) * (Number(slippageAmount) / 100)
                  ).toFixed(4)
                ) : (
                  Number(
                    Number(outputdata) -
                      Number(outputdata) * (Number(slippageAmount) / 100)
                  ).toFixed(4)
                )}
              </p>
              <p className="  flex justify-end">
                {isLoadingPrice ? (
                  <>
                    <svg
                      class="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </>
                ) : inputTop ? (
                  dataAmountOut ? (
                    `${(
                      ((Number(dataBalncePool[addressTokenBelow]) /
                        Number(dataBalncePool[addressTokenTop]) -
                        Number(dataAmountOut) / Number(inputdata)) /
                        (Number(dataBalncePool[addressTokenBelow]) /
                          Number(dataBalncePool[addressTokenTop]))) *
                      100
                    ).toFixed(2)} %`
                  ) : (
                    '-'
                  )
                ) : dataAmountIn ? (
                  ` ${(
                    ((Number(dataBalncePool[addressTokenBelow]) /
                      Number(dataBalncePool[addressTokenTop]) -
                      Number(outputdata) / Number(dataAmountIn)) /
                      (Number(dataBalncePool[addressTokenBelow]) /
                        Number(dataBalncePool[addressTokenTop]))) *
                    100
                  ).toFixed(2)} %`
                ) : (
                  '-'
                )}
              </p>
              <p className="  flex justify-end">0% fee</p>
            </div>
          </div>
        </div>

        {showSettingModal && (
          <SettingModal
            onClose={() => setShowSettingModal(false)}
            setDeadlineMinutes={setDeadlineMinutes}
            deadlineMinutes={deadlineMinutes}
            setSlippageAmount={setSlippageAmount}
            slippageAmount={slippageAmount}
          />
        )}
        {showConfirmTxModal && (
          <ConfirmTxModal
            onClose={() => {
              setIsCancelTx(false)

              setShowConfirmTxModal(false)

              setInputData('')
              setOutputData('')
              setInputTop(true)
              setDataAmountOut('')
              setDataAmountIn('')
            }}
          />
        )}
      </div>
    </>
  )
}
export default Swap
