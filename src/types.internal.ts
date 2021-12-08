import { NonUndefined } from ".";
import { PersistStore } from "./types";

export interface PersistStore__Internal<P, Value = NonUndefined<P>>
  extends PersistStore<P> {
  __setWithoutDispatch: (value: Value) => Promise<void>;
  __subscribe: (callback: (value: Value) => void) => void;
  __unsubscribe: (callback: (value: Value) => void) => void;
}
