import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStore, PersistStoreOptions } from "./types";
import { isFunction } from "./utils";

export function createPersistStore<P>(
  options: PersistStoreOptions<P>
): PersistStore<P>;

export function createPersistStore<P>(options: PersistStoreOptions<P>) {
  const { key, initialData, storage = AsyncStorage } = options;

  const listeners = new Set<(value: P) => void>();
  const serialize = (value: unknown) =>
    typeof value === "string" ? value : JSON.stringify(value);
  const getInitialData = () => {
    if (isFunction(initialData)) {
      return initialData();
    }

    return initialData;
  };

  return {
    get: async () => {
      const value = await storage.getItem(key);

      if (value == null) {
        return getInitialData();
      }

      const transform = (options as any).transform;
      if (transform !== undefined) {
        return transform(value);
      }

      return value;
    },
    set: async (value: P) => {
      const data = serialize(value);
      await storage.setItem(key, data);
      listeners.forEach((listener) => {
        listener(value);
      });
    },
    remove: async () => {
      await storage.removeItem(key);
      const initialData = getInitialData();
      listeners.forEach((listener) => {
        listener(initialData);
      });
    },
    key,
    __setWithoutDispatch: async (value: string) => {
      const data = serialize(value);
      await storage.setItem(key, data);
    },
    __subscribe: (callback: (value: P) => void) => {
      listeners.add(callback);
    },
    __unsubscribe: (callback: (value: P) => void) => {
      if (listeners.has(callback)) {
        listeners.delete(callback);
      }
    },
  };
}
