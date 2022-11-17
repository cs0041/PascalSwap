import React, { useState, useContext } from 'react'

import { TransactionContext } from '../context/TransactionContext'

import pusd from '../../images/images/crypto.png'
import thb from '../../images/images/tether.png'
import { Loader } from './'
import StakeModal from './StakeModal'
import CountdownTimer from './CountdownTimer'


const Stake = () => {
  const { pool, assets, isLoading, currentAccount, withdraw, stake } =
    useContext(TransactionContext)
  // staking
  const [showStakeModal, setShowStakeModal] = useState(false)
  const [lockDay, setLockDay] = useState(undefined)
  const [apy, setAPY] = useState(undefined)
  const [amount, setAmount] = useState(0)
  const [poolId, setPoolID] = useState(undefined)
  const [showClose, setShowClose] = useState(false)

  const openStakingModal = (lockDay, apy, positionId) => {
    setShowStakeModal(true)
    setLockDay(lockDay)
    setAPY(apy)
    setPoolID(positionId)
  }
  document.title = 'Stake | PascalSwap'

  return (
    <div className="relative flex flex-col w-screen h-screen  items-center">
      <div className="p-10  mt-10 flex flex-col items-center justify-center blue-glassmorphism ">
        <span className="text-white font-bold text-5xl mb-20">
          Pools Staking
        </span>

        <div class="w-full grid grid-cols-4 gap-x-24  mb-10 justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">Assets</span>
            <span className="text-blue-600 font-bold text-sm">
              (Assets you stake)
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">APY</span>
            <span className="text-blue-600 font-bold text-sm">
              (Annual percentage yield)
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">TimeLock</span>
            <span className="text-blue-600 font-bold text-sm">(lock time)</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">% Fee</span>
            <span className="text-red-600 font-bold text-sm">
              (withdarw before timelock)
            </span>
          </div>
        </div>

        <div className="h-[10px] w-full bg-gray-400 my-2" />

        {currentAccount ? (
          isLoading ? (
            <Loader />
          ) : (
            <div className="w-full ">
              {pool.length > 0 &&
                pool.map((a, idx) => (
                  <div className="grid grid-cols-4 gap-x-24 mt-10  justify-center items-center ">
                    <div className=" gap-3 flex flex-row justify-evenly items-center ">
                      <img
                        src={a.symbol == 'PUSD' ? pusd : thb}
                        alt="logo"
                        className="w-16 "
                      />
                      <span className="text-white font-bold text-xl">
                        {a.symbol}
                      </span>
                    </div>

                    <div className="text-white font-bold text-xl flex   justify-center items-center">
                      {Number(a.apy) / 100} %
                    </div>
                    <div className="text-white font-bold text-xl flex   justify-center items-center">
                      {a.lockPeriods} Days
                    </div>
                    <div className="ml-6 flex flex-row  justify-evenly items-center ">
                      <span className="text-white font-bold text-xl ">
                        {Number(a.fee).toFixed(0)}%
                      </span>
                      <button
                        type="button"
                        className="bg-blue-700 hover:bg-blue-800 py-2 px-7 mx-4 rounded-full cursor-pointer "
                        onClick={() =>
                          openStakingModal(a.lockPeriods, a.apy, a.poolId)
                        }
                      >
                        <p className="text-white text-base font-semibold  ">
                          staked
                        </p>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )
        ) : (
          <div className="text-white font-bold text-xl">Pls Connect Wallet</div>
        )}
      </div>

      {/* /////////////////////////////////////// */}

      <div className=" p-10  mt-10 flex flex-col items-center justify-center blue-glassmorphism">
        <span className="text-white font-bold text-5xl mb-8">
          Staked Assets
        </span>
        <div class=" flex items-center justify-center gap-3  mb-8">
          <input
            onClick={() => {
              setShowClose(!showClose)
            }}
            type="checkbox"
            class=" appearance-none w-16 focus:outline-none checked:bg-blue-600 h-8 bg-gray-600 rounded-full before:inline-block before:rounded-full before:bg-white before:h-8 before:w-8 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0 "
          />
          <span className="text-white font-bold">Show Close</span>
        </div>

        <div class="grid grid-cols-6 gap-x-24  mb-10 w-full ">
          <div className="flex flex-col justify-center items-center ">
            <span className="text-white font-bold text-xl">Assets</span>
            <span className="text-blue-600 font-bold text-sm">
              (Assets you stake)
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">APY</span>
            <span className="text-blue-600 font-bold text-sm">
              (Annual percentage yield)
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">Days Remaining</span>
            <span className="text-blue-600 font-bold text-sm">
              ( lock time)
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">AmountStaked</span>
            <span className="text-blue-600 font-bold text-sm">
              ( Stakeing asset amount)
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">Interest</span>
            <span className="text-red-600 font-bold text-sm">
              (Interest APY)
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-bold text-xl">Amount Fee</span>
            <span className="text-red-600 font-bold text-sm">
              (withdarw before timelock)
            </span>
          </div>
        </div>

        <div className="h-[10px] w-full bg-gray-400 my-2" />

        {currentAccount ? (
          isLoading ? (
            <Loader />
          ) : (
            <div className="w-full ">
              {assets.map((a, idx) => (
                <>
                  {showClose ? (
                    a.open ? (
                      ''
                    ) : (
                      <div className="grid grid-cols-6 gap-x-24 mt-10    justify-center items-center ">
                        <div className=" gap-3 w- flex flex-row justify-evenly items-center  ">
                          <img
                            src={a.symbol == 'PUSD' ? pusd : thb}
                            alt="logo"
                            className="w-16 "
                          />
                          <span className="text-white font-bold text-xl">
                            {a.symbol}
                          </span>
                        </div>
                        <div className="text-white font-bold text-xl  flex   justify-center items-center">
                          {a.percentInterest} %
                        </div>
                        <div className="text-white font-bold text-xl  flex   justify-center items-center">
                          {a.open ? (
                            <CountdownTimer
                              countdownTimestampMs={Number(
                                a.daysRemaining + '000'
                              )}
                            />
                          ) : (
                            'close'
                          )}
                        </div>
                        <div className="text-white font-bold text-xl  flex   justify-center items-center">
                          {a.amountStaked}
                        </div>
                        <div className="text-white font-bold text-xl  flex   justify-center items-center">
                          {Number(a.amountInterest).toFixed(6)}
                        </div>
                        <div className="ml-6 flex flex-row justify-evenly items-center ">
                          <span className="text-white font-bold text-xl ">
                            {a.amountFee}
                          </span>
                          <button
                            disabled={!a.open}
                            type="button"
                            className={`${
                              a.open
                                ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer'
                                : 'cursor-not-allowed bg-slate-400'
                            }  py-2 px-7 mx-4 rounded-full  `}
                            onClick={async () => {
                              withdraw(a.positionId)
                            }}
                          >
                            <p
                              className={`${
                                a.open
                                  ? 'text-white transition ease-in-out'
                                  : 'text-red-600'
                              } text-base font-bold `}
                            >
                              {a.open ? 'withdraw' : 'close'}
                            </p>
                          </button>
                        </div>
                      </div>
                    )
                  ) : a.open ? (
                    <div className="grid grid-cols-6 gap-x-24 mt-10    justify-center items-center ">
                      <div className=" gap-3 w- flex flex-row justify-evenly items-center  ">
                        <img
                          src={a.symbol == 'PUSD' ? pusd : thb}
                          alt="logo"
                          className="w-16 "
                        />
                        <span className="text-white font-bold text-xl">
                          {a.symbol}
                        </span>
                      </div>
                      <div className="text-white font-bold text-xl  flex   justify-center items-center">
                        {a.percentInterest} %
                      </div>
                      <div className="text-white font-bold text-xl  flex   justify-center items-center">
                        {a.open ? (
                          <CountdownTimer
                            countdownTimestampMs={Number(
                              a.daysRemaining + '000'
                            )}
                          />
                        ) : (
                          'close'
                        )}
                      </div>
                      <div className="text-white font-bold text-xl  flex   justify-center items-center">
                        {a.amountStaked}
                      </div>
                      <div className="text-white font-bold text-xl  flex   justify-center items-center">
                        {Number(a.amountInterest).toFixed(6)}
                      </div>
                      <div className="ml-6 flex flex-row justify-evenly items-center">
                        <span className="text-white font-bold text-xl ">
                          {a.amountFee}
                        </span>
                        <button
                          disabled={!a.open}
                          type="button"
                          className={`${
                            a.open
                              ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer'
                              : 'cursor-not-allowed bg-slate-400'
                          }  py-2 px-7 mx-4 rounded-full  `}
                          onClick={async () => {
                            withdraw(a.positionId)
                          }}
                        >
                          <p
                            className={`${
                              a.open
                                ? 'text-white transition ease-in-out'
                                : 'text-red-600'
                            } text-base font-bold `}
                          >
                            {a.open ? 'withdraw' : 'close'}
                          </p>
                        </button>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              ))}
            </div>
          )
        ) : (
          <div className="text-white font-bold text-xl">Pls Connect Wallet</div>
        )}
      </div>
      {showStakeModal && (
        <StakeModal
          onClose={() => setShowStakeModal(false)}
          stakingLength={lockDay}
          stakingPercent={apy}
          amount={amount}
          setAmount={setAmount}
          stake={stake}
          poolId={poolId}
        />
      )}
      <div className="mt-10  w-full min-h-[50px] "></div>
    </div>
  )
}
export default Stake
