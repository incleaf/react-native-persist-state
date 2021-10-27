import { PersistStore } from "./types";

export interface PersistStore__Internal<P> extends PersistStore<P> {
  __setWithoutDispatch: (value: P) => Promise<void>;
  __subscribe: (callback: (value: P) => void) => void;
  __unsubscribe: (callback: (value: P) => void) => void;
}
