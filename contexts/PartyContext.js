// contexts/PartyContext.js

import React, { createContext, useContext, useState } from "react";

const PartyContext = createContext();

export function PartyProvider({ children }) {
  const [connectedChair, setConnectedChair] = useState(null);
  const [discoveredChairs, setDiscoveredChairs] = useState([]);
  const [partySetup, setPartySetup] = useState(null);

  return (
    
    <PartyContext.Provider
      value={{
        connectedChair,
        setConnectedChair,
        discoveredChairs,
        setDiscoveredChairs,
        partySetup,
        setPartySetup,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
}

export function useParty() {
  return useContext(PartyContext);
}
