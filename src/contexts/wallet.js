import { useEffect, useState, createContext } from "react"
import Helper from "../lib/common"
import Web3 from 'web3'
import cryptoData from '../data/nft/cryptoData'

export const bscWalletContext = createContext()

const BscWalletProvider = ({children}) => {
    const [bwData, setBWData] = useState({ 
        address: null, 
        chainId: null,
        balance: null 
    })
    const [bwNetworkLi, setBWNetworkLi] = useState(null)
    const bwWeb3Provider = new Web3(Web3.givenProvider)
    const bwCheckInstallation = async() => {
        return Helper.checkNull(window.ethereum)
    }

    const bwCheckConnection = async() => {
        try {
            const accounts = await bwWeb3Provider.eth.getAccounts()
            if (accounts.length > 0) return true
            else return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const bwConnect = async() => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                let chainId = await bwGetActiveChainID()
                // let balance = await bwGetTokenBalance()
                setBWData({...bwData, address: accounts[0], chainId: chainId})
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const bwDisconnect = () => {
        setBWData({...bwData, address: null, chainId: null})
    }

    const bwInitListener = () => {
        window.ethereum.on('accountsChanged', bwHandleAccountChange)
        window.ethereum.on('chainChanged', bwHandleChainChange)
    }

    const bwHandleAccountChange = async(accounts) => {
        console.log("accounts=", accounts)
        let chainId = await bwGetActiveChainID()
        if (accounts.length > 0) {
            setBWData({...bwData, address: accounts[0], chainId: chainId})
        } else {
            setBWData({...bwData, address: null, chainId: null})
        }
    }
    const bwHandleChainChange = async(networkID) => {
        setBWData({...bwData, chainId: Number(networkID)})
    }
    const bwRemoveListener = () => {
        window.ethereum.removeListener('accountChanged', bwHandleAccountChange)
        window.ethereum.removeListener('chainChanged', bwHandleChainChange)
    }

    const bwGetActiveChainID = async() => {
        try {
            const chainID = await bwWeb3Provider.eth.net.getId()
            return chainID
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const bwSwitchNetwork = async(network) => {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: network.chainIdHex }],
            });
        } catch (switchError) {
            console.log(switchError)
                // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: network.chainIdHex,
                            chainName: network.title,
                            rpcUrls: [network.rpcUrl],
                            nativeCurrency: network.nativeCurrency,
                        }, ],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
            // handle other "switch" errors
        }
    }


    const bwGetToken = async(tokenAbi, tokenAddress) => {
        return new bwWeb3Provider.eth.Contract(tokenAbi, tokenAddress);
    }

    const bwGetTokenBalance = async(tokenAbi, tokenAddress) => {
        const token = await bwGetToken(tokenAbi, tokenAddress);
        if (bwData.address) {
            let balance = await token.methods.balanceOf(bwData.address).call();
            balance = bwWeb3Provider.utils.fromWei(balance, 'ether');
            return Number(balance);
        } else {
            return 0;
        }
    }

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setBWNetworkLi(cryptoData.dev.networkList)
        } else {
            setBWNetworkLi(cryptoData.prod.networkList)
        }
        console.log("dddddddddddddddddddd")
    }, [])

    return (
        <bscWalletContext.Provider value={{
            bwData,
            bwNetworkLi,
            bwWeb3Provider,

            bwInitListener,
            bwRemoveListener,
            bwCheckInstallation,
            bwCheckConnection,
            bwConnect,
            bwDisconnect,
            bwGetActiveChainID,
            bwSwitchNetwork,
            bwGetToken,
            bwGetTokenBalance
        }}>
            {children}
        </bscWalletContext.Provider>
    )
}

export default BscWalletProvider

// function useBscWallet() {
//     const [bwData, setBWData] = useState({ 
//         address: null, 
//         chainId: null,
//         balance: null 
//     })
//     const [bwNetworkLi, setBWNetworkLi] = useState(null)
//     const bwWeb3Provider = new Web3(Web3.givenProvider)
//     const bwCheckInstallation = async() => {
//         return Helper.checkNull(window.ethereum)
//     }

//     const bwCheckConnection = async() => {
//         try {
//             const accounts = await bwWeb3Provider.eth.getAccounts()
//             if (accounts.length > 0) return true
//             else return false
//         } catch (error) {
//             console.log(error)
//             return false
//         }
//     }

//     const bwConnect = async() => {
//         try {
//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             if (accounts.length > 0) {
//                 let chainId = await bwGetActiveChainID()
//                 // let balance = await bwGetTokenBalance()
//                 setBWData({...bwData, address: accounts[0], chainId: chainId})
//                 return true
//             }
//             return false
//         } catch (error) {
//             console.log(error)
//             return false;
//         }
//     }

//     const bwDisconnect = async() => {
//         setBWData({...bwData, address: null, chainId: null})
//     }

//     const bwInitListener = () => {
//         window.ethereum.on('accountsChanged', bwHandleAccountChange)
//         window.ethereum.on('chainChanged', bwHandleChainChange)
//     }

//     const bwHandleAccountChange = async(accounts) => {
//         console.log("accounts=", accounts)
//         let chainId = await bwGetActiveChainID()
//         if (accounts.length > 0) {
//             setBWData({...bwData, address: accounts[0], chainId: chainId})
//         } else {
//             setBWData({...bwData, address: null, chainId: null})
//         }
//     }
//     const bwHandleChainChange = async(networkID) => {
//         setBWData({...bwData, chainId: Number(networkID)})
//     }
//     const bwRemoveListener = () => {
//         window.ethereum.removeListener('accountChanged', bwHandleAccountChange)
//         window.ethereum.removeListener('chainChanged', bwHandleChainChange)
//     }

//     const bwGetActiveChainID = async() => {
//         try {
//             const chainID = await bwWeb3Provider.eth.net.getId()
//             return chainID
//         } catch (error) {
//             console.log(error)
//             return null
//         }
//     }

//     const bwSwitchNetwork = async(network) => {
//         try {
//             await ethereum.request({
//                 method: 'wallet_switchEthereumChain',
//                 params: [{ chainId: network.chainIdHex }],
//             });
//         } catch (switchError) {
//             console.log(switchError)
//                 // This error code indicates that the chain has not been added to MetaMask.
//             if (switchError.code === 4902) {
//                 try {
//                     await ethereum.request({
//                         method: 'wallet_addEthereumChain',
//                         params: [{
//                             chainId: network.chainIdHex,
//                             chainName: network.title,
//                             rpcUrls: [network.rpcUrl],
//                             nativeCurrency: network.nativeCurrency,
//                         }, ],
//                     });
//                 } catch (addError) {
//                     // handle "add" error
//                 }
//             }
//             // handle other "switch" errors
//         }
//     }


//     const bwGetToken = async(tokenAbi, tokenAddress) => {
//         return new bwWeb3Provider.eth.Contract(tokenAbi, tokenAddress);
//     }

//     const bwGetTokenBalance = async(tokenAbi, tokenAddress) => {
//         const token = await bwGetToken(tokenAbi, tokenAddress);
//         if (bwData.address) {
//             let balance = await token.methods.balanceOf(bwData.address).call();
//             balance = bwWeb3Provider.utils.fromWei(balance, 'ether');
//             return Number(balance);
//         } else {
//             return 0;
//         }
//     }

//     useEffect(() => {
//         if (process.env.NODE_ENV === "development") {
//             setBWNetworkLi(cryptoData.dev.networkList)
//         } else {
//             setBWNetworkLi(cryptoData.prod.networkList)
//         }
//         console.log("dddddddddddddddddddd")
//     }, [])

//     return {
//         bwData,
//         bwNetworkLi,
//         bwWeb3Provider,

//         bwInitListener,
//         bwRemoveListener,
//         bwCheckInstallation,
//         bwCheckConnection,
//         bwConnect,
//         bwDisconnect,
//         bwGetActiveChainID,
//         bwSwitchNetwork,
//         bwGetToken,
//         bwGetTokenBalance

//     }
// }

// export default useBscWallet;