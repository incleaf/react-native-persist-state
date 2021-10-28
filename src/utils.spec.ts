import { isFunction } from "./utils";

describe("isFunction", () => {
  it(`returns true when it's a function`, () => {
    expect(isFunction(() => null)).toEqual(true);
  });

  it(`returns false when it's not a function`, () => {
    expect(isFunction(null)).toEqual(false);
    expect(isFunction("foo")).toEqual(false);
    expect(isFunction(123)).toEqual(false);
  });
});
