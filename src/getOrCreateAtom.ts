import { atom, RecoilState } from "recoil";
import { NonUndefined, PersistStore } from "./types";
import { PersistStore__Internal } from "./types.internal";

const storeMap = new Map<string, RecoilState<any> | undefined>();

export function getOrCreateAtom<P>(store: PersistStore<P>) {
  const cached = storeMap.get(store.key);
  if (!cached) {
    const newAtom = atom({
      key: store.key,
      default: store.get(),
      effects_UNSTABLE: [
        ({ onSet }) => {
          onSet((newValue) => {
            // null should only stay as JavaScript state
            if (newValue === null) {
              return;
            }

            (store as PersistStore__Internal<P>).__setWithoutDispatch(newValue);
          });
        },
      ],
    });
    storeMap.set(store.key, newAtom);
    return newAtom;
  }

  return cached as RecoilState<NonUndefined<P>>;
}
