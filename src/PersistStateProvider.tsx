import React, { createContext, ReactNode, useContext } from "react";

export class PersistStateClient {
  public fulfilledFlagMap: Map<string, true>;
  public cacheMap: Map<string, unknown>;

  constructor() {
    this.fulfilledFlagMap = new Map();
    this.cacheMap = new Map();
  }
}

export interface PersistStateProviderProps {
  client: PersistStateClient;
}

const PersistStateContext = createContext<PersistStateProviderProps | null>(
  null
);

export function PersistStateProvider(props: {
  children: ReactNode;
  client: PersistStateClient;
}) {
  return (
    <PersistStateContext.Provider value={{ client: props.client }}>
      {props.children}
    </PersistStateContext.Provider>
  );
}

export function usePersistStateProvider() {
  const context = useContext(PersistStateContext);

  if (context == null) {
    throw new Error("PersistStateProvider is not provided");
  }

  return context;
}
