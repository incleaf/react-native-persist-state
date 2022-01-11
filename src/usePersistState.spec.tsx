import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { usePersistState } from ".";
import { createPersistStore } from "./createPersistStore";
import {
  PersistStateClient,
  PersistStateProvider,
} from "./PersistStateProvider";
import { PersistStore__Internal } from "./types.internal";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("uesPersistState", () => {
  it("should be suspended on the first render if no cache found", async () => {
    const store = createPersistStore({
      key: "foo",
      initialData: 100,
      storage: AsyncStorage,
      transform: Number,
    });

    const client = new PersistStateClient();
    const { result, waitForNextUpdate } = renderHook(
      () => usePersistState(store),
      {
        wrapper: ({ children }) => (
          <PersistStateProvider client={client}>
            {children}
          </PersistStateProvider>
        ),
      }
    );

    await waitForNextUpdate();
    expect(result.current[0]).toEqual(100);
  });

  it("should not be suspended on the first render if no cache found", async () => {
    const store = createPersistStore({
      key: "foo",
      initialData: 100,
      storage: AsyncStorage,
      transform: Number,
    });

    const client = new PersistStateClient();

    const value = 12345;
    client.cacheMap.set(store.key, value);
    client.fulfilledFlagMap.set(store.key, true);

    const { result } = renderHook(() => usePersistState(store), {
      wrapper: ({ children }) => (
        <PersistStateProvider client={client}>{children}</PersistStateProvider>
      ),
    });

    expect(result.current[0]).toEqual(value);
  });

  it("state should be updated when store value is updated", async () => {
    const store = createPersistStore({
      key: "foo",
      initialData: 100,
      storage: AsyncStorage,
      transform: Number,
    });

    const client = new PersistStateClient();

    const { result, waitForNextUpdate } = renderHook(
      () => usePersistState(store),
      {
        wrapper: ({ children }) => (
          <PersistStateProvider client={client}>
            {children}
          </PersistStateProvider>
        ),
      }
    );

    await waitForNextUpdate();

    act(() => {
      store.set(12345);
    });

    expect(result.current[0]).toEqual(12345);
  });

  it("should dispatch the value to the store when setState is called", async () => {
    const store = createPersistStore({
      key: "foo",
      initialData: 100,
      storage: AsyncStorage,
      transform: Number,
    }) as PersistStore__Internal<number>;

    const client = new PersistStateClient();

    const { result, waitForNextUpdate } = renderHook(
      () => usePersistState(store),
      {
        wrapper: ({ children }) => (
          <PersistStateProvider client={client}>
            {children}
          </PersistStateProvider>
        ),
      }
    );

    await waitForNextUpdate();

    const subscriber = jest.fn();
    store.__subscribe(subscriber);

    act(() => {
      const [, setValue] = result.current;
      setValue(12345);
    });

    expect(result.current[0]).toEqual(12345);
    expect(subscriber).toHaveBeenCalled();
  });
});
