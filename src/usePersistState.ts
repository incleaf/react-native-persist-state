import { SetStateAction, useCallback, useEffect, useState } from "react";
import { usePersistStateProvider } from "./PersistStateProvider";
import { PersistStore } from "./types";
import { PersistStore__Internal } from "./types.internal";
import { isFunction } from "./utils";

export function usePersistState<P>(store: PersistStore<P>) {
  const { client } = usePersistStateProvider();

  if (!client.fulfilledFlagMap.has(store.key)) {
    throw store.get().then((value) => {
      client.fulfilledFlagMap.set(store.key, true);
      client.cacheMap.set(store.key, value);
    });
  }

  const [value, setValue] = useState(client.cacheMap.get(store.key) as P);

  const setAndDispatchValue = useCallback(
    (valueOrSetter: SetStateAction<P>) => {
      setValue((currentValue) => {
        const newValue = isFunction(valueOrSetter)
          ? valueOrSetter(currentValue)
          : valueOrSetter;

        store.set(newValue);
        client.cacheMap.set(store.key, newValue);

        return newValue;
      });
    },
    [setValue, store, client]
  );

  useEffect(() => {
    (store as PersistStore__Internal<P>).__subscribe(setValue);
    return () => {
      (store as PersistStore__Internal<P>).__unsubscribe(setValue);
    };
  }, [store, setValue]);

  return [value, setAndDispatchValue] as const;
}
