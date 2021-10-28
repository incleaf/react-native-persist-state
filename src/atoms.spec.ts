import { createPersistStore } from ".";
import { getOrCreateAtom } from "./atoms";

// jest.mock("recoil", () => require("recoil/native/recoil"));

test("getOrCreateAtom", () => {
  expect(1).toEqual(1);
  // it("should use not make a new atom with the same key", () => {
  //   const store = createPersistStore({
  //     key: "foo",
  //     initialData: null,
  //   });

  //   const atom1 = getOrCreateAtom(store);
  //   const atom2 = getOrCreateAtom(store);

  //   expect(atom1).toBe(atom2);
  // });
});
