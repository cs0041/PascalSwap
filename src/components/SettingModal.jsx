import React, { useState } from 'react'
const SettingModal = (props) => {
  const {
    onClose,
    slippageAmount,
    setSlippageAmount,
    deadlineMinutes,
    setDeadlineMinutes,
  } = props
  
  const [invalidSlippage,setInvalidSlippage] = useState(false)
  const [invalidDeadlineMinutes, setInvalidDeadlineMinutes] = useState(false)
  const [inputSlippage, setInputSlippage] = useState(slippageAmount)
  const [inputDeadlineMinutes, setInputDeadlineMinutes] = useState(deadlineMinutes)
  return (
    <>
  
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-3  flex flex-col items-center justify-center modalblue-glassmorphism z-10  absolute top-[60px] "
         >
          <div className="flex flex-col w-full justify-start  ">
            <h1 className="text-white font-bold text-1xl">Setting</h1>
            <p className="text-gray-400 font-body text-1xl">
              Slippage Tolerance
            </p>

            <div className="flex flex-row  max-w-[300px] min-w-[250px] items-center">
              <input
                placeholder="0.1"
                type="number"
                value={inputSlippage}
                onChange={(e) => {
                  setInputSlippage(e.target.value)
                  if (
                    Number(e.target.value) < 0 ||
                    Number(e.target.value) > 100
                  ) {
                    setInvalidSlippage(true)
                    setSlippageAmount(0.1)
                  } else if (Number(e.target.value) == '') {
                    setSlippageAmount(0.1)
                    setInvalidSlippage(false)
                  } else {
                    setSlippageAmount(e.target.value)
                    setInvalidSlippage(false)
                  }
                }}
                required={true}
                className={`my-1  rounded-full p-2 outline-none bg-transparent ${
                  invalidSlippage ? 'text-red-600' : 'text-white'
                } border-2 border-[#131A2A] text-sm bg-[#131A2A] hover:border-blue-500 focus-within:border-blue-500`}
              />
              <span className="text-white text-xl ml-1">%</span>
            </div>

            {invalidSlippage ? (
              <p className="text-red-600  text-sm">invalid slippage</p>
            ) : (
              <div></div>
            )}

            <p className="text-gray-400 font-body text-1xl">
              Transaction Deadline
            </p>

            <div className="flex flex-row  max-w-[300px] min-w-[250px] items-center">
              <input
                placeholder="20"
                type="number"
                value={inputDeadlineMinutes}
                onChange={(e) => {
                  setInputDeadlineMinutes(e.target.value)
                  if (Number(e.target.value) < 1) {
                    setInvalidDeadlineMinutes(true)
                    setDeadlineMinutes(20)
                  } else if (Number(e.target.value) == '') {
                    setDeadlineMinutes(20)
                    setInvalidDeadlineMinutes(false)
                  } else {
                    setDeadlineMinutes(e.target.value)
                    setInvalidDeadlineMinutes(false)
                  }
                }}
                required={true}
                className={`my-1  rounded-full p-2 outline-none bg-transparent ${
                  invalidDeadlineMinutes ? 'text-red-600' : 'text-white'
                } border-2 border-[#131A2A] text-sm bg-[#131A2A] hover:border-blue-500 focus-within:border-blue-500`}
              />
              <span className="text-white  ml-1">minutes</span>
            </div>

            {invalidDeadlineMinutes ? (
              <p className="text-red-600  text-sm">invalid DeadlineMinutes</p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
       <div
        onClick={() => {
          props.onClose()
        }}
        className="flex flex-col  justify-center items-center  absolute  h-[110vh] top-[-200px] w-full bottom-0   "
       >

      </div>
    </>
  )
}

export default SettingModal
