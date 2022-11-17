export const contractStakedAddress = '0x05f4E6CBc23eFeE61d5ceA373186B3402B5EBd4a'

export const contractStakedABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'apy',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lockPeriods',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: 'addPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'positionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'newUnlock',
        type: 'uint256',
      },
    ],
    name: 'changeUnlockDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'positionId',
        type: 'uint256',
      },
    ],
    name: 'closePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'basisPoints',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
    ],
    name: 'modifyLockPeriods',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'stakeEther',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allPoolId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentPoolId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentPositionId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllpool',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLengthpool',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'poolID',
        type: 'uint256',
      },
    ],
    name: 'getPoolById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'poolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'apy',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lockPeriods',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'open',
            type: 'bool',
          },
        ],
        internalType: 'struct Staking.Pool',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'positionId',
        type: 'uint256',
      },
    ],
    name: 'getPositionById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'positionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'poolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'walletAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'createdDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'unlockDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'percentInterest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountStaked',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountInterest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountfee',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'open',
            type: 'bool',
          },
        ],
        internalType: 'struct Staking.Position',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'walletAddress',
        type: 'address',
      },
    ],
    name: 'getPositionIdsForAddress',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'pools',
    outputs: [
      {
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'apy',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lockPeriods',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'open',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'positionIdsByAddress',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'positions',
    outputs: [
      {
        internalType: 'uint256',
        name: 'positionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'walletAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'createdDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'unlockDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'percentInterest',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountStaked',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountInterest',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountfee',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'open',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]