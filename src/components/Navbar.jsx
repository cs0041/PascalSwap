import { HiMenu, HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import React, { useEffect, useState, useContext } from 'react'
import {  useLocation } from 'react-router-dom'
import logo from '../../images/images/logo.png'
import { TransactionContext } from '../context/TransactionContext'
import { Link } from 'react-router-dom'
import { shortenAddress } from '../utils/shortenAddress'
import { BiError } from 'react-icons/bi'
const objTitlelink = [
  { title: 'Swap', link: 'swap' },
  { title: 'Stake', link: 'stake' },
  { title: 'Transfer', link: 'transfer' },
  { title: 'Faucet', link: 'faucet' },
]


const NavbarItem = ({title,link,currentPage, setCurrentPage,}) => {
  return (
    <Link to={`${link}`}>
      <div
        onClick={() => setCurrentPage(link)}
        className={`mx-2  text-base font-bold   cursor-pointer  transition ease-in-out  py-2 px-4 rounded-lg hover:bg-gray-800 ${
          link == currentPage ? 'text-white' : 'text-[#98a1c0]'
        } `}
      >
        {title}
      </div>
    </Link>
  )
}


const Navbar = () => {

const location = useLocation();

  const [currentPage, setCurrentPage] = useState( (location.pathname).slice(1))
  const { connectWallet, currentAccount, isLoadingTxNavBar, isChainId,checkNetWorkChainId,txNotification } =useContext(TransactionContext)
  return (
    <div className="w-full flex items-center p-4 justify-between ">
      <div className="flex flex-row justify-center items-center">
        <div className=" justify-center items-center mx-2">
          <img src={logo} alt="logo" className="w-14 cursor-pointer" />
        </div>
        <div className="flex flex-row  items-center  flex-initial">
          {objTitlelink.map((item, index) => (
            <NavbarItem
              key={item.title + index}
              title={item.title}
              link={item.link}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-row">
        {isChainId ? (
          ''
        ) : (
          <div
            onClick={checkNetWorkChainId}
            className="cursor-pointer min-w-[200px] flex flex-row bg-red-600 rounded-3xl text-white py-2 justify-center items-center"
          >
            <BiError fontSize={24} color="#ffffff" />
            wrong network <br />
          </div>
        )}
        {!currentAccount ? (
          <button
            type="button"
            onClick={connectWallet}
            className="bg-[#4c82fb]/[.24] py-2 px-7 mx-4 rounded-full cursor-pointer "
          >
            <li className="text-[#4c82fb] text-base font-semibold hover:text-[#4c82fb]/[.24] transition ease-in-out">
              Connect
            </li>
          </button>
        ) : isLoadingTxNavBar ? (
          <button
            onClick={() => {
              window.open(`https://mumbai.polygonscan.com/tx/${txNotification}`)
            }}
            type="button"
            className="bg-[#4c82fb] py-2 px-7 mx-4 rounded-full cursor-pointer border-2 border-[#202738]   hover:border-white "
          >
            <div className=" text-white font-bold  transition ease-in-out flex flex-row justify-center items-center gap-2">
              {`Pending`}
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
            </div>
          </button>
        ) : (
          <div
            className="bg-[#4c82fb]/[.24] py-2 px-7 mx-4 rounded-full "
          >
            <div className="text-[#4c82fb] text-base font-semibold hover:text-[#4c82fb]/[.24] transition ease-in-out">
              {shortenAddress(currentAccount)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Navbar
