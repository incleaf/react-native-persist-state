import { createPersistStore } from ".";
import { getOrCreateAtom } from "./atoms";

describe("getOrCreateAtom", () => {
  it("should use not make a new atom with the same key", () => {
    const store = createPersistStore({
      key: "foo",
      initialData: null,
    });

    const atom1 = getOrCreateAtom(store);
    const atom2 = getOrCreateAtom(store);

    expect(atom1).toBe(atom2);
  });
});
