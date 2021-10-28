import { createPersistStore } from "./createPersistStore";
import { PersistStore__Internal } from "./types.internal";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("createPersistStore (Public API)", () => {
  it("should be initialized with initial data", async () => {
    const fooStore = createPersistStore<string>({
      key: "foo",
      initialData: "foo",
    });

    expect(await fooStore.get()).toEqual("foo");

    const barStore = createPersistStore<string>({
      key: "foo",
      initialData: () => "bar",
    });

    expect(await barStore.get()).toEqual("bar");
  });

  it("should be set properly", async () => {
    const store = createPersistStore<string>({
      key: "foo",
      initialData: "bar",
    });

    await store.set("baz");
    const value = await store.get();

    expect(value).toEqual("baz");
  });

  it("should return initial value when removed", async () => {
    const store = createPersistStore<string>({
      key: "foo",
      initialData: "bar",
    });

    await store.set("foo");
    await store.remove();

    const value = await store.get();

    expect(value).toEqual("bar");
  });

  it("transform should work properly", async () => {
    const objectStore = createPersistStore<{ name: string }>({
      key: "foo",
      initialData: { name: "foo" },
      transform: JSON.parse,
    });

    await objectStore.set({ name: "bar" });
    expect(await (await objectStore.get()).name).toEqual("bar");

    const numberStore = createPersistStore<number>({
      key: "bar",
      initialData: 100,
      transform: Number,
    });

    await numberStore.set(200);
    expect(await numberStore.get()).toEqual(200);
  });
});

describe("createPersistStore (Private API)", () => {
  it("`__setWithoutDispatch` should set value properly", async () => {
    const store = createPersistStore<string>({
      key: "foo",
      initialData: "foo",
    }) as PersistStore__Internal<string>;

    store.__setWithoutDispatch("bar");

    const value = await store.get();
    expect(value).toEqual("bar");
  });

  it("`set` should call event listeners", async () => {
    const store = createPersistStore<string>({
      key: "foo",
      initialData: "foo",
    }) as PersistStore__Internal<string>;

    const callback1 = jest.fn();
    const callback2 = jest.fn();

    store.__subscribe(callback1);
    store.__subscribe(callback2);

    await store.set("bar");

    expect(callback1).toHaveBeenCalledWith("bar");
    expect(callback2).toHaveBeenCalledWith("bar");

    store.__unsubscribe(callback2);

    await store.set("baz");

    expect(callback1).toHaveBeenLastCalledWith("baz");
    expect(callback2).not.toHaveBeenLastCalledWith("baz");

    await store.remove();

    expect(callback1).toHaveBeenLastCalledWith("foo");
  });
});
