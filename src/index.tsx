import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrivyProvider} from '@privy-io/react-auth';
import {toSolanaWalletConnectors} from "@privy-io/react-auth/solana";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId='cm9127vyt00lajv0lj3ys6twi'
      clientId='client-WY5iiJiorBxda9G5BbQs4ncKHqnzBD3iv42zJYLAirLxr'
      config={{
        loginMethods: ["wallet", "email"],
        appearance: {
          theme: 'dark',
          accentColor: '#00A3FF',
          logo: '',
          walletList: ['metamask', 'phantom', 'wallet_connect'],
        },
        externalWallets: {solana: {connectors: toSolanaWalletConnectors()}},
      }
      }
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);

reportWebVitals();
