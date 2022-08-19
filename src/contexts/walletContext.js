import { useEffect, useState, createContext } from "react";
import {ethers} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { Connectors } from 'web3-react';
import Helper from "../lib/common";
import { CHAIN_DATA } from '../constants/Crypto';


export const customWalletContext = createContext()

const CustomWalletProvider = ({children}) => {
    const { InjectedConnector, NetworkOnlyConnector } = Connectors;
    const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });
    const connectors = { MetaMask };
    const provider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
        qrcodeModalOptions: {
          desktopLinks: [
            'ledger',
            'tokenary',
            'wallet',
            'wallet 3',
            'secuX',
            'ambire',
            'wallet3',
            'apolloX',
            'zerion',
            'sequence',
            'punkWallet',
            'kryptoGO',
            'nft',
            'riceWallet',
            'vision',
            'keyring'
          ],
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar",
          ],
        },
      });
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
    });
    

    useEffect(() => {
        // if (process.env.NODE_ENV === "development") {
        //     setBWNetworkLi(CHAIN_DATA.dev.networkList)
        // } else {
        //     setBWNetworkLi(CHAIN_DATA.prod.networkList)
        // }
        // bwWeb3Provider.on("accountsChanged", (accounts) => {
        //     console.log(accounts);
        // });
        // bwWeb3Provider.on("chainChanged", (chainId) => {
        //     console.log(chainId);
        // });
        
        // // Subscribe to session disconnection
        // bwWeb3Provider.on("disconnect", (code, reason) => {
        //     console.log(code, reason);
        // });
        console.log("dddddddddddddddddddd=", process.env.NODE_ENV)
    }, [])

    return (
        <customWalletContext.Provider value={{}}>
            {children}
        </customWalletContext.Provider>
    )
}

export default CustomWalletProvider