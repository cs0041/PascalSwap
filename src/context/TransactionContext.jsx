import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers'

import { contractStakedABI, contractStakedAddress } from '../utils/StakedABI.js'
import { contractRouterABI, contractRouterAddress } from '../utils/RouterABI.js'
import { thbABI, thbAddress } from '../utils/THBABI.js'
import { pusdABI, pusdAddress } from '../utils/PUSDABI.js'
import { ERC20ABI } from '../utils/ERC20ABI'
import { contractFaucetABI, contractFaucetAddress } from '../utils/FaucetABI'

export const TransactionContext = React.createContext()

const { ethereum } = window

const getStakedContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const stakedContract = new ethers.Contract(
    contractStakedAddress,
    contractStakedABI,
    signer
  )

  return stakedContract
}
const getTokenContract = (_tokenAddress) =>{
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const tokenContract = new ethers.Contract(_tokenAddress, ERC20ABI, signer)

  return tokenContract
}
const getFaucetContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const FaucetContract = new ethers.Contract(
    contractFaucetAddress,
    contractFaucetABI,
    signer
  )

  return FaucetContract
}
const getRouterContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const routerContract = new ethers.Contract(
    contractRouterAddress,
    contractRouterABI,
    signer
  )

  return routerContract
}
export const TransactionProvider = ({ children }) => {
  const [provider, setProvider] = useState(undefined)
  const [pool, setPool] = useState([])
  const [assets, setAssets] = useState([])

  // helper
  const toString = (bytes32) => ethers.utils.parseBytes32String(bytes32)
  const toWei = (ether) => ethers.utils.parseEther(ether)
  const toEther = (wei) => ethers.utils.formatEther(wei)
  const toFixUnits = (amount, decimal) => ethers.utils.formatUnits(amount, decimal)

  const [currentAccount, setCurrentAccount] = useState('')

  //Loading stake
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingStake, setIsLoadingStake] = useState(false)

  //Notification
  const [notification, setNotification] = useState(false)
  const [txNotification, setTxNotification] = useState('')

  //Loading Price
  const [isLoadingPrice, setIsLoadingPrice] = useState(false)
  const [dataAmountOut, setDataAmountOut] = useState('')
  const [dataAmountIn, setDataAmountIn] = useState('')

  //balance user
  const [isLoadingBalnce, setIsLoadingBalnce] = useState(false)
  const [dataBalnce, setDataBalnce] = useState({})
  //balance pool
  const [dataBalncePool, setDataBalncePool] = useState({})

  //Swap
  const [isLoadingSwap, setIsLoadingSwap] = useState(false)
  const [isCancelTx, setIsCancelTx] = useState(false)

  //Navbar loading
  const [isLoadingTxNavBar, setIsLoadingTxNavBar] = useState(false)

  //Faucet loading
  const [isLoadingFaucet, setIsLoadingFaucet] = useState(false)

  //Faucet coundownTimer
  const [timeUnLockFaucet, setTimeUnLockFaucet] = useState(undefined)

  //Transfer
  const [isLoadingTransfer, setIsLoadingTransfer] = useState(false)

  //Network ChainId
  const [isChainId, setIsChainId] = useState(true)

  const checkNetWorkChainId = async () => {
    if (!ethereum) return console.log(('Please install metamask'))
    const provider = new ethers.providers.Web3Provider(ethereum)
    const chainid = await provider.getNetwork()
    // console.log('chainid', chainid.chainId)
    // console.log('typeof',typeof( chainid.chainId))
    // console.log('tt',chainid.chainId == 80001)
    if (chainid.chainId == 80001) 
    {
      setIsChainId(true)
    } else {
      setIsChainId(false)
       try {
         // check if the chain to connect to is installed
         await ethereum.request({
           method: 'wallet_switchEthereumChain',
           params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
         })
        setIsChainId(true)
        loadBalnce()
        connectAndLoad()
      
       } catch (error) {
         // This error code indicates that the chain has not been added to MetaMask
         // if it is not, then install it into the user MetaMask
         if (error.code === 4902) {
           try {
             await ethereum.request({
               method: 'wallet_addEthereumChain',
               params: [
                 {
                   chainId: '0x13881',
                   chainName: 'Mumbai',
                   nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18,
                  },
                   rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                   blockExplorerUrls: ['https://mumbai.polygonscan.com'],
                 },
               ],
             })

           } catch (addError) {
             console.error(addError)
           }
         }
         console.error(error)
       }
    }
   
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return console.log('Please install metamask')

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        console.log('No account found')
      }
    } catch (error) {
      console.error(error)

      throw new Error('No ethereum object')
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return console.log('Please install metamask')

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
      connectAndLoad()
      loadBalnce()
    } catch (error) {
      console.error(error)

      throw new Error('No ethereum object')
    }
  }

  const calcDaysRemainint = (unlockDate) => {
    const timeNow = Date.now() / 1000
    const secnodsRemaining = unlockDate - timeNow
    return Math.max((secnodsRemaining / 60 / 60 / 24).toFixed(0), 0)
  }

  const connectAndLoad = async () => {
    try {
      if (!ethereum) return console.log('Please install metamask')
      setIsLoading(true)
      setPool([])
      setAssets([])
      // console.log(`Loading `)

      const stakedContract = getStakedContract()

      const allPools = await stakedContract.getAllpool()

      const queriedPools = await Promise.all(
        allPools.map((id) => stakedContract.getPoolById(id))
      )
      queriedPools.map(async (asset) => {
        const parsedAsset = {
          poolId: toFixUnits(asset.poolId, 0),
          symbol: asset.symbol,
          tokenAddress: asset.tokenAddress,
          apy: toFixUnits(asset.apy, 0),
          lockPeriods: toFixUnits(asset.lockPeriods, 0),
          fee: toFixUnits(asset.fee, 2),
          open: asset.open,
        }

        setPool((prev) => [...prev, parsedAsset])
      })

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      const assetIds = await stakedContract.getPositionIdsForAddress(
        accounts[0]
      )

      const queriedAssets = await Promise.all(
        assetIds.map((id) => stakedContract.getPositionById(id))
      )
      queriedAssets.map(async (asset) => {
        const parsedAsset = {
          positionId: asset.positionId,
          symbol: asset.symbol,
          percentInterest: Number(asset.percentInterest) / 100,
          daysRemaining: asset.unlockDate,
          amountInterest: toEther(asset.amountInterest),
          amountStaked: toEther(asset.amountStaked),
          amountFee: toEther(asset.amountfee),
          open: asset.open,
        }

        setAssets((prev) => [...prev, parsedAsset])
      })

      // console.log(`Success `)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const loadBalnce = async () => {
    setIsLoadingBalnce(true)
    try {
      if (!ethereum) return console.log('Please install metamask')
      // console.log('start loadBalnce')
      const pusdContract = getTokenContract(pusdAddress)
      const thbContract = getTokenContract(thbAddress)
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      const balancePUSD = await pusdContract.balanceOf(accounts[0])
      const balanceTHB = await thbContract.balanceOf(accounts[0])

      const balancePoolPUSD = await pusdContract.balanceOf(
        contractRouterAddress
      )
      const balancePoolTHB = await thbContract.balanceOf(contractRouterAddress)

      setDataBalnce({
        [pusdAddress]: toEther(balancePUSD),
        [thbAddress]: toEther(balanceTHB),
      })
      // console.log('suscess loadBalnce PUSD', balancePUSD)
      // console.log('suscess loadBalnce THB', balanceTHB)

      setDataBalncePool({
        [pusdAddress]: toEther(balancePoolPUSD),
        [thbAddress]: toEther(balancePoolTHB),
      })
      // console.log('suscess loadBalncePoolPUSD', balancePoolPUSD)
      // console.log('suscess loadBalncePoolTHB', balancePoolTHB)
      getTimeFaucet()
    } catch (error) {
      setDataBalnce({})
      setDataBalncePool({})
      console.log(error)
    }

    setIsLoadingBalnce(false)
  }

  const sendTransfer = async (_addressToken, _addressTo, _amount) => {
    try {
      if (!ethereum) return console.log('Please install metamask')

      setIsLoadingTransfer(true)
      const tokenContract = getTokenContract(_addressToken)
      const transactionHash = await tokenContract.transfer(
        _addressTo,
        toWei(_amount)
      )
      setTxNotification(transactionHash.hash)
      // console.log(`Transfer - ${transactionHash.hash}`)
      await transactionHash.wait()
      // console.log(`Success Transfer - ${transactionHash.hash}`)
      setIsLoadingTransfer(false)
      setNotification(true)
      
      
    } catch (error) {
      console.log(error)
      setIsLoadingTransfer(false)
      try {
        alert('invalid date')
      } catch (error) {}
    }
    loadBalnce()
  }

  const withdraw = async (positionId) => {
    try {
      if (!ethereum) return console.log('Please install metamask')
      const stakedContract = getStakedContract()
      const transactionHash = await stakedContract.closePosition(positionId)
      setTxNotification(transactionHash.hash)
      setIsLoadingTxNavBar(true)

      // console.log(`withdraw Loading - ${transactionHash.hash}`)
      await transactionHash.wait()
      setIsLoadingTxNavBar(false)
      connectAndLoad()
      setNotification(true)
      // console.log(`withdraw Success - ${transactionHash.hash}`)
    } catch (error) {
      console.log(error)
      setIsLoadingTxNavBar(false)
    }
    loadBalnce()
  }

  const stake = async (amount, poolId) => {
    setIsLoadingStake(true)
    try {
      if (!ethereum) return console.log('Please install metamask')
      // console.log('Start stake')
      const stakedContract = getStakedContract()

      const addressToken = await stakedContract.getPoolById(poolId)

      const tokenContract = getTokenContract(addressToken.tokenAddress)

      const wei = toWei(amount)
      await tokenContract.approve(contractStakedAddress, wei)
      const transactionHash = await stakedContract.stakeEther(poolId, wei)
      setTxNotification(transactionHash.hash)
      setIsLoadingTxNavBar(true)
      const cheackstatus = await transactionHash.wait()
      setNotification(true)
      setIsLoadingTxNavBar(false)
      // console.log('stake', transactionHash.hash)
      // console.log('cheackstatus', cheackstatus)
      connectAndLoad()
    } catch (error) {
      console.log(error)
      setIsLoadingStake(false)
      setIsLoadingTxNavBar(false)
    }
    loadBalnce()
    setIsLoadingStake(false)
  }

  const faucet = async () => {
    setIsLoadingFaucet(true)
    try {
      if (!ethereum) return console.log('Please install metamask')
      const faucetContract = getFaucetContract()
      const transactionHash = await faucetContract.getFaucet()
      setTxNotification(transactionHash.hash)
      setIsLoadingTxNavBar(true)

      // console.log(`faucet Loading - ${transactionHash.hash}`)
      await transactionHash.wait()
      setIsLoadingTxNavBar(false)
      setNotification(true)
      // console.log(`faucet Success - ${transactionHash.hash}`)
    } catch (error) {
      console.log(error)
      setIsLoadingFaucet(false)
      setIsLoadingTxNavBar(false)
      try {
        alert(error.error.data.message)
      } catch (error) {}
    }
    loadBalnce()
    setIsLoadingFaucet(false)
    getTimeFaucet()
  }

  const getTimeFaucet = async () => {
    try {
      if (!ethereum) return console.log('Please install metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      // console.log(accounts[0])
      const faucetContract = getFaucetContract()
      const time = await faucetContract.timeFaucet(accounts[0])
      // console.log('time', toFixUnits(time, 0))
      setTimeUnLockFaucet(time)
    } catch (error) {
      console.log(error)
      setTimeUnLockFaucet(undefined)
    }
  }

  const amountOut = async (amount, tokenAddress) => {
    setIsLoadingPrice(true)
    try {
      if (!ethereum) return console.log('Please install metamask')
      // console.log(`routerOutContract`)
      const routerContract = getRouterContract()
      const _tokenIn = tokenAddress
      const _amountIn = toWei(amount)
      const data = await routerContract.getAmountOut(_tokenIn, _amountIn)
      // console.log('amount Out data', toEther(data))
      setDataAmountOut(toEther(data))
    } catch (error) {
      console.log(error)
      setIsLoadingPrice(false)
      setDataAmountOut('')
    }
    setIsLoadingPrice(false)
  }

  const amountIn = async (amount, tokenAddress) => {
    setIsLoadingPrice(true)
    try {
      if (!ethereum) return console.log('Please install metamask')
      // console.log(`routerInContract`)
      const routerContract = getRouterContract()
      const _tokenOut = tokenAddress
      const _amountOut = toWei(amount)
      const data = await routerContract.getAmountIn(_tokenOut, _amountOut)
      // console.log('amount In data', toEther(data))
      setDataAmountIn(toEther(data))
    } catch (error) {
      console.log(error)
      setIsLoadingPrice(false)
      setDataAmountIn('')
    }
    setIsLoadingPrice(false)
  }

  const swapRouter = async (
    _addressTokenIn,
    _amountIn,
    _amountOutMin,
    _deadlineMinutes
  ) => {
    setIsLoadingSwap(true)
    try {
      if (!ethereum) return console.log('Please install metamask')
      // console.log(`router swap Contract`)
      // console.log('addressTokenIn', _addressTokenIn)
      // console.log('amountIn', _amountIn)
      // console.log('amountOutMin', _amountOutMin)
      // console.log('deadlineMinutes', _deadlineMinutes)

      const tokenContract = getTokenContract(_addressTokenIn)
      const routerContract = getRouterContract()

      const amountIn = toWei(_amountIn)
      // const approve = await tokenContract.approve(contractRouterAddress, amountIn)
      // const resultApprove = await approve.wait()

      await tokenContract.approve(contractRouterAddress, amountIn)

      const amountOutMin = toWei(_amountOutMin)
      const deadLine = Math.floor(Date.now() / 1000 + _deadlineMinutes * 60)
      const transactionHash = await routerContract.swap(
        _addressTokenIn,
        amountIn,
        amountOutMin,
        deadLine
      )

      setTxNotification(transactionHash.hash)
      setIsLoadingSwap(false)
      setIsLoadingTxNavBar(true)
      const result = await transactionHash.wait()
      setNotification(true)
      setIsLoadingTxNavBar(false)
    } catch (error) {
      console.log(error)
      setIsCancelTx(true)
      setIsLoadingSwap(false)
      setIsLoadingTxNavBar(false)
    }
    loadBalnce()
  }

  useEffect(() => {
    // console.log('start')
    checkIfWalletIsConnected()
    checkNetWorkChainId()
    loadBalnce()
    connectAndLoad()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransfer,
        isLoadingTransfer,
        isLoading,
        pool,
        assets,
        withdraw,
        stake,
        isLoadingStake,
        setIsLoadingStake,
        notification,
        txNotification,
        setNotification,
        amountOut,
        amountIn,
        dataAmountOut,
        dataAmountIn,
        isLoadingPrice,
        isLoadingBalnce,
        dataBalnce,
        dataBalncePool,
        swapRouter,
        isLoadingSwap,
        isCancelTx,
        setIsCancelTx,
        setDataAmountOut,
        setDataAmountIn,
        isLoadingTxNavBar,
        faucet,
        isLoadingFaucet,
        timeUnLockFaucet,
        getTimeFaucet,
        isChainId,
        checkNetWorkChainId,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
