const MusicContract = {
  _format: 'hh-sol-artifact-1',
  contractName: 'MusicContract',
  sourceName: 'contracts/MusicContract.sol',
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'maticToken',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'TokensSent',
      type: 'event',
    },
    {
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'totalPlays',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'currentPlays',
          type: 'uint256',
        },
        {
          internalType: 'address payable',
          name: 'artistWallet',
          type: 'address',
        },
      ],
      name: 'calculateAmount',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'showmetheBalance',
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
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
  bytecode:
    '0x608060405234801561001057600080fd5b50600080546001600160a01b031916301790556102aa806100326000396000f3fe60806040526004361061002d5760003560e01c806338963ca714610036578063e534ed611461006157610034565b3661003457005b005b34801561004257600080fd5b5061004b610081565b6040516100589190610232565b60405180910390f35b34801561006d57600080fd5b5061003461007c3660046101ef565b610085565b4790565b600061271084106100a8576100a183662386f26fc10000610249565b90506100dd565b6103e884106100c2576100a18366038d7ea4c68000610249565b606484106100dd576100da83655af3107a4000610249565b90505b7f8f25d18a6f0fcdd771846bbc7d8601b97f68c83225e64f0594d043fd136bcfab306001600160a01b03166338963ca76040518163ffffffff1660e01b815260040160206040518083038186803b15801561013757600080fd5b505afa15801561014b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016f91906101d7565b8260405161017e92919061023b565b60405180910390a1801561019657610196828261019c565b50505050565b6040516001600160a01b0383169082156108fc029083906000818181858888f193505050501580156101d2573d6000803e3d6000fd5b505050565b6000602082840312156101e8578081fd5b5051919050565b600080600060608486031215610203578182fd5b833592506020840135915060408401356001600160a01b0381168114610227578182fd5b809150509250925092565b90815260200190565b918252602082015260400190565b600081600019048311821515161561026f57634e487b7160e01b81526011600452602481fd5b50029056fea26469706673582212207ad3a1b7287ba38e22dc066bbdc6e74811fd4740aa4530fb85edec93bad8a07e64736f6c63430008000033',
  deployedBytecode:
    '0x60806040526004361061002d5760003560e01c806338963ca714610036578063e534ed611461006157610034565b3661003457005b005b34801561004257600080fd5b5061004b610081565b6040516100589190610232565b60405180910390f35b34801561006d57600080fd5b5061003461007c3660046101ef565b610085565b4790565b600061271084106100a8576100a183662386f26fc10000610249565b90506100dd565b6103e884106100c2576100a18366038d7ea4c68000610249565b606484106100dd576100da83655af3107a4000610249565b90505b7f8f25d18a6f0fcdd771846bbc7d8601b97f68c83225e64f0594d043fd136bcfab306001600160a01b03166338963ca76040518163ffffffff1660e01b815260040160206040518083038186803b15801561013757600080fd5b505afa15801561014b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016f91906101d7565b8260405161017e92919061023b565b60405180910390a1801561019657610196828261019c565b50505050565b6040516001600160a01b0383169082156108fc029083906000818181858888f193505050501580156101d2573d6000803e3d6000fd5b505050565b6000602082840312156101e8578081fd5b5051919050565b600080600060608486031215610203578182fd5b833592506020840135915060408401356001600160a01b0381168114610227578182fd5b809150509250925092565b90815260200190565b918252602082015260400190565b600081600019048311821515161561026f57634e487b7160e01b81526011600452602481fd5b50029056fea26469706673582212207ad3a1b7287ba38e22dc066bbdc6e74811fd4740aa4530fb85edec93bad8a07e64736f6c63430008000033',
  linkReferences: {},
  deployedLinkReferences: {},
};

export const MusicContractAddress =
  '0xb8fba861bd0e51b6c448eb8e75cd0cc552b1c461';
export const MusicContractABI = MusicContract.abi;