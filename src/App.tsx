import React, { useState } from 'react';
import './App.css';
import { useHeadlessDelegatedActions, usePrivy } from '@privy-io/react-auth';

interface SessionData {
  sessionId: string;
  expiresAt: string;
  [key: string]: any;
}

const buttonStyle = { padding: '0.5rem 1rem', fontSize: '1rem' }

const loginParams: any = {loginMethods: ['wallet'], walletChainType: 'ethereum-and-solana'};

export default function App() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState("");

  const { delegateWallet } = useHeadlessDelegatedActions();
  const { user, login, logout, ready } = usePrivy();

  console.log("user", user);

  const provisionSession = async () => {
    setLoading(true);
    setError('');
    setSessionData(null);

    await delegateWallet({
      address: "Bpjj19y3cDebbyVoJBAjPXsDqJEdeTikDgFwZRjcayfz",
      chainType: "solana"
    })

  };

  const loginWhenReady = () => {
    console.log("loginWhenReady", ready);
    if(ready){
      login(loginParams);
    }
  }


  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Privy Server Session Provisioning</h1>
      <br></br>
      <br></br>
      <button
        style={buttonStyle}
        onClick={logout}
      >Log Out
      </button>
      <br></br>
      <br></br>
      <button
        onClick={loginWhenReady}
        style={buttonStyle}
      >
        User Login
      </button>
      <br></br>
      <br></br>
      <button
        onClick={provisionSession}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? 'Provisioning...' : 'Provision Session'}
      </button>
      <br></br>
      <br></br>
      <input
        onChange={(e) => setCode(e.currentTarget.value)}
        value={code}
        placeholder='code'
      />
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>}
      {sessionData && (
        <div style={{ textAlign: 'left', margin: '2rem auto', width: '80%' }}>
          <h2>Session Data</h2>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem' }}>
            {JSON.stringify(sessionData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}