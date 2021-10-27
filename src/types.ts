export type AbstractStorage = {
  getItem(
    key: string,
    callback?: (error?: Error, result?: string) => void
  ): Promise<string | null>;
  setItem(
    key: string,
    value: string,
    callback?: (error?: Error) => void
  ): Promise<void>;
  removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;
};

export interface PersistStoreOptions<P> {
  key: string;
  initialData: P | (() => P);
  storage?: AbstractStorage;
  transform?: (value: string) => P;
}

export interface PersistStore<P> {
  get: () => Promise<P>;
  set: (item: P) => Promise<void>;
  remove: () => Promise<void>;
  key: string;
}
