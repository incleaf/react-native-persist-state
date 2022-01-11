export type AbstractStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;
};

export type NonUndefined<T> = T extends undefined ? never : T;

export type PersistStoreOptions<P, Value = NonUndefined<P>> = [P] extends [
  undefined
]
  ? never
  : [P] extends [string | null]
  ? {
      key: string;
      initialData: Value | (() => Value);
      storage: AbstractStorage;
    }
  : {
      key: string;
      initialData: Value | (() => Value);
      storage: AbstractStorage;
      transform: (value: string) => Value;
    };

export interface PersistStore<P, Value = NonUndefined<P>> {
  get: () => Promise<Value>;
  set: (item: Value) => Promise<void>;
  remove: () => Promise<void>;
  key: string;
}
