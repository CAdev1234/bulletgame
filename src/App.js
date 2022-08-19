import React from "react";
import "./App.css";
import Board from "./Pages/board";
import { Web3ReactProvider } from '@web3-react/core'
import {ethers} from 'ethers';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider)
}

function App() {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
          <Board />
      </Web3ReactProvider>
    );
}

export default App;