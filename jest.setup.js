// /* eslint-env jest */

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("recoil", () => {
  return {
    atom: () => {
      return {};
    },
    useRecoilState: require("react").useState,
  };
});
