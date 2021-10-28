import { act, renderHook } from "@testing-library/react-hooks";
import { usePersistState } from ".";
import { createPersistStore } from "./createPersistStore";
import { PersistStore__Internal } from "./types.internal";

describe("uesPersistState", () => {
  it("should update the store value properly", async () => {
    const store = createPersistStore({
      key: "foo",
      initialData: 100,
    }) as PersistStore__Internal<number>;

    const { result } = renderHook(() => usePersistState(store));

    act(() => {
      const [, setValue] = result.current;
      setValue(200);
    });

    expect(result.current[0]).toEqual(200);
  });

  it("should subscribe / unsubscribe properly", async () => {
    const storeA = createPersistStore({
      key: "foo",
      initialData: 100,
    }) as PersistStore__Internal<number>;
    const __subscribeA = jest.spyOn(storeA, "__subscribe");
    const __unsubscribeA = jest.spyOn(storeA, "__unsubscribe");

    const { rerender } = renderHook((_store) => usePersistState(_store), {
      initialProps: storeA,
    });

    const storeB = createPersistStore({
      key: "bar",
      initialData: 100,
    }) as PersistStore__Internal<number>;
    const __subscribeB = jest.spyOn(storeB, "__subscribe");
    const __unsubscribeB = jest.spyOn(storeB, "__unsubscribe");

    act(() => {
      rerender(storeB);
    });

    expect(__subscribeA).toHaveBeenCalledTimes(1);
    expect(__unsubscribeA).toHaveBeenCalledTimes(1);
    expect(__subscribeB).toHaveBeenCalledTimes(1);
    expect(__unsubscribeB).not.toHaveBeenCalled();
  });
});
