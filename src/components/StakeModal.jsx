import React, { useState, useContext } from 'react'
import { ImCross } from 'react-icons/im'
import { TransactionContext } from '../context/TransactionContext'
const StakeModal = (props) => {
  const {
    onClose,
    stakingLength,
    stakingPercent,
    amount,
    setAmount,
    stake,
    poolId,
  } = props

  const { isLoadingStake, setIsLoadingStake } = useContext(TransactionContext)
  const [ amountInput, setAmountInput ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    stake(amount, poolId)
  }


  return (
    <>
      <div
        onClick={() => {
          props.onClose()
          setIsLoadingStake(false)
        }}
        //    className="flex flex-col  justify-center items-center bg-black/[.5] absolute top-[-400px]  right-0 left-0 bottom-0 min-h-[2000px]"
        // >
        className="flex flex-col  justify-center items-center bg-black/[.5] fixed top-[0px]  right-0 left-0 bottom-0 "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-10  mt-10 flex flex-col items-center justify-center blue-glassmorphism"
        >
          <div className="flex flex-row gap-20">
            <h1 className="text-white font-body text-3xl">Stake Asset</h1>
            <ImCross
              fontSize={16}
              color="#fff"
              onMouseOver={({ target }) => (target.style.color = '#EF4444')}
              onMouseOut={({ target }) => (target.style.color = '#fff')}
              onClick={() => {
                props.onClose()
                setIsLoadingStake(false)
              }}
              className="cursor-pointer "
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                placeholder="Amount"
                type="number"
                step="0.01"
                min={0}
                onKeyPress={(event) => {
                  if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
                onChange={(e) => {
                  if (
                    Number(e.target.value) != '' &&
                    Number(e.target.value) > 0
                  ) {
                    setAmountInput(Number(e.target.value))
                    setAmount(e.target.value)
                  } else {
                    setAmountInput('')
                  }
                }}
                // value={amountInput}
                required={true}
                className="mt-5 mb-1 w-full rounded-md p-3 outline-none bg-transparent text-white border-[1px] bg-gray-900 text-lg border-gray-900 hover:border-gray-400 focus-within:border-gray-400"
              />
            </label>
            <p className="text-white  text-sm w-full items-center justify-center ">
              {stakingLength} days @ {stakingPercent}% APY
            </p>
            <button
              disabled={
                amountInput == '' ? true : isLoadingStake ? true : false
              }
              type="submit"
              className={`w-full  py-5 mt-5 rounded-3xl ${
                amountInput == ''
                  ? 'cursor-not-allowed bg-slate-400 '
                  : isLoadingStake
                  ? 'cursor-not-allowed bg-slate-400 '
                  : 'cursor-pointer bg-blue-700 transition ease-in-out hover:bg-blue-800'
              }  `}
            >
              {isLoadingStake ? (
                <div className="flex justify-center items-center ">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white-700" />
                </div>
              ) : (
                <p className="text-white text-base font-semibold ">
                  {amountInput == '' ? 'Enter Amount' : 'Stake'}
                </p>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default StakeModal
