import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { getOrCreateAtom } from "./atoms";
import { PersistStore } from "./types";
import { PersistStore__Internal } from "./types.internal";

export function usePersistState<P>(store: PersistStore<P>) {
  const atom = useMemo(() => {
    return getOrCreateAtom(store);
  }, [store]);

  const [value, setOrUpdate] = useRecoilState(atom);

  useEffect(() => {
    (store as PersistStore__Internal<P>).__subscribe(setOrUpdate);
    return () => {
      (store as PersistStore__Internal<P>).__unsubscribe(setOrUpdate);
    };
  }, [store, setOrUpdate]);

  return [value, setOrUpdate] as const;
}
